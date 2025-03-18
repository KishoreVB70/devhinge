import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("nextPage")) || 1;
  const isDemo = req.nextUrl.searchParams.get("isDemo") === "true";

  const connections = await getConnectedProfiles(page, isDemo);

  return NextResponse.json(connections);
}
