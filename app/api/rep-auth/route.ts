import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
      const match = reps.find((r) => r.password === password);
      if (!match) {
        return NextResponse.json({ error: "Wrong password." }, { status: 401 });
      }
      matchedName = match.name;
    }
    // Shared-password fallback
    else if (sharedPassword) {
      if (password !== sharedPassword) {
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
    res.cookies.set("pv_rep_session", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
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
  res.cookies.delete("pv_rep_session");
  res.cookies.delete("pv_rep_name");
  return res;
}
