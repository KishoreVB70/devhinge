import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor");
    const nextCursor = cursor ? parseInt(cursor) : null;
    if (!nextCursor) {
      throw new Error("Missing cursor");
    }

    const data = await getFeedProfiles(nextCursor);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Error fetching feed profiles" },
      { status: 500 }
    );
  }
}
