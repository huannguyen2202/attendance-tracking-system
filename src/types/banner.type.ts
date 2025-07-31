export type BannerLinkType = '1' | '2' | '3' | '4';

export interface BannerItem {
  hinhAnhBanner: string;
  tieuDe: string;
  loaiBanner: string;
  loaiLink: BannerLinkType; // 1: website, 2: tạo đơn, 3: gian hàng, 4: sản phẩm
  linkApDung: string;
  trangThaiHienThi: string;
  viTriHienThi: number;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}

export interface BannerResponse {
  hinhAnhBanner: string;
  tieuDe: string;
  loaiBanner: string;
  loaiLink: BannerLinkType; // 1: website, 2: tạo đơn, 3: gian hàng, 4: sản phẩm
  linkApDung: string;
  trangThaiHienThi: string;
  viTriHienThi: number;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
}

export interface BannerPayload {
  page: number;
  limit: number;
}
