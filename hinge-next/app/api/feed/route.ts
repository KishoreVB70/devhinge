import { getFeedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getFeedProfiles(true);
    NextResponse.json(data);
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { error: "Error fetching feed profiles" },
      { status: 500 }
    );
  }
}
