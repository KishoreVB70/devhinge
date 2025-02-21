import signupAction from "@/lib/actions/signupAction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    if (!data.email || !data.password) {
    }
    const formData: FormData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    await signupAction(formData);
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to signup" }, { status: 400 });
  }
}
