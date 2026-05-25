import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Conversation Summarizer — reads a contact's full activity log + notes →
 * returns a brief "where are we with this contact" recap.
 *
 * Designed for the moment a rep returns to a contact after time has passed
 * and wants a fast catch-up instead of scrolling through the full timeline.
 */

const SYSTEM = `You write brief catch-up summaries for sales reps returning to a contact after time away.

Given the contact's full activity history + notes + stage, output a JSON object:

{
  "where_we_are": "1-2 sentences: where the relationship stands RIGHT NOW. Stage + last meaningful interaction.",
  "last_meaningful_action": "What was the last action that mattered — not 'sent email' but 'they asked about pricing and went silent' or 'meeting moved twice, no rescheduled date'.",
  "what_we_owe_them": "What the REP needs to do for THIS prospect (could be null if ball is in their court).",
  "what_they_owe_us": "What the PROSPECT needs to do or signal to us (could be null).",
  "vibe_read": "Honest 1-sentence read on temperature — hot / warming / cooling / cold / dead. Use the timing as evidence (if last touch was 30 days ago and they've gone silent through 3 follow-ups, this is cold, not warm)."
}

Quality bar:
- Short. Each field is one short sentence.
- Honest. If this contact is dead, say "vibe_read" is "cold" — don't be a hype man.
- Specific. Reference the actual activities/notes, not generic phrasing.
- Time-aware. Reference how long it's been since meaningful contact.`;

export async function POST(req: NextRequest) {
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { contact } = await req.json();
    if (!contact) return NextResponse.json({ error: "Contact required" }, { status: 400 });

    const lastActivity = contact.activities?.[0];
    const daysSinceLast = lastActivity
      ? Math.floor((Date.now() - new Date(lastActivity.date).getTime()) / (1000 * 60 * 60 * 24))
      : null;

    const userMessage = [
      `Contact: ${[contact.firstName, contact.lastName].filter(Boolean).join(" ") || "(unnamed)"} at ${contact.company || "(no company)"}`,
      `Pipeline stage: ${contact.stage}`,
      `Service: ${contact.service || "(unspecified)"}`,
      `Estimated value: $${contact.estimatedValue || 0}`,
      `Source: ${contact.source || "(unknown)"}`,
      `Days since last activity: ${daysSinceLast !== null ? daysSinceLast : "(no activities yet)"}`,
      ``,
      `Notes from the rep:`,
      contact.notes || "(no notes)",
      ``,
      `Full activity history (most recent first):`,
      ...(contact.activities || []).map((a: { type: string; date: string; description: string; outcome?: string }) => {
        const ago = Math.floor((Date.now() - new Date(a.date).getTime()) / (1000 * 60 * 60 * 24));
        return `  • [${a.type}, ${ago}d ago] ${a.description}${a.outcome ? ` → ${a.outcome}` : ""}`;
      }),
      ``,
      `Write the where-are-we summary per the system instructions. Output ONLY the JSON object.`,
    ].join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ summary: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
