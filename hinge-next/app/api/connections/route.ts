import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = (await req.json()).id;
  if (!id) {
    return new Response("Missing id", { status: 400 });
  }

  const page = Number((await req.json()).page) | 1;

  const connections = await getConnectedProfiles(page);

  return NextResponse.json(connections);
}
