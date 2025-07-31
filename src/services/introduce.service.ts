import axiosInstance from "@/lib/axios";
import { IntroduceResponse } from "@/types/introduce.type";

export const getIntroduce = async (): Promise<IntroduceResponse[]> => {
  const response = await axiosInstance.get<IntroduceResponse[]>(
    "v2/app/thong-tin-tong-quan-5sao",
  );
  return response.data;
};