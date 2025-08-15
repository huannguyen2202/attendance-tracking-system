// Trang gốc "/" chỉ dùng để điều hướng thông minh dựa theo cookie HttpOnly
// - Nếu có session (access_token còn hạn HOẶC refresh_token còn hạn) => vào /home
// - Ngược lại => /auth/login
// Lưu ý: Cookie đang đặt theo server là "access_token" và "refresh_token" (snake_case, HttpOnly)

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken, verifyRefreshToken } from "@/server/core/auth";

export default async function RootPage() {
  // Next 15+: cookies() là Promise => cần await
  const store = await cookies();
  const access = store.get("access_token")?.value;   // đúng tên cookie đã set ở server
  const refresh = store.get("refresh_token")?.value; // đúng tên cookie đã set ở server

  const okAccess = !!verifyAccessToken(access);
  const okRefresh = !!verifyRefreshToken(refresh);

  // Có session => vào thẳng /home (tránh nháy)
  if (okAccess || okRefresh) {
    redirect("/home");
  }

  // Không có session => tới /auth/login
  redirect("/login");
}
