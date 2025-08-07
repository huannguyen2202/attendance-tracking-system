export interface StorePartner {
  _id: string;
  tenGianHang?: string;
  loaiGianHang: number;
  linhVucHoatDong: string[];
  linhVucHoatDongSanPham: string[];
  anhDaiDien?: string;
  moTa: string;
  hinhAnh: FileAttachment[];
  email?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idTinhTp?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idQuanHuyen?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idPhuongXa?: any;
  diaChi?: string;
  maGianHang: string;
  soDienThoai: string;
  tuKhoaTimKiem: string[];
  goiDangKy?: GoiDangKy;
  isNoiBat: boolean;
  mangXaHoi?: MangXaHoi[];
  idMerchant: string;
  hoSoNangLuc?: HoSoNangLuc;
  deleted_at?: string | null;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface HoSoNangLuc {
  file: FileAttachment | null;
  status: number;
  lydoTuChoi: string | null;
}

export interface MangXaHoi {
  loaiMangXaHoi: string;
  link: string;
}

export interface GoiDangKy {
  ngayHetHan: string | null;
  loaiGoi: number;
}

export interface FileAttachment {
  tenTepDinhKem: string;
  duongDan: string;
}
