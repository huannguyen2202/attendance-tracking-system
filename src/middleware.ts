import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const { pathname, search } = req.nextUrl;

  const isAdminLogin = pathname === "/admin/login";
  const isAdminArea  = pathname.startsWith("/admin") && !isAdminLogin;

  if (isAdminArea && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  if (isAdminLogin && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
