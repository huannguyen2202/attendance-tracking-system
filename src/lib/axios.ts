import axios from "axios";
import Cookies from "js-cookie";
import {
  refreshAccessToken,
  clearAuthTokens,
} from "@/services/auth/auth.manager";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  // Gắn token vào headers request
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Làm mới token nếu gặp lỗi 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          clearAuthTokens();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
