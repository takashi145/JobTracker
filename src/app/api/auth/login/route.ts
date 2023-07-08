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
      throw new Error("email already exists");
    }

    if(!await bcrypt.compare(req.password, user.password)) {
      throw new Error("Invalid Credentials");
    }

    const dataToEncrypt = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(dataToEncrypt, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    const response = NextResponse.json({
      message: "successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}