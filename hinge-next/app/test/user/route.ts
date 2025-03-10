import updateUser from "@/lib/actions/updateUserAction";
import { zUser } from "@/lib/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const userData = zUser.parse(data);

    await updateUser(userData);
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update user" },
      { status: 400 }
    );
  }
}
