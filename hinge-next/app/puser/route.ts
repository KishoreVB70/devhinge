import updateUser from "@/lib/actions/updateUserAction";
import { zUser } from "@/lib/schema/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const userData = zUser.parse(data);
    console.log(userData);
    const formData: FormData = new FormData();
    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key as keyof typeof userData] as string);
      }
    }

    await updateUser(formData);
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update user" },
      { status: 400 }
    );
  }
}
