import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor") || "1";
  const profiles = await getInterestedProfiles(cursor);
  NextResponse.json(profiles);
}
