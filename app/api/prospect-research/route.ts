import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Prospect Research — auth-gated to logged-in reps. Takes contact data,
 * returns structured research designed for sales prep.
 *
 * Important note on capabilities: this does NOT browse the web. It reasons
 * from the inputs + the rep's own knowledge of PV's product catalog to
 * generate a structured pre-call brief. We're explicit about this so reps
 * don't think they're getting real-time research.
 */

const SYSTEM = `You are a sales research assistant for Purcell Ventures LLC, a Georgia-based small-business AI + software company. A sales rep is about to talk to a prospect and needs a fast pre-call brief.

You DO NOT have web access. You reason from:
1. The contact info the rep gives you (name, company, industry, etc.)
2. Your training knowledge of how businesses in that industry typically operate
3. Your knowledge of Purcell Ventures' product catalog

Purcell Ventures product catalog (use this to recommend fit):
- DIGITAL SERVICES (subscription): Starter $99/mo + $400 setup (website + AI chatbot + lead form), Growth $179/mo + $700 setup (+ booking + email + social + reviews), Full $279/mo + $1,000 setup (+ CRM + invoicing + AI content)
- AI CONSULTING: 1-on-1 $175/hr, Small Group $125/person, Workshop $2,500 flat (up to 20), Corporate quoted
- CUSTOM SOFTWARE: $1,500-15,000+ per project
- STEADY (Personal IT for individuals/households): $79-149/mo
- COURSES: $297-2,997

For Digital tiers, Pilot Partner offer: 30% off setup + 30% off first 6 months, in exchange for testimonial + case study rights + 1 referral intro. 3 spots remaining.

Output STRICT JSON, no markdown fences:

{
  "company_snapshot": "2-3 sentence summary of what this business likely does, based on industry + name. Be specific. Acknowledge uncertainty when relevant.",
  "likely_pain_points": [
    "Specific pain point 1, framed as something a real owner would say (not consultant-speak)",
    "Pain point 2",
    "Pain point 3"
  ],
  "service_fit": {
    "primary_recommendation": "Which PV service best fits, with a one-sentence reason",
    "secondary_recommendation": "Backup or upsell path",
    "do_not_recommend": "What NOT to lead with for this prospect type, and why"
  },
  "opening_line": "A single sentence the rep could use to open the conversation. Specific to the prospect, not a generic 'how's business' opener.",
  "questions_to_ask": [
    "Discovery question 1 — should surface a specific pain or fit",
    "Discovery question 2",
    "Discovery question 3"
  ],
  "red_flags": [
    "Thing to watch for that might disqualify this prospect (e.g., 'if they already have an enterprise CRM, Digital Full is wrong fit')"
  ],
  "confidence_caveat": "Honest one-sentence note about what you're uncertain about. Reps should know what was guessed vs known."
}

Quality bar:
- Specific over generic. "Solo plumber probably loses 30% of after-hours leads" not "they have lead generation challenges."
- Industry-aware. Salon advice ≠ plumber advice ≠ accounting firm advice.
- Honest about uncertainty. If the rep gave you nothing useful, say so.
- Never invent facts about the specific company (no fake testimonials, no fake recent news).`;

export async function POST(req: NextRequest) {
  // Auth check — same as rep-ask
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated. Sign in at /rep-portal/login." }, { status: 401 });
  }

  try {
    const { firstName, lastName, company, title, service, source, notes, tags } = await req.json();

    if (!company && !firstName && !lastName) {
      return NextResponse.json({ error: "Need at least a name or company to research" }, { status: 400 });
    }

    const userMessage = [
      `Contact: ${[firstName, lastName].filter(Boolean).join(" ") || "(unknown name)"}`,
      `Company: ${company || "(no company)"}`,
      title ? `Title: ${title}` : null,
      service ? `Service being discussed: ${service}` : null,
      source ? `Lead source: ${source}` : null,
      tags && tags.length > 0 ? `Tags: ${tags.join(", ")}` : null,
      notes ? `Existing rep notes: ${notes}` : null,
      ``,
      `Generate the pre-call brief per the system instructions. Output ONLY the JSON object.`,
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
      return NextResponse.json({ research: parsed });
    } catch {
      return NextResponse.json({ error: "AI returned malformed JSON. Try again.", raw: text }, { status: 502 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
