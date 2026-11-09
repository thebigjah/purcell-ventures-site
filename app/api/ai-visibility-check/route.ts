import { NextRequest, NextResponse } from "next/server";
import { guard } from "@/lib/api-guard";
import { checkUrl } from "@/lib/url-safety";
import { safeFetch } from "@/lib/ai-visibility/fetch";
import { checkCrawlers, checkHome, checkHttps, checkLlms, type Fetched } from "@/lib/ai-visibility/analyze";
import type { Finding, Report, Status } from "@/lib/ai-visibility/checks";

// THE AI VISIBILITY CHECK. Fetches one home page plus its /robots.txt and /llms.txt and
// reports what an AI crawler would find. No model call, no API key, no paid service.
//
// Nothing is stored. The URL is not logged, written or kept past the response, and the
// fetched page bodies never leave this function: only the findings go back.
//
// Two limits: guard() refuses callers that are not our own pages and caps any IP at 12
// requests a minute across the public routes, and the counter below caps this route at
// 6 checks per IP per 10 minutes, since each check makes three outbound requests. Both are
// in-memory and per instance, which stops a script hammering one instance and nothing more.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const WINDOW_MS = 10 * 60_000;
const MAX_CHECKS = 6;
const hits = new Map<string, number[]>();

function limited(req: NextRequest): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_CHECKS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function asFetched(r: Awaited<ReturnType<typeof safeFetch>>): Fetched {
  return r.ok ? { ok: true, status: r.status, body: r.body, contentType: r.contentType, finalUrl: r.finalUrl } : { ok: false, error: r.error };
}

export async function POST(req: NextRequest) {
  const blocked = guard(req);
  if (blocked) return NextResponse.json({ error: "This check only runs from purcellventures.co, or you have run it a lot in the last minute." }, { status: blocked.status });
  if (limited(req)) {
    return NextResponse.json({ error: `You can run ${MAX_CHECKS} checks every 10 minutes. Try again shortly.` }, { status: 429 });
  }

  let input = "";
  try {
    const body = await req.json();
    input = typeof body?.url === "string" ? body.url : "";
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a url field." }, { status: 400 });
  }

  const checked = checkUrl(input);
  if (!checked.ok) return NextResponse.json({ error: checked.reason }, { status: 400 });

  const home = await safeFetch(checked.url);
  if (!home.ok) return NextResponse.json({ error: home.error }, { status: 422 });
  if (home.status >= 400) {
    return NextResponse.json({ error: `The home page answered with HTTP ${home.status}, so there is nothing to check.` }, { status: 422 });
  }
  if (!/html|xml|^$/i.test(home.contentType)) {
    return NextResponse.json({ error: `That address returns ${home.contentType.split(";")[0]}, not a web page.` }, { status: 422 });
  }

  // robots.txt and llms.txt live at the root of the host the home page finally landed on.
  const origin = new URL(home.finalUrl).origin;
  const [robots, llms] = await Promise.all([safeFetch(`${origin}/robots.txt`), safeFetch(`${origin}/llms.txt`)]);

  const findings: Finding[] = [
    checkHttps(home.finalUrl),
    checkCrawlers(asFetched(robots)),
    ...checkHome(home.body),
    checkLlms(asFetched(llms)),
  ];
  if (home.truncated) {
    const words = findings.find((f) => f.id === "words");
    if (words) words.found += " The page is larger than 2 MB, so the check read only the first 2 MB.";
  }

  const counts: Record<Status, number> = { pass: 0, warn: 0, fail: 0, info: 0 };
  for (const f of findings) counts[f.status]++;

  const report: Report = {
    url: checked.url.toString(),
    finalUrl: home.finalUrl,
    checkedAt: new Date().toISOString(),
    findings,
    counts,
  };
  return NextResponse.json(report, { headers: { "cache-control": "no-store" } });
}
