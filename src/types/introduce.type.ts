export interface SoLieu5Sao {
  iconSoLieu: string;
  tieuDeSoLieu: string;
  moTaSoLieu: string;
}

export interface DanhGia5Sao {
  tenNguoiDung: string;
  anhDaiDien: string;
  chucVu: string;
  danhGiaSao: number;
  moTaDanhGia: string;
}

export interface IntroduceResponse {
  _id?: string;

  linkYoutube: string;
  tieuDe: string;
  moTa: string;
  uuDiem5Sao: string[];

  soLieuLienQuan: SoLieu5Sao[];

  tieuDeMoiNguoiNoiVe5Sao: string;
  linkYoutubeMoiNguoiNoiVe5Sao: string;
  moTaMoiNguoiNoiVe5Sao: string;
  uuDiemMoiNguoiNoiVe5Sao: string[];

  moiNguoiDanhGia5Sao: DanhGia5Sao[];

  thongTinLienHe5Sao: string[];
  
  created_at?: string;
  updated_at?: string;
}
