import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Event from '@/models/eventModel';
import Step from '@/models/stepModel';

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().populate('steps', 'name', Step);
      
    return NextResponse.json({
      message: "successfully",
      success: true,
      data: events
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}