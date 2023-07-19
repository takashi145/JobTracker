import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Event from '@/models/eventModel';
import Step from '@/models/stepModel';

export async function GET(
  request: NextRequest,
  { params }: { params: {id: string }}
) {
  try {
    await connectDB();

    const eventId = params.id;

    const events = await Event.findById(eventId).populate('steps', '_id name deadline status', Step);
      
    return NextResponse.json({
      message: "successfully",
      success: true,
      data: events
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
