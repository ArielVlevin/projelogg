// app/api/logs/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Log from "@/models/Log";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deleted = await Log.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Log not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, log: deleted }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
