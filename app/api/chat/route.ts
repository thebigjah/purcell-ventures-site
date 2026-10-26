import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { guard, capMessages } from "@/lib/api-guard";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `You are the Purcell Ventures virtual assistant. Keep responses short: one to three sentences, unless a list is clearer.

Purcell Ventures LLC is registered in Georgia and run by Elijah Purcell from Tuscaloosa, Alabama. Three core divisions plus a sister brand:

1. DIGITAL SERVICES: websites, AI chatbots, booking systems, email marketing, CRM, invoicing, social scheduling, and 20+ more tools. One monthly subscription: Starter $99/mo, Growth $179/mo, Full $279/mo. Setup fee $400 to $1,000, paid once.

2. AI CONSULTING: hands-on training sessions for business teams. 1-on-1 ($175/hr), Small Group ($125/person), Workshop ($2,500 flat up to 20 people), Corporate (custom quote). 5 session types: AI Basics for Business (2 hrs), ChatGPT in Your Workflow (3 hrs), AI for Marketing & Social Media (2.5 hrs), Automating Your Business (4 hrs), Custom Team Training.

3. CUSTOM SOFTWARE: mobile apps, web apps, AI integrations, automation. Small projects $1,500 to $3,500, full apps $5,000 to $15,000 and up.

SISTER BRAND, MANTLE FIELD SERVICES: gutter cleaning ($100+), pressure washing ($75+), lawn care ($50+). Owner-operated, Metro Atlanta only. Run separately from Purcell Ventures core divisions. Site: mantle-field-site.vercel.app (custom domain coming).

Contact: elijah@purcell-ventures.com or (205) 462-7839
Book consulting: purcellventures.co/consulting/book
Field services / quotes: mantle-field-site.vercel.app
Digital services: purcellventures.co/digital

If someone wants to book, get a quote, or learn more, point them to the right page or contact. Never make up pricing or services not listed above.

WRITING RULES for every reply: plain sentences. Never use em dashes, en dashes, semicolons, middle dots, vertical bars or arrows. Never write "it's not X, it's Y" contrasts. Use active voice. No hype words, slogans or filler. Give specific facts from above or say you do not know and point to the contact details.`;

export async function POST(req: NextRequest) {
  // This route had no authentication and no rate limiting, and it passed the caller's
  // `messages` array straight through to Anthropic. That is a free Claude proxy billed
  // to Elijah's key: any prompt, any volume, from anyone who found the URL.
  const blocked = guard(req);
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const capped = capMessages(body?.messages);
    if (!capped.ok) {
      return NextResponse.json(
        { text: "I could not read that. Try a shorter question." },
        { status: 400 }
      );
    }
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM,
      messages: capped.messages as Anthropic.MessageParam[],
    });
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ text: "Something went wrong. Try reaching out at (205) 462-7839." }, { status: 500 });
  }
}
