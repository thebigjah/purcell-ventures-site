import { NextRequest, NextResponse } from "next/server";
import { sendEmail, isResendConfigured } from "@/lib/resend-client";
import { adminDailyDigest } from "@/lib/email-templates";

/**
 * Daily digest endpoint — meant to be triggered by Vercel Cron.
 *
 * To wire to Vercel Cron, add to vercel.json:
 *   { "crons": [{ "path": "/api/cron/daily-digest", "schedule": "0 13 * * *" }] }
 * That schedule = 8 AM ET (13 UTC) daily.
 *
 * Security: Vercel Cron requests carry a CRON_SECRET header (if you set the
 * CRON_SECRET env var). We verify here to prevent external triggers.
 *
 * Data limitation: this currently sends a SAMPLE digest because the CRM is
 * localStorage-backed. Once Firestore is wired, this pulls real data.
 */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify cron secret if set (security against external invocation)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!isResendConfigured()) {
    return NextResponse.json({
      ok: false,
      skipped: true,
      reason: "RESEND_API_KEY not configured. Set env var + RESEND_FROM_EMAIL to enable digest.",
    });
  }

  const adminEmail = process.env.ADMIN_DIGEST_EMAIL || "elijah@purcell-ventures.com";

  // Sample digest data — once Firestore lands, replace with real CRM queries
  // For now: hardcoded values to verify the email pipeline works
  const summary = {
    overdueCount: 0,
    todayCount: 0,
    openPipeline: 0,
    hotDeals: [] as Array<{ name: string; stage: string; value: number }>,
    leadsCapturedToday: 0,
  };

  const tmpl = adminDailyDigest(summary);
  const result = await sendEmail({
    to: adminEmail,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
    replyTo: adminEmail,
    tags: [{ name: "type", value: "daily-digest" }],
  });

  return NextResponse.json({
    ok: result.ok,
    emailId: result.id,
    error: result.error,
    note: "Sample digest sent. Once Firestore lands, this will pull real CRM data.",
  });
}
