import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { verifyAccessToken } from "@/server/core/auth";
import { User } from "@/server/modules/user/user.model";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("access_token")?.value;
    const payload = verifyAccessToken<{ sub: string; role: string }>(token);
    if (!payload) return NextResponse.json({ status: 401, message: "Unauthorized" }, { status: 401 });

    const user = await User.findById(payload.sub).select("_id email hoTen role").lean();
    if (!user) return NextResponse.json({ status: 404, message: "Not found" }, { status: 404 });

    return NextResponse.json({ status: 200, data: { user } });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ status: 500, message: e?.message || "Server error" }, { status: 500 });
  }
}
