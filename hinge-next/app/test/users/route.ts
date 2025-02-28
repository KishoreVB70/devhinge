import signupAction from "@/lib/actions/signupAction";
import { zSignup } from "@/lib/schema/formSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = zSignup.parse(data);
    await signupAction(validatedData);
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to signup" }, { status: 400 });
  }
}
