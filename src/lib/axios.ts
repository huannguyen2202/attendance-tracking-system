import axios from "axios";
import Cookies from "js-cookie"; // 👈 thêm dòng này

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token từ cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken"); // 👈 dùng cookie thay vì localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
