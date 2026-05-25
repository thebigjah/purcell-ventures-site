import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isResendConfigured } from "@/lib/resend-client";
import { leadMagnetWelcome } from "@/lib/email-templates";

/**
 * Lead capture endpoint.
 *
 * When RESEND_API_KEY env var is set, sends an auto-responder welcome email
 * via Resend. Otherwise logs to console and the page-side localStorage backs
 * up the lead.
 */

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, source, intent } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // Log to console (Vercel function logs)
    console.log("[LEAD CAPTURE]", { email, firstName, source, intent, timestamp: new Date().toISOString() });

    // Send auto-responder email if Resend is configured
    let emailResult: { ok: boolean; id?: string; error?: string } = { ok: false };
    if (isResendConfigured()) {
      const tmpl = leadMagnetWelcome(firstName);
      emailResult = await sendEmail({
        to: email,
        subject: tmpl.subject,
        html: tmpl.html,
        text: tmpl.text,
        replyTo: "elijah@purcell-ventures.com",
        tags: [
          { name: "source", value: source || "unknown" },
          { name: "intent", value: intent || "unknown" },
        ],
      });
    }

    return NextResponse.json({
      ok: true,
      emailSent: emailResult.ok,
      resendConfigured: isResendConfigured(),
      message: emailResult.ok
        ? "Captured + welcome email sent."
        : isResendConfigured()
          ? `Captured (email send failed: ${emailResult.error || "unknown"})`
          : "Captured. Set RESEND_API_KEY on Vercel to auto-send welcome emails.",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
