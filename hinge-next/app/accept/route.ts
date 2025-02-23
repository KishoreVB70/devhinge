import { modifyConnectionAction } from "@/lib/actions/connectionAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const targetId = (await req.json()).targetId;
    if (!targetId) {
      throw new Error("Target not found");
    }
    await modifyConnectionAction(targetId, "accepted");
    return NextResponse.json({ message: "Accepted" });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Unable to like" }, { status: 400 });
  }
}
