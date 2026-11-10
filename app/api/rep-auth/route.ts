import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REP_SESSION_COOKIE, signSession, timingSafeEqualStr } from "@/lib/rep-session";

/**
 * POST /api/rep-auth
 * Body: { password: string }
 * On success: sets pv_rep_session cookie + pv_rep_name cookie.
 *
 * v2 (now): per-rep passwords via REP_PASSWORDS env var.
 *   Format: "Elijah:adminpw,Luke:lukepw,Jarod:jarodpw,David:davidpw"
 *   - Each rep has their own password
 *   - Rep's name is auto-determined from the password match (no name input)
 *   - Admin detection happens via name match in lib/crm-storage.ts
 *
 * Backwards compat: if REP_PORTAL_PASSWORD is set and REP_PASSWORDS is not,
 * falls back to shared-password mode (requires name input on the login form).
 */

interface RepEntry {
  name: string;
  password: string;
}

function parseRepPasswords(raw: string | undefined): RepEntry[] {
  if (!raw) return [];
  return raw.split(",")
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const colonIdx = pair.indexOf(":");
      if (colonIdx === -1) return null;
      const name = pair.slice(0, colonIdx).trim();
      const password = pair.slice(colonIdx + 1).trim();
      if (!name || !password) return null;
      return { name, password };
    })
    .filter((x): x is RepEntry => x !== null);
}

/**
 * Constant-time password check. Both sides are hashed first so the comparison runs over
 * equal-length digests and leaks neither content nor length.
 */
async function passwordMatches(given: string, expected: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(given)),
    crypto.subtle.digest("SHA-256", enc.encode(expected)),
  ]);
  const hex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf), (x) => x.toString(16).padStart(2, "0")).join("");
  return timingSafeEqualStr(hex(a), hex(b));
}

/** Flat delay on every failed attempt, so guessing costs wall-clock time per try. */
const failDelay = () => new Promise((r) => setTimeout(r, 750));

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name: providedName, password } = body;

    const reps = parseRepPasswords(process.env.REP_PASSWORDS);
    const sharedPassword = process.env.REP_PORTAL_PASSWORD;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password required." }, { status: 400 });
    }

    let matchedName: string | null = null;

    // Per-rep mode (preferred)
    if (reps.length > 0) {
      // Check every entry (no early exit) so timing does not reveal which rep matched.
      let match: RepEntry | null = null;
      for (const r of reps) {
        if ((await passwordMatches(password, r.password)) && !match) match = r;
      }
      if (!match) {
        await failDelay();
        return NextResponse.json({ error: "Wrong password." }, { status: 401 });
      }
      matchedName = match.name;
    }
    // Shared-password fallback
    else if (sharedPassword) {
      if (!(await passwordMatches(password, sharedPassword))) {
        await failDelay();
        return NextResponse.json({ error: "Wrong password." }, { status: 401 });
      }
      if (!providedName || typeof providedName !== "string" || providedName.trim().length < 2) {
        return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
      }
      matchedName = providedName.trim();
    }
    else {
      return NextResponse.json(
        { error: "Server not configured. Set REP_PASSWORDS (preferred) or REP_PORTAL_PASSWORD env var on Vercel." },
        { status: 500 }
      );
    }

    const res = NextResponse.json({ ok: true, name: matchedName });
    const thirtyDays = 60 * 60 * 24 * 30;
    res.cookies.set(REP_SESSION_COOKIE, await signSession(matchedName), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: thirtyDays,
    });
    res.cookies.set("pv_rep_name", matchedName, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: thirtyDays,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}

/** GET /api/rep-auth — reports which auth mode is configured (no secrets revealed) */
export async function GET() {
  const reps = parseRepPasswords(process.env.REP_PASSWORDS);
  const sharedPassword = process.env.REP_PORTAL_PASSWORD;

  if (reps.length > 0) {
    return NextResponse.json({
      mode: "per-rep",
      repCount: reps.length,
      repNames: reps.map((r) => r.name), // public — these are who has accounts, not secrets
    });
  }
  if (sharedPassword) {
    return NextResponse.json({ mode: "shared", repCount: null });
  }
  return NextResponse.json({ mode: "unconfigured", repCount: 0 });
}

/** DELETE /api/rep-auth — clears the session */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(REP_SESSION_COOKIE);
  res.cookies.delete("pv_rep_name");
  return res;
}
