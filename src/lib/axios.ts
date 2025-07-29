import axios from "axios";
import Cookies from "js-cookie";
import { refreshToken as fetchNewToken } from "@/services/auth.service";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window !== "undefined") {
  // Gắn token vào request
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

  // Auto refresh khi bị lỗi 401
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refresh = Cookies.get("refreshToken");
        if (!refresh) {
          return Promise.reject(error);
        }

        try {
          const res = await fetchNewToken(refresh);

          // Cập nhật lại token mới vào cookie
          Cookies.set("accessToken", res.tokens.access.token, {
            expires: 7,
            secure: true,
            sameSite: "Lax",
          });

          // Gắn lại token mới và retry request
          originalRequest.headers.Authorization = `Bearer ${res.tokens.access.token}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Trường hợp refresh token cũng lỗi → redirect về login
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
