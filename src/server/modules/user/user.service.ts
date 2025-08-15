import api from "@/lib/axios";

export type User = {
  _id: string;
  email: string;
  hoTen: string;
  role: "admin" | "staff";
};

/** Lấy user hiện tại từ cookie HttpOnly (server đọc cookie) */
export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/users/me"); // /api/users/me
  return res.data.data.user as User;
}

/** Đăng xuất: server xoá cookie HttpOnly */
export async function postLogout(): Promise<void> {
  await api.post("/auth/logout"); // /api/auth/logout
}
