import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function GET() {
  try {
    await mongoose.connect(MONGODB_URI);
    return Response.json({ success: true, message: "✅ Kết nối MongoDB thành công" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json({
      success: false,
      message: "❌ Kết nối MongoDB thất bại",
      error: error.message,
    });
  }
}