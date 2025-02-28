import loginAction from "@/lib/actions/loginAction";
import { zAuthSchema } from "@/lib/schema/authSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const validatedData = zAuthSchema.parse(data);
  await loginAction(validatedData);
  return NextResponse.json({ message: "User logged in" });
}
