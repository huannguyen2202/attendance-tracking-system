import Cookies from "js-cookie";
import { LoginPayload } from "@/types/auth.type";
import { Login, refreshToken } from "./auth.service";

// Cấu hình cookie dùng chung
const cookieOptions = {
  expires: 7,
  secure: true,
  sameSite: "Lax" as const,
};

// Lưu token vào cookie
export const saveAuthTokens = (
  accessToken: string,
  refreshTokenValue: string
) => {
  Cookies.set("accessToken", accessToken, cookieOptions);
  Cookies.set("refreshToken", refreshTokenValue, cookieOptions);
};

// Lưu thông tin user (nếu cần lưu riêng)
export const saveUserInfo = (user: object) => {
  Cookies.set("userInfo", JSON.stringify(user), cookieOptions);
};

// Xóa token/user
export const clearAuthTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("userInfo");
};

// Đăng nhập và lưu token
export const loginAndSaveSession = async (payload: LoginPayload) => {
  const res = await Login(payload);
  saveAuthTokens(res.tokens.access.token, res.tokens.refresh.token);
  saveUserInfo(res.user);
  return res.user;
};

// Làm mới access token
export const refreshAccessToken = async () => {
  const refresh = Cookies.get("refreshToken");
  if (!refresh) throw new Error("Không tìm thấy refresh token");

  const res = await refreshToken(refresh);
  saveAuthTokens(res.tokens.access.token, res.tokens.refresh.token);
  return res.tokens.access.token;
};

// Đăng xuất
export const logout = () => {
  clearAuthTokens();
  window.location.href = "/login";
};
