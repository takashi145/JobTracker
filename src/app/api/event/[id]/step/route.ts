import connectDB from "@/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Step from '@/models/stepModel';
import Event from '@/models/eventModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: {id: string }}
) {
  try {
    await connectDB();
    const eventId = params.id;

    const steps = await Step.find({ eventId: eventId });

    return NextResponse.json({
      message: "successfully",
      success: true,
      data: steps,
    });

  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: {id: string }}
) {
  try {
    await connectDB();

    const req = await request.json();

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

    const promises = req.map((step: any) => {
      const newStep = new Step({
        userId: userId,
        eventId: eventId,
        name: step.name,
        description: step.description,
        status: step.status,
        deadline: step.deadline,
      });

      return newStep.save();
    });

    const steps = await Promise.all(promises);
    const stepIds = steps.map(step => step._id);

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ message: 'Event not found'}, { status: 404 });
    }

    event.steps.push(...stepIds);

    await event.save();
    
    return NextResponse.json({
      message: "successfully",
      success: true,
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}