import mongoose from "mongoose";
import { User } from "@/server/modules/user/user.model";
import { compareHash, signAccessToken } from "@/server/core/auth";
import { AppError } from "@/server/core/errors";

/** Login CHUNG cho mọi role — trả user + accessToken */
export async function login(email: string, password: string) {
  console.log("[LOGIN] email=", email, " db=", mongoose.connection?.name);
  const user = await User.findOne({ email }).select("+password role status");
  if (!user) throw new AppError("INVALID_CREDENTIALS", "Sai email hoặc mật khẩu");

  // ts-ignore chọn password (đã select)
  const ok = await compareHash(password, user.password);
  if (!ok) throw new AppError("INVALID_CREDENTIALS", "Sai email hoặc mật khẩu");

  // Chỉ cho đăng nhập khi đã được duyệt
  if (user.status !== "approved") {
    if (user.status === "pending") throw new AppError("ACCOUNT_PENDING", "Tài khoản đang chờ admin duyệt.");
    if (user.status === "rejected") throw new AppError("ACCOUNT_REJECTED", "Tài khoản đã bị từ chối.");
    throw new AppError("ACCOUNT_SUSPENDED", "Tài khoản tạm khóa.");
  }

  const accessToken = signAccessToken({ sub: String(user._id), role: user.role });
  return {
    user: { _id: user._id, email: user.email, hoTen: user.hoTen, role: user.role },
    accessToken,
  };
}

/** Login chỉ cho admin (nếu muốn giữ route riêng) */
export async function adminLogin(email: string, password: string) {
  console.log("[ADMIN_LOGIN] email=", email, " db=", mongoose.connection?.name);

  const user = await User.findOne({ email, role: "admin" }).select("+password status");
  if (!user) throw new AppError("INVALID_CREDENTIALS", "Tài khoản admin không tồn tại");

  // ts-ignore
  const ok = await compareHash(password, user.password);
  if (!ok) throw new AppError("INVALID_CREDENTIALS", "Sai email hoặc mật khẩu");

  if (user.status !== "approved") {
    throw new AppError("ACCOUNT_NOT_APPROVED", "Tài khoản admin chưa được duyệt/kích hoạt.");
  }

  const accessToken = signAccessToken({ sub: String(user._id), role: "admin" });
  return {
    user: { _id: user._id, email: user.email, hoTen: user.hoTen, role: user.role },
    accessToken,
  };
}
