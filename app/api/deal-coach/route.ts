import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * AI Deal Coach — looks at the rep's WHOLE pipeline and identifies the 3-5
 * deals that need attention this week + why. Higher-order than per-contact AI:
 * this is "what should I be working on today" coaching.
 *
 * Input: list of contacts (filtered by owner already on the client side)
 * Output: structured ranked list with reasoning
 */

const SYSTEM = `You are a sales coach reviewing a rep's pipeline. The rep has limited time today — you tell them which 3-5 contacts to prioritize and exactly why.

Consider:
- Estimated value × probability of close (high-value, high-probability = top priority)
- Time since last touch (deals go cold after 7-10 days of silence)
- Stage urgency (Negotiation > Quoted > Qualified > Contacted > Lead)
- Overdue follow-ups (red flag — these need attention TODAY)
- Vibe signals from the notes/activities

Output STRICT JSON, no markdown fences:

{
  "priorities": [
    {
      "contact_id": "uuid",
      "contact_name": "First Last (Company)",
      "rank": 1,
      "urgency": "today | this_week | this_month",
      "why_now": "1-2 sentences: why THIS deal needs attention NOW, with specific evidence from the data",
      "specific_action": "Exactly what to do — not generic 'follow up' but specific action and channel",
      "estimated_impact": "What closing or progressing this deal means in $$ + strategic value"
    }
  ],
  "dead_or_stalled": [
    {
      "contact_id": "uuid",
      "contact_name": "First Last (Company)",
      "diagnosis": "Why this deal looks cold — be specific (e.g., '21 days silent through 2 follow-ups, no response to demo offer')",
      "recommend": "What to do: 'Send last-touch with explicit exit', 'Move to Closed Lost', or 'Wait 30 days and re-pitch with new angle'"
    }
  ],
  "pipeline_health": "1-paragraph honest read on the overall pipeline state — is this rep working a thin pipeline? A bloated one with too many cold leads? Concentrated in one stage? Reference the data."
}

Quality bar:
- Rank by IMPACT × URGENCY, not just by value
- Be specific. Reference the actual contact data, not generic advice.
- Honest. If a deal is dead, say so. Don't hype dead deals.
- If the pipeline is healthy and there's nothing urgent today, SAY THAT — don't manufacture urgency.
- Max 5 priorities. Max 5 dead-or-stalled.`;

export async function POST(req: NextRequest) {
  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    const { contacts } = await req.json();
    if (!Array.isArray(contacts)) {
      return NextResponse.json({ error: "Contacts array required" }, { status: 400 });
    }
    if (contacts.length === 0) {
      return NextResponse.json({
        coaching: {
          priorities: [],
          dead_or_stalled: [],
          pipeline_health: "Empty pipeline. Add contacts to the CRM before running Deal Coach.",
        },
      });
    }

    // Build compact summary per contact for the model
    const today = new Date().toISOString().slice(0, 10);
    const contactSummaries = contacts.slice(0, 50).map((c: { id: string; firstName: string; lastName: string; company: string; stage: string; estimatedValue: number; service: string; source: string; nextFollowUp?: string; updatedAt: string; notes: string; activities: { type: string; date: string; description: string; outcome?: string }[]; tags: string[]; }) => {
      const lastActivity = c.activities?.[0];
      const daysSinceTouch = lastActivity
        ? Math.floor((Date.now() - new Date(lastActivity.date).getTime()) / (1000 * 60 * 60 * 24))
        : Math.floor((Date.now() - new Date(c.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
      const followUpOverdue = c.nextFollowUp && c.nextFollowUp < today;
      return {
        id: c.id,
        name: [c.firstName, c.lastName].filter(Boolean).join(" ") || "(unnamed)",
        company: c.company || "",
        stage: c.stage,
        value: c.estimatedValue,
        service: c.service,
        source: c.source,
        tags: c.tags,
        daysSinceTouch,
        followUpOverdue,
        nextFollowUp: c.nextFollowUp,
        recentActivities: (c.activities || []).slice(0, 3).map((a) => ({ type: a.type, days_ago: Math.floor((Date.now() - new Date(a.date).getTime()) / (1000 * 60 * 60 * 24)), description: a.description })),
        notes_excerpt: (c.notes || "").substring(0, 300),
      };
    });

    const userMessage = `Today's date: ${today}\n\nMy pipeline (${contactSummaries.length} contacts):\n\n${JSON.stringify(contactSummaries, null, 2)}\n\nGive me the coaching per the system instructions. Output ONLY the JSON object.`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
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
