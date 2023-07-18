import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Step from '@/models/stepModel';
import Event from '@/models/eventModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function DELETE(
  request: NextRequest,
  { params }: { params: {id: string, step_id: string }}
) {
  try {
    await connectDB();

    const eventId = params.id;
    const stepId = params.step_id;

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

    const event = await Event.findOne({userId: userId, _id: eventId});
    if (!event) {
      return NextResponse.json({ message: 'Event not found'}, { status: 404 });
    }

    const stepIndex = event.steps.indexOf(stepId);
    if (stepIndex === -1) {
      return NextResponse.json({ message: 'Step not found'}, { status: 404 });
    }

    event.steps.splice(stepIndex, 1);
    await event.save();

    await Step.findByIdAndDelete(stepId);
    
    return NextResponse.json({
      message: "successfully",
      success: true
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}