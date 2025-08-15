import axios from "@/lib/axios";

export type Role = "admin" | "staff";
export type User = { _id: string; email: string; hoTen: string; role: Role };

// (tuỳ backend) phản hồi register thường có message + userId
type RegisterResponse = {
  status?: number;
  message?: string;
  data?: { userId?: string };
};

export const AuthService = {
  async adminLogin(payload: { email: string; password: string }) {
    const { data } = await axios.post("/auth/admin/login", payload);
    return data.data as { user: User };
  },

  async login(payload: { email: string; password: string }) {
    const { data } = await axios.post("/auth/login", payload);   // 👈 login chung
    return data.data as { user: User };
  },

  async me() {
    const { data } = await axios.get("/users/me");
    return data.data as { user: User };
  },

  async logout() {
    await axios.post("/auth/logout");
  },

  async refresh() {
    await axios.post("/auth/refresh");
  },

  /** Đăng ký nhân viên: tạo user role=staff, status=pending */
  async registerStaff(payload: { hoTen: string; email: string; password: string }) {
    const { data } = await axios.post<RegisterResponse>("/auth/register", payload);
    return data; // { status, message, data: { userId } }
  },
};

export default AuthService;
