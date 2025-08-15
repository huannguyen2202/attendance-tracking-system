import { NextResponse } from "next/server";
import { connectDB } from "@/server/config/db";
import mongoose from "mongoose";
import { User } from "@/server/modules/user/user.model";

export async function GET() {
  await connectDB();
  const admins = await User.find({ role: "admin" }).select("email role").lean();
  return NextResponse.json({
    db: mongoose.connection?.name,
    admins,
    count: admins.length,
  });
}