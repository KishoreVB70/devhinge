import loginAction from "@/lib/actions/loginAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data.password || !data.email) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  await loginAction(formData);
  return NextResponse.json({ message: "User logged in" });
}
