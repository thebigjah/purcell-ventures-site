/**
 * Resend client wrapper.
 *
 * Use `sendEmail()` everywhere instead of importing Resend directly.
 * When RESEND_API_KEY is not set, this gracefully no-ops (logs the email
 * to console) so dev works without forcing Elijah to set up the account.
 *
 * When RESEND_API_KEY IS set, this actually delivers via Resend.
 *
 * Free tier: 100 emails/day, 3,000/mo. More than enough for v0.
 */

import { Resend } from "resend";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

const FROM_DEFAULT = process.env.RESEND_FROM_EMAIL || "Purcell Ventures <hello@purcellventures.co>";

export async function sendEmail(params: SendEmailParams): Promise<{ ok: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Graceful no-op when key not set — log so Vercel/dev surfaces it
    console.log("[RESEND no-op — RESEND_API_KEY not set]", {
      to: params.to,
      subject: params.subject,
      preview: params.html.slice(0, 200),
    });
    return { ok: true, id: "no-op", error: "RESEND_API_KEY not configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_DEFAULT,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
      tags: params.tags,
    });

    if (result.error) {
      console.error("[RESEND error]", result.error);
      return { ok: false, error: result.error.message };
    }

    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error("[RESEND exception]", err);
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
