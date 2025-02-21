import signupAction from "@/lib/actions/signupAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  if (!data.email || !data.password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }
  const formData: FormData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);

  await signupAction(formData);
  return NextResponse.json({ message: "User created" });
}
