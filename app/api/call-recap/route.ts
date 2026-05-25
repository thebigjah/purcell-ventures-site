import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Call Recap — rep just hung up. Paste messy notes / typed-as-you-went
 * scribbles. AI structures them into clean log entries + extracts:
 * - call outcome
 * - what we committed to
 * - what they committed to
 * - next concrete action with due date
 *
 * Output is structured so it can be auto-logged into the contact's activity log.
 */

const SYSTEM = `You take messy post-call notes from a sales rep and structure them.

Return STRICT JSON, no markdown fences:

{
  "outcome": "1-sentence summary of what happened on the call",
  "key_points": [
    "Specific facts surfaced — pricing concerns, decision-makers, timeline, etc."
  ],
  "objections_raised": [
    "Things the prospect pushed back on. Empty array if none."
  ],
  "they_committed_to": [
    "What the PROSPECT explicitly said they'd do (e.g., 'send vendor list by Friday', 'discuss with partner')"
  ],
  "we_committed_to": [
    "What the REP explicitly said they'd do (e.g., 'send the proposal', 'follow up Tuesday')"
  ],
  "next_action": {
    "what": "The single most important next action for the rep",
    "when": "Specific date or relative time (e.g., 'Today', 'Tomorrow morning', 'Friday after they send the list')",
    "channel": "email | phone | text | in-person | none"
  },
  "vibe": "hot | warm | neutral | cool | cold",
  "stage_change_suggested": "Lead | Contacted | Qualified | Quoted | Negotiation | Closed Won | Closed Lost | no-change",
  "stage_change_reason": "1-sentence why (or 'no advancement signaled' if no-change)",
  "estimated_value_update": "If the call surfaced a new $ figure, return it as a number. Otherwise null."
}

Quality bar:
- Direct. Don't editorialize. Capture what HAPPENED.
- Specific. If the rep wrote "they liked the price", expand based on context — was it the standard or pilot pricing?
- Honest. If the call was bad, vibe should reflect it. Don't sugarcoat.
- If the notes are sparse, return shorter arrays — don't fabricate.`;

export async function POST(req: NextRequest) {
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { notes, contactName, currentStage, currentValue, service } = await req.json();
    if (!notes || typeof notes !== "string" || notes.trim().length < 10) {
      return NextResponse.json({ error: "Paste some notes from your call" }, { status: 400 });
    }

    const userMessage = [
      contactName ? `Contact: ${contactName}` : null,
      currentStage ? `Current stage: ${currentStage}` : null,
      currentValue ? `Current estimated value: $${currentValue}` : null,
      service ? `Service being discussed: ${service}` : null,
      ``,
      `My notes from the call (rough — may have typos, half-sentences, abbreviations):`,
      `"""`,
      notes,
      `"""`,
      ``,
      `Structure per the system instructions. Output ONLY the JSON object.`,
    ].filter(Boolean).join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1800,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ recap: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
