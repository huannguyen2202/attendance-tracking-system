// src/server/core/auth.ts
// ===============================================
// Helpers cho bảo mật: bcrypt (hash mật khẩu) và JWT (access/refresh)
// - Access token sống ngắn (~15 phút): giảm rủi ro nếu bị lộ
// - Refresh token sống dài (~7 ngày): đảm bảo trải nghiệm đăng nhập mượt
// - Cả 2 token đều lưu trong cookie HttpOnly → FE không đọc được bằng JS
// ===============================================

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/** ===== Bcrypt (hash/so sánh mật khẩu) ===== */
export const hash = (plain: string) => bcrypt.hash(plain, 10);
export const compareHash = (plain: string, hashed: string) => bcrypt.compare(plain, hashed);

/** ===== Đọc ENV cho secret =====
 * Ưu tiên dùng:
 * - JWT_ACCESS_SECRET cho access token
 * - JWT_REFRESH_SECRET cho refresh token
 * (Nếu chưa có, sẽ fallback về JWT_SECRET — KHÔNG KHUYẾN NGHỊ, nên tách riêng)
 */
function getAccessSecret() {
  const s = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  if (!s) throw new Error("❌ Thiếu biến môi trường JWT_ACCESS_SECRET (hoặc JWT_SECRET)");
  return s;
}
function getRefreshSecret() {
  const s = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!s) throw new Error("❌ Thiếu biến môi trường JWT_REFRESH_SECRET (hoặc JWT_SECRET)");
  return s;
}

/** ===== Ký token =====
 * Access token: mặc định 15 phút
 * Refresh token: mặc định 7 ngày
 */
export function signAccessToken(payload: object, expSeconds = 60 * 15) {
  return jwt.sign({ ...payload, typ: "access" }, getAccessSecret(), { expiresIn: expSeconds });
}

export function signRefreshToken(payload: object, expSeconds = 60 * 60 * 24 * 7) {
  return jwt.sign({ ...payload, typ: "refresh" }, getRefreshSecret(), { expiresIn: expSeconds });
}

/** ===== Xác thực token (trả về payload hoặc null) ===== */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyAccessToken<T = any>(token?: string): T | null {
  if (!token) return null;
  try {
    return jwt.verify(token, getAccessSecret()) as T;
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyRefreshToken<T = any>(token?: string): T | null {
  if (!token) return null;
  try {
    return jwt.verify(token, getRefreshSecret()) as T;
  } catch {
    return null;
  }
}
