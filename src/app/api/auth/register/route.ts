import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import { User } from "@/server/modules/user/user.model";
import { hash } from "@/server/core/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password, hoTen } = await req.json();

    if (!email || !password || !hoTen) {
      return NextResponse.json({ status: 400, message: "Thiếu email / mật khẩu / họ tên" }, { status: 400 });
    }

    const existed = await User.findOne({ email }).lean();
    if (existed) {
      return NextResponse.json({ status: 409, message: "Email đã tồn tại" }, { status: 409 });
    }

    const user = await User.create({
      email: String(email).trim().toLowerCase(),
      hoTen: String(hoTen).trim(),
      password: await hash(String(password)),
      role: "staff",
      status: "pending", // ✅ chờ admin duyệt
    });

    // (Tuỳ chọn) gửi thông báo cho admin biết có đăng ký mới
    return NextResponse.json({
      status: 201,
      data: { userId: String(user._id) },
      message: "Đăng ký thành công. Tài khoản đang chờ admin duyệt.",
    }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ status: 500, message: e?.message || "Lỗi server" }, { status: 500 });
  }
}
