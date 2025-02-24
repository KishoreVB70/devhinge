import { getInterestedProfiles } from "@/lib/dbhelpers/dbhelpers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const likes = await getInterestedProfiles();
    if (!likes) {
      return NextResponse.json({ message: "No likes found" });
    }
    return NextResponse.json(likes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to get requests" },
      { status: 400 }
    );
  }
}
