import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { User } from "@/server/modules/user/user.model";
import { verifyAccessToken, verifyRefreshToken } from "@/server/core/auth";

function adminOnly(req: NextRequest) {
  const a = req.cookies.get("access_token")?.value;
  const r = req.cookies.get("refresh_token")?.value;
  const p = (verifyAccessToken(a) || verifyRefreshToken(r)) as { role?: string } | null;
  if (p?.role !== "admin") throw new Error("FORBIDDEN");
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    adminOnly(req);
    await connectDB();

    const { reason } = await req.json();

    const user = await User.findById(params.id);
    if (!user) return NextResponse.json({ status: 404, message: "Không tìm thấy" }, { status: 404 });

    user.status = "rejected";
    user.rejectionReason = reason || "Không phù hợp tiêu chí.";
    await user.save();

    return NextResponse.json({ status: 200, message: "Đã từ chối tài khoản." });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e?.message === "FORBIDDEN") return NextResponse.json({ status: 403, message: "Forbidden" }, { status: 403 });
    return NextResponse.json({ status: 500, message: e?.message || "Lỗi server" }, { status: 500 });
  }
}
