import { doesUserExist } from "@/lib/actions/signupAction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = (await req.json()).email;
  console.log("email is: ", email);
  if (!email || typeof email !== "string") {
    return NextResponse.json({
      status: 400,
    });
  }
  const userExists = await doesUserExist(email);

  if (userExists) {
    return NextResponse.json({
      status: 400,
    });
  }

  return NextResponse.json({
    status: 200,
  });
}
