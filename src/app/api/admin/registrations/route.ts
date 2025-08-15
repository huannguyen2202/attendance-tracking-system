import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { User } from "@/server/modules/user/user.model";
import { verifyAccessToken, verifyRefreshToken } from "@/server/core/auth";

function getPayload(req: NextRequest) {
  const a = req.cookies.get("access_token")?.value;
  const r = req.cookies.get("refresh_token")?.value;
  return (verifyAccessToken(a) || verifyRefreshToken(r)) as { role?: string } | null;
}

export async function GET(req: NextRequest) {
  const auth = getPayload(req);
  if (auth?.role !== "admin") return NextResponse.json({ status: 403, message: "Forbidden" }, { status: 403 });

  await connectDB();
  const status = new URL(req.url).searchParams.get("status") || "pending";
  const users = await User.find({ role: "staff", status })
    .select("_id email hoTen status createdAt")
    .sort({ createdAt: 1 })
    .lean();

  return NextResponse.json({ status: 200, data: { users } });
}
