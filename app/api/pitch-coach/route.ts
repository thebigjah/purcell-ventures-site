import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Pitch Coach — rep pastes their pitch script + scenario.
 * AI returns structured feedback to make the pitch sharper.
 *
 * Different from Objection Handler (mid-call response) and Deal Coach
 * (which deal to work). This is BETWEEN calls — rehearsal feedback.
 */

const SYSTEM = `You are a sales coach. A rep pasted their pitch script for a specific scenario. Critique it honestly so they can sharpen it.

PV ethics: honesty over closing. Reject any pitch element that uses pressure tactics, false urgency, fake scarcity, or guilt. Call those out.

PV pricing for context if pitch references it:
- Digital Starter $99/mo + $400 setup
- Digital Growth $179/mo + $700 setup
- Digital Full $279/mo + $1,000 setup
- Consulting 1-on-1 $175/hr, Workshop $2,500 flat
- Custom Software $1,500-15,000+

Output STRICT JSON, no markdown fences:

{
  "overall_grade": "A | B | C | D | F",
  "what_works": [
    "Specific things in the pitch that are strong — quote the actual words"
  ],
  "what_doesnt": [
    "Specific things that are weak / generic / risky — quote the words + say why"
  ],
  "missing_elements": [
    "Things the pitch should include but doesn't (e.g., 'no discovery question', 'no specific value claim', 'no objection-anticipation')"
  ],
  "tightened_version": "A REWRITTEN version of their pitch that's 30% shorter, keeps the strong parts, fixes the weak parts. Maintain their voice — don't make it sound corporate if they wrote casually. 100-250 words max.",
  "delivery_notes": [
    "Tactical notes on HOW to say it — pacing, where to pause, words to emphasize, where to stop and let prospect respond"
  ],
  "anticipated_objections": [
    "If this pitch lands, prospects will likely object with: [specific objection]. Be ready with: [brief response strategy]"
  ]
}

Quality bar:
- Specific. Quote the rep's actual words when calling out strengths/weaknesses.
- Honest. If the pitch is bad, give it a C/D/F. Don't grade-inflate.
- Constructive. Every "what doesn't work" should pair with the fix in "tightened_version".
- Respect their voice. The rewrite should sound like a sharper version of them, not a corporate template.`;

export async function POST(req: NextRequest) {
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { pitch, scenario, service } = await req.json();
    if (!pitch || typeof pitch !== "string" || pitch.trim().length < 20) {
      return NextResponse.json({ error: "Paste at least a few sentences of your pitch" }, { status: 400 });
    }

    const userMessage = [
      `Scenario: ${scenario || "(not specified)"}`,
      service ? `Service being pitched: ${service}` : null,
      ``,
      `My pitch script:`,
      `"""`,
      pitch,
      `"""`,
      ``,
      `Critique per the system instructions. Output ONLY the JSON object.`,
    ].filter(Boolean).join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2500,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ coaching: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
