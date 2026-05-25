import { NextResponse } from "next/server";

/**
 * Health endpoint — public.
 * Returns env detection (without exposing values) + build info.
 * Use for monitoring / post-deploy smoke checks.
 */

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    build: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) || "local",
    env: {
      anthropic_configured: !!process.env.ANTHROPIC_API_KEY,
      rep_passwords_mode: process.env.REP_PASSWORDS
        ? "per-rep"
        : process.env.REP_PORTAL_PASSWORD
          ? "shared"
          : "unconfigured",
    },
    capabilities: [
      "ai-prospect-research",
      "ai-next-step",
      "ai-conversation-summary",
      "ai-deal-coach",
      "ai-objection-handler",
      "ai-pitch-coach",
      "ai-call-recap",
      "ai-email-polish",
      "ai-tool-framework (11 customer tools)",
      "crm-v2 (6 views)",
      "contact-health-score",
      "csv-import",
      "contact-merge",
      "bulk-operations",
      "saved-searches",
      "activity-filtering",
      "email-templates",
      "calendar-view",
      "deal-coach-view",
      "leaderboard-with-medals",
      "sample-data-seeder",
      "admin-onboarding-helper",
    ],
  });
}
