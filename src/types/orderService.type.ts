export type OrderServiceResponse = {
  _id: string;
  createdFrom: string;
  created_at: string;
  updated_at: string;
  created_by: {
    _id: string;
    hoTen: string;
    soDienThoai: string;
    hinhDaiDien: string;
  };
  diaChi: string;
  hinhAnh: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idCongViec: any[]; // Bạn có thể khai báo cụ thể hơn nếu biết structure
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idPhuongXa: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idQuanHuyen: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  idTinhTp: any[];
  idUser: string;
  loaiDonHang: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lyDoHuyDon: any[];
  maDichVu: string;
  soDienThoai: string;
  soLuongBaoGia: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  soLuongBaoGias: any[];
  soLuongSanPham: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taiLieuDinhKem: any[];
  tenKhachHang: string;
  thoiGianBatDau: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thongTinDonDichVu: any[];
  trangThaiDon: number;
  xuatThongTinHoaDon: boolean;
  yeuCau: string;
};

export type PaginatedOrderServiceResponse = {
  data: OrderServiceResponse[];
  limit: number;
  page: number;
  status: number;
  totalPages: number;
  totalResults: number;
};
