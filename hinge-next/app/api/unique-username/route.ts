import { doesUsernameAlreadyExist } from "@/lib/dbhelpers/authHelpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const name = (await req.json()).username;

  if (!name || typeof name !== "string") {
    return NextResponse.json({
      status: 400,
    });
  }

  const userExists = await doesUsernameAlreadyExist(name);

  if (userExists) {
    return NextResponse.json({
      status: 400,
    });
  }

  return NextResponse.json({
    status: 200,
  });
}
