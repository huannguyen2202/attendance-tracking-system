// src/server/core/errors.ts
export class AppError extends Error {
  code: string;
  status: number;

  constructor(code = "APP_ERROR", message?: string, status = 400) {
    super(message || code);
    this.code = code;
    this.status = status;
  }
}

// Một vài helper lỗi thường dùng
export const Errors = {
  UNAUTHORIZED: new AppError("UNAUTHORIZED", "Unauthorized", 401),
  FORBIDDEN: new AppError("FORBIDDEN", "Forbidden", 403),
  NOT_FOUND: new AppError("NOT_FOUND", "Not found", 404),
};
