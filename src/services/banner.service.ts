import axiosInstance from "@/lib/axios";
import { BannerResponse } from "@/types/banner.type";

export const getBanner = async (): Promise<BannerResponse[]> => {
  const response = await axiosInstance.get<BannerResponse[]>(
    "v1/banner-tho-thaus",
  );
  return response.data;
};