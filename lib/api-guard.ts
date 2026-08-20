import { NextRequest, NextResponse } from "next/server";

/**
 * Spend guard for the public AI routes.
 *
 * WHY THIS EXISTS
 *
 * `/api/chat` took a caller-supplied `messages` array and passed it straight to
 * `client.messages.create` with no authentication and no rate limiting. Anyone who found
 * the endpoint had a free Claude proxy billed to Elijah's Anthropic key, for any prompt
 * they liked, at any volume. Three more routes (`ai-faq`, `ai-tools/[slug]`, `health`)
 * were open the same way without the prompt passthrough.
 *
 * These routes power the public chat widget, so they cannot require a login. The controls
 * that work on an anonymous endpoint are: only answer requests that came from our own
 * pages, cap how often one caller can ask, and cap how much any single request can cost.
 *
 * NOT A REPLACEMENT FOR A REAL LIMITER. Serverless functions do not share memory, so the
 * in-process counter below resets per cold start and per instance. It stops a script
 * hammering one instance, which is the actual observed abuse pattern, and it costs
 * nothing and adds no dependency. If spend ever justifies it, move `hits` to Upstash and
 * the call sites do not change.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

// ip -> [timestamps within the window]
const hits = new Map<string, number[]>();

/** Hosts allowed to call these routes. Same-origin plus Vercel previews. */
function originAllowed(req: NextRequest): boolean {
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  if (!origin) {
    // A browser always sends one of these on a cross-origin POST. curl does not, which
    // is precisely the caller this guard is for.
    return false;
  }
  try {
    const host = new URL(origin).hostname;
    return (
      host === "purcellventures.co" ||
      host === "www.purcellventures.co" ||
      host.endsWith(".vercel.app") ||
      host === "localhost" ||
      host === "127.0.0.1"
    );
  } catch {
    return false;
  }
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(req: NextRequest): boolean {
  const ip = clientIp(req);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/**
 * Returns a response to send back immediately, or null when the request may proceed.
 *
 *   const blocked = guard(req);
 *   if (blocked) return blocked;
 */
export function guard(req: NextRequest): NextResponse | null {
  if (!originAllowed(req)) {
    return NextResponse.json(
      { text: "This endpoint only answers requests from purcellventures.co." },
      { status: 403 }
    );
  }
  if (rateLimited(req)) {
    return NextResponse.json(
      { text: "That is a lot of questions at once. Give it a minute and try again." },
      { status: 429 }
    );
  }
  return null;
}

/**
 * Cap what one request can cost before it reaches the model.
 *
 * The rate limit bounds how OFTEN someone can ask. This bounds how EXPENSIVE any single
 * ask can be, which is the other half: one request carrying a hundred thousand tokens of
 * history costs the same as hundreds of normal ones.
 */
export function capMessages(
  messages: unknown,
  { maxTurns = 12, maxChars = 6000 } = {}
): { ok: true; messages: { role: string; content: string }[] } | { ok: false } {
  if (!Array.isArray(messages)) return { ok: false };
  const trimmed = messages.slice(-maxTurns).filter(
    (m): m is { role: string; content: string } =>
      !!m &&
      typeof m === "object" &&
      typeof (m as { content?: unknown }).content === "string" &&
      ((m as { role?: unknown }).role === "user" ||
        (m as { role?: unknown }).role === "assistant")
  );
  if (!trimmed.length) return { ok: false };
  const total = trimmed.reduce((n, m) => n + m.content.length, 0);
  if (total > maxChars) return { ok: false };
  return { ok: true, messages: trimmed };
}
