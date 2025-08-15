import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// ==============================
// CẤU HÌNH CHUNG
// ==============================
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // QUAN TRỌNG: gửi cookie HttpOnly kèm request
  headers: { "Content-Type": "application/json" },
});

// Nếu login của bạn là "/login" thì đổi biến này
const LOGIN_PATH = "/login";

// ==============================
// CHỐNG GỌI REFRESH TRÙNG LẶP
// ==============================
// Khi nhiều request cùng bị 401, ta chỉ gọi /auth/refresh 1 lần.
// Các request còn lại sẽ "chờ" (queue) cho tới khi refresh xong.
let isRefreshing = false;
let pendingQueue: Array<(ok: boolean) => void> = [];

function subscribePending(cb: (ok: boolean) => void) {
  pendingQueue.push(cb);
}
function flushPending(ok: boolean) {
  pendingQueue.forEach((cb) => cb(ok));
  pendingQueue = [];
}

// ==============================
// INTERCEPTOR RESPONSE
// ==============================
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    // Nếu không có config gốc hoặc không phải 401 → trả lỗi như bình thường
    if (!original || status !== 401) {
      return Promise.reject(error);
    }

    // Đã retry 1 lần mà vẫn 401 → coi như refresh thất bại ⇒ chuyển về login
    if (original._retry) {
      if (typeof window !== "undefined") {
        window.location.href = LOGIN_PATH;
      }
      return Promise.reject(error);
    }

    // Đánh dấu request này sẽ được retry 1 lần sau khi refresh thành công
    original._retry = true;

    // Nếu đang refresh: đợi kết quả rồi retry/redirect theo kết quả
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribePending((ok) => {
          if (!ok) {
            if (typeof window !== "undefined") window.location.href = LOGIN_PATH;
            return reject(error);
          }
          resolve(api(original));
        });
      });
    }

    // Bắt đầu refresh (chỉ 1 luồng)
    isRefreshing = true;
    try {
      await api.post("/auth/refresh"); // server sẽ set lại cookie access/refresh
      isRefreshing = false;
      flushPending(true);              // báo cho các request đang chờ là đã refresh OK
      return api(original);            // retry request gốc
    } catch (e) {
      isRefreshing = false;
      flushPending(false);             // báo cho các request đang chờ là refresh FAIL
      if (typeof window !== "undefined") {
        window.location.href = LOGIN_PATH; // đưa về login
      }
      return Promise.reject(e);
    }
  }
);

export default api;
