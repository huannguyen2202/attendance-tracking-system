import { connectDB } from "@/server/config/db";
import { User } from "@/server/modules/user/user.model";
import { hash } from "@/server/core/auth";

async function main() {
  await connectDB(); // <-- đảm bảo kết nối trước khi dùng User

  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";
  const hoTen = process.env.ADMIN_NAME || "Administrator";

  const existed = await User.findOne({ email });
  if (existed) {
    console.log("ℹ️  Admin đã tồn tại:", email);
    process.exit(0);
  }

  await User.create({
    email,
    hoTen,
    password: await hash(password),
    role: "admin",
  });

  console.log("✅ Tạo admin thành công:", email, "/", password);
  process.exit(0);
}

main().catch((e) => {
  console.error("❌ Seed admin lỗi:", e);
  process.exit(1);
});
