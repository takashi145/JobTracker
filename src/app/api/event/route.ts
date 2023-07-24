import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Event from '@/models/eventModel';
import Step from '@/models/stepModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

connectDB();

export async function GET() {
  try {
    const events = await Event.find().populate('steps', 'name status', Step);
      
    return NextResponse.json({
      message: "successfully",
      success: true,
      data: events
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const req = await request.json();

    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json({ message: 'No token provided'}, { status: 401 });
    }

    let userId: string | undefined;
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      userId = userData._id;
    } catch(e: any) {
      return NextResponse.json({ message: 'Failed to authenticate token' }, { status: 401 });
    }

    const newEvent = new Event({
      userId: userId,
      title: req.title,
      description: req.description,
      steps: []
    });

    await newEvent.save();
    
    return NextResponse.json({
      message: "successfully",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}