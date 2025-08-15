import { NextRequest } from "next/server";
import { httpOk, httpBadRequest } from "@/server/core/http";
import { adminLoginController } from "@/server/modules/auth/auth.controller";
import { connectDB } from "@/server/config/db";

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // <-- QUAN TRỌNG: kết nối trước khi query
    const body = await req.json();
    const { user, accessToken } = await adminLoginController(body);

    const res = httpOk({ user });
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
    });
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return httpBadRequest(e.message || "Admin login failed");
  }
}
