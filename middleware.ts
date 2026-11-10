import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REP_SESSION_COOKIE, verifySession } from "@/lib/rep-session";

/**
 * Rep portal auth gate.
 *
 * Protects /rep-portal/* (except /rep-portal/login). The `pv_rep_session` cookie must be a
 * valid, unexpired HMAC-signed session issued by /api/rep-auth (see lib/rep-session.ts).
 * Anything else redirects to login and the bad cookie is cleared.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only gate /rep-portal/*, allow /rep-portal/login through
  if (!pathname.startsWith("/rep-portal")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/rep-portal/login")) {
    return NextResponse.next();
  }

  const raw = req.cookies.get(REP_SESSION_COOKIE)?.value;
  const rep = await verifySession(raw);
  if (!rep) {
    const url = req.nextUrl.clone();
    url.pathname = "/rep-portal/login";
    url.searchParams.set("redirect", pathname);
    const res = NextResponse.redirect(url);
    if (raw !== undefined) res.cookies.delete(REP_SESSION_COOKIE);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rep-portal/:path*"],
};
