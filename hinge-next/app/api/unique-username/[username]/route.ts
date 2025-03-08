import { doesUsernameAlreadyExist } from "@/lib/dbhelpers/authHelpers";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { email: string } }) {
  const { email } = params;
  const userExists = await doesUsernameAlreadyExist(email);

  if (userExists) {
    return NextResponse.json({
      status: 400,
    });
  }

  return NextResponse.json({
    status: 400,
  });
}
