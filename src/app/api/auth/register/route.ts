import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const req = await request.json();

    const user = await User.findOne({ email: req.email });
    if (user) {
      throw new Error("入力したメールアドレスは既に存在します。");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.password, salt);
    req.password = hashedPassword;

    const newUser = new User(req);
    await newUser.save();
    
    return NextResponse.json({
      message: "successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}