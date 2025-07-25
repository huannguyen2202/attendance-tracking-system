// src/types/auth.type.ts

export interface LoginPayload {
  soDienThoai: string;
  matKhau: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    soDienThoai: string;
    fullName?: string;
    role?: string;
  };
}
