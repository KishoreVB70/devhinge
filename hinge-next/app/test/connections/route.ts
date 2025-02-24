import { getConnectedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getConnectedProfiles();
    console.log("obtained data: ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to get connections" },
      { status: 400 }
    );
  }
}
