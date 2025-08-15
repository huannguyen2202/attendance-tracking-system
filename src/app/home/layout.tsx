/**
 * Guard SSR cho /home:
 * --------------------------------------------------
 * Mục tiêu: tránh "nhấp nháy" và vẫn cho phép vào Home nếu refresh còn hợp lệ.
 *
 * Cơ chế:
 * - Đọc cookie HttpOnly: access_token, refresh_token ngay trên server
 * - Nếu access còn hạn → cho render bình thường
 * - Nếu access hết hạn NHƯNG refresh còn hạn → vẫn cho render; lần gọi API đầu tiên,
 *   axios interceptor phía client sẽ tự /api/auth/refresh để lấy token mới
 * - Nếu cả hai đều không hợp lệ → redirect về /auth/login
 *
 * Vì sao không refresh trực tiếp ở SSR?
 * - Server Component không đảm bảo set-cookie từ sub-request ổn định
 * - Đơn giản và mượt nhất: SSR cho phép render nếu còn refresh, client sẽ auto refresh
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken, verifyRefreshToken } from "@/server/core/auth";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  // ⬇️ cookies() trả về Promise ở môi trường của bạn → cần await
  const store = await cookies();
  const access = store.get("access_token")?.value;
  const refresh = store.get("refresh_token")?.value;

  const okAccess = !!verifyAccessToken(access);
  const okRefresh = !!verifyRefreshToken(refresh);

  // Chỉ khi KHÔNG có bất kỳ token hợp lệ nào mới chặn vào Home
  if (!okAccess && !okRefresh) {
    redirect("/login");
  }

  return children;
}
