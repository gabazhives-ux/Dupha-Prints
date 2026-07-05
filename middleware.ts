import { NextRequest, NextResponse } from "next/server";
import { verifySessionCookieValue, ADMIN_COOKIE_NAME } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminRoute) {
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!verifySessionCookieValue(cookie)) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
