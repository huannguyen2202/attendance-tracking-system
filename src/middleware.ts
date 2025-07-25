import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/home");
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/dashboard/:path*"],
};

// console.log("🔥 Middleware đã kích hoạt:", request.nextUrl.pathname);
