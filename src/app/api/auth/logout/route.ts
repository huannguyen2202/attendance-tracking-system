import { NextRequest, NextResponse } from "next/server";

/**
 * Logout:
 * - Xóa cả access_token và refresh_token (cookie HttpOnly)
 * - Client sau đó có thể điều hướng về trang login
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ status: 200, data: { ok: true } });

  // Xóa access_token
  res.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  // Xóa refresh_token
  res.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return res;
}
