import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Log from "@/models/Log";

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing log ID" },
        { status: 400 }
      );
    }
    const deleted = await Log.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json(
        { success: false, message: "Log not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, log: deleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
