/**
 * Chỉ cho Admin vào khu vực /admin
 * - Nếu access còn hạn → kiểm tra role trong payload
 * - Nếu access hết hạn nhưng refresh còn → vẫn cho vào; client sẽ tự refresh sau
 * - Nếu không có session hoặc role !== admin → chuyển hướng phù hợp
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAccessToken, verifyRefreshToken } from "@/server/core/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const access = store.get("access_token")?.value;
  const refresh = store.get("refresh_token")?.value;

  const payload = (verifyAccessToken(access) || verifyRefreshToken(refresh)) as { role?: string } | null;
  const role = payload?.role;

  if (role !== "admin") {
    // có session nhưng không phải admin → về Home
    if (role) redirect("/home");
    // không có session → về login
    redirect("/login");
  }

  return children;
}
