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
    idCongViec: any[];      // Bạn có thể khai báo cụ thể hơn nếu biết structure
    idPhuongXa: any[];
    idQuanHuyen: any[];
    idTinhTp: any[];
    idUser: string;
    loaiDonHang: number;
    lyDoHuyDon: any[];
    maDichVu: string;
    soDienThoai: string;
    soLuongBaoGia: number;
    soLuongBaoGias: any[];
    soLuongSanPham: number;
    taiLieuDinhKem: any[];
    tenKhachHang: string;
    thoiGianBatDau: string;
    thongTinDonDichVu: any[];
    trangThaiDon: number;
    xuatThongTinHoaDon: boolean;
    yeuCau: string;
};

export type PaginatedOrderServiceResponse = {
    data: OrderService[];
    limit: number;
    page: number;
    status: number;
    totalPages: number;
    totalResults: number;
};