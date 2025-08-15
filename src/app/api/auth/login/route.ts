import { NextRequest } from "next/server";
import { httpOk, httpBadRequest } from "@/server/core/http";
import { loginController } from "@/server/modules/auth/auth.controller";
import { connectDB } from "@/server/config/db";
import { signRefreshToken } from "@/server/core/auth";

/**
 * Đăng nhập CHUNG
 * - Xác thực user, check status === "approved"
 * - Set cookie HttpOnly:
 *   + access_token: 15 phút
 *   + refresh_token: 7 ngày
 * - Trả { user } để FE điều hướng theo role
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { user, accessToken } = await loginController(body);
    const res = httpOk({ user });

    // access_token ~ 15 phút
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 15,
    });

    // refresh_token ~ 7 ngày
    const refreshToken = signRefreshToken({ sub: String(user._id), role: user.role });
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return httpBadRequest(e.message || "Đăng nhập thất bại");
  }
}
