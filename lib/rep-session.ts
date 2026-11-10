/**
 * Signed rep-portal session cookie.
 *
 * The old cookie held the literal "1", and middleware plus every rep API route only checked
 * that it existed. Anyone could set `pv_rep_session=anything` and call the paid model routes.
 *
 * Format: base64url(name) "." issuedAtMs "." base64url(HMAC-SHA256(key, first two parts))
 *
 * Web Crypto only, so the same code runs in Edge middleware and Node route handlers.
 * The key is SHA-256 of a versioned prefix plus the first configured secret:
 * REP_SESSION_SECRET, then REP_PASSWORDS, then REP_PORTAL_PASSWORD. Changing the secret
 * (or any rep password when REP_SESSION_SECRET is unset) signs everyone out. With all
 * three empty, signing and verification both fail, so the portal denies everyone.
 */

export const REP_SESSION_COOKIE = "pv_rep_session";
export const REP_SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

const enc = new TextEncoder();

function secretMaterial(): string {
  return (
    process.env.REP_SESSION_SECRET ||
    process.env.REP_PASSWORDS ||
    process.env.REP_PORTAL_PASSWORD ||
    ""
  );
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  const raw = await crypto.subtle.digest("SHA-256", enc.encode("pv-rep-session-v1:" + secret));
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}

function toB64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]*$/.test(s)) return null;
  try {
    const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

async function sign(payload: string, secret: string): Promise<string> {
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(payload));
  return toB64url(new Uint8Array(sig));
}

/** Constant-time string comparison. Length is not secret here (fixed-size MACs, or hashed inputs). */
export function timingSafeEqualStr(a: string, b: string): boolean {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  const n = Math.max(ab.length, bb.length);
  for (let i = 0; i < n; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

/** Returns the cookie value for `name`, or throws when no secret is configured. */
export async function signSession(name: string, now: number = Date.now()): Promise<string> {
  const secret = secretMaterial();
  if (!secret) throw new Error("rep session secret not configured");
  const payload = `${toB64url(enc.encode(name))}.${now}`;
  return `${payload}.${await sign(payload, secret)}`;
}

/** Returns the rep name from a valid, unexpired cookie value, else null. */
export async function verifySession(
  value: string | null | undefined,
  now: number = Date.now()
): Promise<string | null> {
  if (!value || typeof value !== "string" || value.length > 1024) return null;
  const secret = secretMaterial();
  if (!secret) return null;

  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [nameB64, issuedStr, sig] = parts;
  if (!nameB64 || !/^\d{1,16}$/.test(issuedStr) || !sig) return null;

  const expected = await sign(`${nameB64}.${issuedStr}`, secret);
  if (!timingSafeEqualStr(sig, expected)) return null;

  const issuedAt = Number(issuedStr);
  if (!Number.isSafeInteger(issuedAt)) return null;
  // Allow a minute of clock skew for a cookie issued "in the future".
  if (issuedAt > now + 60_000 || now - issuedAt > REP_SESSION_MAX_AGE_MS) return null;

  const bytes = fromB64url(nameB64);
  if (!bytes) return null;
  let name: string;
  try {
    name = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
  return name.trim() ? name : null;
}

/** Reads and verifies the session cookie from a request. */
export async function repFromRequest(req: {
  cookies: { get(name: string): { value: string } | undefined };
}): Promise<string | null> {
  return verifySession(req.cookies.get(REP_SESSION_COOKIE)?.value);
}
