import axiosInstance from "@/lib/axios";

import { PaginatedOrderServiceResponse } from "@/types/orderService.type";

export const getOrderService = async (
  page = 1,
  limit = 10
): Promise<PaginatedOrderServiceResponse> => {
  const response = await axiosInstance.get<PaginatedOrderServiceResponse>(
    `v2/app/don-dich-vu/merchant?page=${page}&limit=${limit}&trangThaiDonHang=1&sortBy=created_at:desc`
  );
  return response.data;
};