import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith("/home") || pathname.startsWith("/dashboard");
  const isPublicRoute = pathname === "/" || pathname === "/login";

  // 🔒 Nếu vào route bảo vệ mà không có token → chuyển hướng về /login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🔓 Nếu đã đăng nhập mà vào / hoặc /login → chuyển hướng về /home
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Trang root
    "/login", // Trang login
    "/home", // Trang chính
    "/dashboard/:path*", // Các route phụ
  ],
};

// console.log("🔥 Middleware đã kích hoạt:", request.nextUrl.pathname);
