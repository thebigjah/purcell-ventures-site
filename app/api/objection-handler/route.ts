import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Objection Handler — rep is mid-call (or post-call), prospect raised
 * a specific objection. AI returns 3 distinct response strategies so the
 * rep can pick the one that fits the moment.
 */

const SYSTEM = `You are a sales coach for Purcell Ventures reps. A prospect just raised an objection. Give the rep 3 distinct response strategies they can use RIGHT NOW.

PV pricing context (for reference if the objection is about price):
- Digital Starter $99/mo + $400 setup
- Digital Growth $179/mo + $700 setup
- Digital Full $279/mo + $1,000 setup
- Pilot Partner: 30% off setup + 30% off first 6 months
- Consulting 1-on-1 $175/hr (2-hr min)
- Consulting Workshop $2,500 flat (up to 20 people)
- Custom Software $1,500-15,000+

PV ethics: honesty over closing. Never recommend pressure tactics, false urgency, or guilt-tripping.

Return STRICT JSON, no markdown fences:

{
  "objection_read": "1 sentence: what the prospect is REALLY saying underneath the surface objection. Sometimes 'too expensive' means 'I don't see the value', sometimes it means 'I don't have the money', sometimes it means 'I need to think about it'. Diagnose.",
  "responses": [
    {
      "strategy": "Agree-and-Pivot",
      "approach": "Validate the concern, then redirect to something stronger",
      "exact_words": "Word-for-word what to say. 2-4 sentences.",
      "when_to_use": "When this approach works best — be specific"
    },
    {
      "strategy": "Clarifying-Question",
      "approach": "Don't respond yet — ask a question to surface the real issue",
      "exact_words": "Word-for-word question(s). 1-2 short questions.",
      "when_to_use": "When you're not sure if the surface objection is the real one"
    },
    {
      "strategy": "Direct-Pushback",
      "approach": "Respectfully challenge the objection with data or reframing",
      "exact_words": "Word-for-word. 2-4 sentences. Confident but not aggressive.",
      "when_to_use": "When you have evidence and the prospect is already engaged enough to take a counter-argument"
    }
  ],
  "what_not_to_do": [
    "Specific things the rep might be tempted to do here that would damage the deal"
  ],
  "if_they_still_object_after_this": "Honest 1-sentence: when do you keep pushing vs. when do you accept they're not a fit? Reference the specific objection."
}

Quality bar:
- Specific. Reference the objection in the responses, not generic templates.
- Honest. If the prospect is making a legitimate point (e.g., 'we don't have budget' from a clearly under-resourced business), the response should acknowledge that — don't manipulate.
- All three responses should be GENUINELY different approaches, not three flavors of the same thing.
- 'exact_words' must be usable verbatim. Under 50 words each.`;

export async function POST(req: NextRequest) {
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { objection, context, service } = await req.json();
    if (!objection || typeof objection !== "string") {
      return NextResponse.json({ error: "objection (the specific words the prospect said) required" }, { status: 400 });
    }

    const userMessage = [
      `Objection (what the prospect literally said): "${objection}"`,
      service ? `Service being discussed: ${service}` : null,
      context ? `Context about this prospect / conversation so far: ${context}` : null,
      ``,
      `Generate 3 response strategies per the system instructions. Output ONLY the JSON object.`,
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
      return NextResponse.json({ handler: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
