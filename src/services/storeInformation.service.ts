import axiosInstance from "@/lib/axios";
import { StorePartner } from "@/types/storeInformation.type";

export const getStore = async (userId: string): Promise<StorePartner> => {
  const response = await axiosInstance.get<StorePartner>(
    `v2/app/gian-hang-merchant/merchant/${userId}`
  );
  return response.data;
};

