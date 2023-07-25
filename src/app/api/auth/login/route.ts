import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const req = await request.json();

    const user = await User.findOne({ email: req.email });
    if (!user) {
      throw new Error("メールアドレス又はパスワードが間違っています");
    }

    if(!await bcrypt.compare(req.password, user.password)) {
      throw new Error("メールアドレス又はパスワードが間違っています");
    }

    const dataToEncrypt = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(dataToEncrypt, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    
    const response = NextResponse.json({
      message: "successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: "strict"
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}