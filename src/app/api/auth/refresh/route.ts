/**
 * /api/auth/refresh
 * --------------------------------------------------
 * Mục tiêu:
 * - Nhận refresh_token từ cookie HttpOnly
 * - Nếu hợp lệ: phát hành access_token (~15') và refresh_token (~7 ngày) MỚI
 * - Ghi 2 cookie mới (HttpOnly, SameSite=Lax, Secure ở production)
 * - Trả { ok: true } cho client
 *
 * Ghi chú an toàn (nâng cao):
 * - Có thể lưu HASH của refresh token theo session trong DB/Redis (reuse-detection)
 * - Mỗi lần refresh: xóa token cũ, lưu token mới → nếu thấy token cũ bị dùng lại => revoke tất cả
 */
import { NextRequest, NextResponse } from "next/server";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "@/server/core/auth";
import { connectDB } from "@/server/config/db";
import { User } from "@/server/modules/user/user.model";

// ===== Thêm: gõ kiểu cho dữ liệu lean() để TS không suy ra union dạng mảng =====
import type { Types } from "mongoose";
type Role = "admin" | "staff";
type UserLean = { _id: Types.ObjectId; role: Role };

export async function POST(_req: NextRequest) {
  try {
    await connectDB();

    // Lấy refresh từ cookie HttpOnly
    const refresh = _req.cookies.get("refresh_token")?.value;

    // Kiểm tra refresh token
    const payload = verifyRefreshToken<{ sub: string; role?: string }>(refresh);
    if (!payload?.sub) {
      return NextResponse.json({ status: 401, message: "Refresh token không hợp lệ" }, { status: 401 });
    }

    // (An toàn) kiểm tra user còn tồn tại
    // ===== Chỉnh: lean<UserLean>() + .exec() để TS biết đây là 1 object hoặc null =====
    const user = await User.findById(payload.sub)
      .select("_id role")
      .lean<UserLean>()
      .exec();
    if (!user) {
      return NextResponse.json(
        { status: 401, message: "Không tìm thấy người dùng" },
        { status: 401 }
      );
    }

    // Rotation: cấp token mới mỗi lần
    const newAccess = signAccessToken({ sub: String(user._id), role: user.role }); // ~15'
    const newRefresh = signRefreshToken({ sub: String(user._id), role: user.role }); // ~7 ngày

    const res = NextResponse.json({ status: 200, data: { ok: true } });

    // Ghi lại access_token (HttpOnly)
    res.cookies.set("access_token", newAccess, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15, // 15 phút
    });

    // Ghi lại refresh_token (HttpOnly)
    res.cookies.set("refresh_token", newRefresh, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 ngày
    });

    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ status: 500, message: e?.message || "Lỗi server" }, { status: 500 });
  }
}
