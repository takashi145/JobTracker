import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Event from '@/models/eventModel';
import Step from '@/models/stepModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: {id: string }}
) {
  try {
    await connectDB();

    const eventId = params.id;

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

    const events = await Event.findOne({_id: eventId, userId: userId}).populate('steps', '_id name description deadline status', Step);
    if (!events) {
      return NextResponse.json({ message: 'event not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: "successfully",
      success: true,
      data: events
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
