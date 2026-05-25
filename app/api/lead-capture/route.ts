import { NextRequest, NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * For now: logs to console and stores nothing server-side. When Resend
 * is wired (next session), this will save to a Resend audience + send
 * the auto-responder email.
 *
 * Client-side, the page that calls this also stores the lead locally
 * as a fallback so nothing is truly lost.
 */

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, source, intent } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Log to console for now (will go to Vercel logs)
    console.log("[LEAD CAPTURE]", { email, firstName, source, intent, timestamp: new Date().toISOString() });

    // TODO when Resend is wired:
    // 1. Save to Resend audience
    // 2. Send auto-responder with the free templates
    // 3. Optionally tag with source (free-cold-email-pack, etc.)
    // 4. Add to Elijah's drip sequence

    return NextResponse.json({
      ok: true,
      message: "Lead captured. (Auto-email pending Resend integration — Elijah will follow up manually.)",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
