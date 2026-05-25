import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Next-Step Coach — auth-gated to reps. Looks at the contact's stage,
 * recent activity history, and notes; suggests 2-3 concrete next actions
 * with specific timing and language. Not generic "follow up soon" advice —
 * specific tactical moves based on where this contact actually is.
 */

const SYSTEM = `You are a sales coach for Purcell Ventures reps. A rep is looking at a specific contact and needs concrete next-step suggestions.

Look at:
- The contact's current pipeline stage
- The activity history (calls, emails, meetings, stage changes — most recent first)
- The notes the rep has logged
- Time since last activity
- The service being discussed

Return STRICT JSON, no markdown fences:

{
  "primary_next_step": {
    "action": "Specific action to take (e.g., 'Send a follow-up email referencing the Tuesday call')",
    "when": "Specific timing (e.g., 'Today', 'Tomorrow morning before 10 AM', 'Wait 3 days then')",
    "why": "One-sentence rationale for this being the right next step given where they are",
    "exact_message": "If applicable, the exact email/SMS/voicemail script the rep can use. Otherwise null."
  },
  "alternative_next_step": {
    "action": "A different angle to try if the primary doesn't fit the rep's read of the situation",
    "when": "Timing",
    "why": "Why this might be better than the primary in some scenarios"
  },
  "things_to_avoid": [
    "Specific actions that would damage this deal right now (e.g., 'Don't push for the close yet — they haven't seen the demo')"
  ],
  "stage_reality_check": "Honest 1-sentence assessment of whether this contact is actually where the stage says they are. If they've been in 'Quoted' for 21 days with no response, they're probably 'Closed Lost' or 'Lead' — say so."
}

Quality bar:
- Specific over generic. Never say "follow up" — say HOW to follow up and what to say.
- Time-aware. Reference how long it's been since the last activity.
- Honest. If the contact looks dead, say so. Don't be a hype man.
- Reference the actual activities/notes the rep gave you. Show you read them.
- Maximum 50 words for "action" and "exact_message" each. Be tight.`;

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
      `Service being discussed: ${contact.service || "(not specified)"}`,
      `Estimated value: $${contact.estimatedValue || 0}`,
      `Lead source: ${contact.source || "(unknown)"}`,
      `Tags: ${(contact.tags || []).join(", ") || "(none)"}`,
      `Days since last activity: ${daysSinceLast !== null ? daysSinceLast : "(no activities logged yet)"}`,
      ``,
      `Notes from the rep:`,
      contact.notes || "(no notes)",
      ``,
      `Recent activity (most recent first, up to 8):`,
      ...(contact.activities || []).slice(0, 8).map((a: { type: string; date: string; description: string; outcome?: string }) => {
        const ago = Math.floor((Date.now() - new Date(a.date).getTime()) / (1000 * 60 * 60 * 24));
        return `  • [${a.type}, ${ago}d ago] ${a.description}${a.outcome ? ` → ${a.outcome}` : ""}`;
      }),
      ``,
      `Generate next-step suggestions per the system instructions. Output ONLY the JSON object.`,
    ].join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ suggestion: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
