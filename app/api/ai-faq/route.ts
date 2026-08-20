import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { guard } from "@/lib/api-guard";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You write FAQ pages for small businesses. Given a business description and optional topic hints, output 6-10 high-quality FAQ pairs.

Quality bar:
- Questions are phrased the way a REAL customer would ask them (not how the business would phrase them)
- Answers are 1-3 sentences, conversational, specific
- Answers never overpromise or hype
- Cover a mix of: pricing/cost, process/how-it-works, qualifications/trust, what-makes-you-different, edge cases / "what if"
- No generic filler ("we pride ourselves on quality") — every answer says something concrete

Return ONLY valid JSON in this exact shape, no markdown fences:
{
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}`;

export async function POST(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const { businessName, businessDescription, topics } = await req.json();

    if (!businessName || !businessDescription) {
      return NextResponse.json({ error: "businessName and businessDescription required" }, { status: 400 });
    }

    const userMessage = [
      `Business name: ${businessName}`,
      `What they do: ${businessDescription}`,
      topics && Array.isArray(topics) && topics.length > 0
        ? `Topic hints (cover these in addition to standard FAQs): ${topics.join(", ")}`
        : null,
      "",
      "Generate 6-10 FAQ pairs. Return ONLY the JSON object as specified.",
    ].filter(Boolean).join("\n");

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Attempt to parse JSON — the model sometimes wraps in fences
    const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```\s*$/i, "");
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again or rephrase the description.", raw: text }, { status: 502 });
    }

    if (!parsed.faqs || !Array.isArray(parsed.faqs)) {
      return NextResponse.json({ error: "AI returned unexpected structure.", raw: text }, { status: 502 });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
