// app/api/logs/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Log from "@/models/Log";

export async function GET() {
  try {
    await dbConnect();
    const logs = await Log.find()
      .sort({ createdAt: -1 })
      .populate("project_id");

    return NextResponse.json({ success: true, logs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const newLog = await Log.create(body);

    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
