// src/server/modules/user/user.model.ts
import { Schema, models, model, type Types } from "mongoose";

/**
 * User model
 * - role: "admin" | "staff"
 * - status:
 *    + pending   : mới đăng ký, chờ admin duyệt
 *    + approved  : đã duyệt, được phép đăng nhập
 *    + rejected  : bị từ chối
 *    + suspended : tạm khóa
 * - tokenVersion: dùng để revoke toàn bộ phiên khi đổi role/status (tuỳ chọn nâng cao)
 */
const userSchema = new Schema(
  {
    email: { type: String, unique: true, index: true, required: true },
    hoTen: { type: String, required: true },
    password: { type: String, select: false, required: true },

    role: { type: String, enum: ["admin", "staff"], default: "staff", index: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "suspended"],
      default: "pending",
      index: true,
    },
    approvedAt: { type: Date },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    rejectionReason: { type: String },

    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);

// (tuỳ chọn) export type để gõ kiểu ở nơi khác
export type IUser = {
  _id: Types.ObjectId;
  email: string;
  hoTen: string;
  role: "admin" | "staff";
  status: "pending" | "approved" | "rejected" | "suspended";
  tokenVersion: number;
};
