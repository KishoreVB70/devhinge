import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("nextPage")) || 1;

  console.log("page: ", page);
  const connections = await getConnectedProfiles(page);

  return NextResponse.json(connections);
}
