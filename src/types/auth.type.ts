// src/types/auth.type.ts

export interface LoginPayload {
  soDienThoai: string;
  matKhau: string;
}

export interface LoginResponse {
  tokens: {
    access: {
      token: string;
      expires: string; // ISO date string
    };
    refresh: {
      token: string;
      expires: string; // ISO date string
    };
  };
  user: {
    id: string;
    soDienThoai: string;
    hoTen: string;
    diaChi: string;
    maMerchant: string;
    isActive: boolean;
    trangThai: {
      status: number;
      lydoKhoa: string | null;
      thoiGianKhoa: string | null;
    };
    xacMinhDanhTinh?: {
      canCuoc?: {
        matTruoc?: {
          duongDan: string;
          tenTepDinhKem: string;
        };
        matSau?: {
          duongDan: string;
          tenTepDinhKem: string;
        };
      };
      status: number;
    };
    maSoThue?: {
      maSo: string;
      status: number;
    };
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    idPhuongXa: string;
    idQuanHuyen: string;
    idTinhTp: string;
  };
}
