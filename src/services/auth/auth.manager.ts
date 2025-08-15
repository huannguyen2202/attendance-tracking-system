import { AuthService } from "./auth.service";

/** Đăng nhập Admin: server sẽ set cookie HttpOnly "access_token" */
export async function loginAdmin(payload: { email: string; password: string }) {
  const { user } = await AuthService.adminLogin(payload);
  return user; // nếu muốn lưu local state thì setState ở component/store
}

/** Lấy hồ sơ hiện tại (server đọc cookie) */
export async function fetchMe() {
  const { user } = await AuthService.me();
  return user;
}

/** Đăng xuất: xoá cookie ở server, client điều hướng về /admin/login */
export async function logoutAdmin() {
  await AuthService.logout();
  if (typeof window !== "undefined") window.location.href = "/admin/login";
}

/** (Tuỳ chọn) Refresh session nếu bạn có endpoint POST /api/auth/refresh */
export async function refreshSession() {
  await AuthService.refresh(); // server set lại cookie access_token nếu cần
}
