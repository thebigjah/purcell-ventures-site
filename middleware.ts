import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Rep portal auth gate (v1).
 *
 * Protects /rep-portal/* (except /rep-portal/login).
 * Checks for `pv_rep_session` cookie. If missing or invalid, redirects to login.
 *
 * v1 uses a shared password set via REP_PORTAL_PASSWORD env var on Vercel.
 * v2 will swap this for Google sign-in via Auth.js — same middleware shape,
 * different validation step.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only gate /rep-portal/*, allow /rep-portal/login through
  if (!pathname.startsWith("/rep-portal")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/rep-portal/login")) {
    return NextResponse.next();
  }

  const session = req.cookies.get("pv_rep_session");
  if (!session?.value) {
    const url = req.nextUrl.clone();
    url.pathname = "/rep-portal/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rep-portal/:path*"],
};
