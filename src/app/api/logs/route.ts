// app/api/logs/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Log from "@/models/Log";
import { logSchema } from "@/validations/logs";

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
    // שליפת JSON מהגוף
    const body = await request.json();

    console.log("** POST /api/logs *body: ", body);
    // הפעלת ולידציה
    const parseResult = logSchema.safeParse(body);
    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((err) => err.message);
      // נחזיר 400 עם רשימת השגיאות
      console.error("errors: ", errors);
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // אם הגענו לכאן, parseResult.data תקף
    const validatedData = parseResult.data;
    // יצירת לוג במסד הנתונים
    const newLog = await Log.create(validatedData);

    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
