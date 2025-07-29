import axiosInstance from "@/lib/axios";
import {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
} from "@/types/auth.type";

export const Login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/merchant/login",
    payload
  );
  return response.data;
};

export const refreshToken = async (
  token: string
): Promise<RefreshTokenResponse> => {
  const response = await axiosInstance.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    { refreshToken: token }
  );
  return response.data;
};
