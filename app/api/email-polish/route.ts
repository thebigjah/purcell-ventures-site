import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Email Polish — rep has a rough draft, wants it sharpened without
 * losing their voice. Different from /api/ai-tools/email-composer which
 * generates from scratch.
 */

const SYSTEM = `You sharpen rough email drafts WITHOUT changing the writer's voice.

Goals:
- Tighter (cut 20-30% of words usually)
- More specific (replace generic phrases with concrete ones)
- Clear ask (every email needs ONE clear next step)
- Subject line that earns the open
- Keep the writer's personality — don't make casual writers sound corporate

Return STRICT JSON, no markdown fences:

{
  "polished_subject": "Tightened, specific subject line. <60 chars.",
  "polished_body": "Full rewritten body. Maintain voice. 20-30% shorter usually.",
  "what_changed": [
    "Specific changes I made and why (e.g., 'cut 3 hedge words', 'made the ask explicit at end', 'subject was too vague')"
  ],
  "subject_alternatives": [
    "2 other subject options if the polished one doesn't land"
  ],
  "voice_notes": "1-sentence honest read on what the writer's voice IS so you can verify the rewrite matches"
}

Quality bar:
- Cuts ruthlessly but doesn't over-tighten (some warmth is good)
- Always has ONE clear ask, not three
- Subject < 60 chars, specific, no clickbait
- Maintain the writer's actual sentence rhythms`;

export async function POST(req: NextRequest) {
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { draft, scenario } = await req.json();
    if (!draft || typeof draft !== "string" || draft.trim().length < 30) {
      return NextResponse.json({ error: "Paste at least a few sentences of email draft" }, { status: 400 });
    }

    const userMessage = [
      scenario ? `Scenario / context: ${scenario}` : null,
      ``,
      `My rough draft:`,
      `"""`,
      draft,
      `"""`,
      ``,
      `Polish per the system instructions. Output ONLY the JSON object.`,
    ].filter(Boolean).join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");

    try {
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ polish: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
