import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page")) | 1;
  const connections = await getConnectedProfiles(page);

  return NextResponse.json(connections);
}
