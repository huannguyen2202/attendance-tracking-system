// src/services/auth.service.ts
import axiosInstance from "../lib/axios";
import { LoginPayload, LoginResponse } from "../types/auth.type";

export const Login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/merchant/login",
    payload
  );
  return response.data;
};
