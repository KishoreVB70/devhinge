import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getFeedProfiles(true);
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
