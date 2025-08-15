import { AxiosError } from "axios";
import axios from "axios";

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ message?: string }>;
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;

    // Nếu token hết hạn
    if (status === 401 || message.toLowerCase().includes("token")) {
      // Tùy chọn: redirect về login
      window.location.href = "/login";
    }

    return message;
  } else {
    console.error("Unknown Error:", error);
    return "Đã xảy ra lỗi không xác định!";
  }
}
