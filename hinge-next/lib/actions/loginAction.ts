"use server";

import { supabase } from "@/lib/config/supabase";
import { generateJwt } from "@/lib/dbhelpers/authHelpers";
import { AuthSchema, zAuthSchema } from "@/lib/schema/authSchema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signInAction(InputData: AuthSchema) {
  let isAuthenticated = false;
  try {
    // 1) Data sanitization
    const validatedData = zAuthSchema.parse(InputData);

    // 2) User exists
    const { data: arrayData, error } = await supabase
      .from("users")
      .select("password, id")
      .eq("email", validatedData.email);

    if (error) {
      throw new Error(error.message);
    }

    if (!arrayData || arrayData.length === 0) {
      throw new Error("Invalid email or password");
    }

    const data = arrayData[0];

    const isPasswordCorrect = await bcrypt.compare(
      validatedData.password,
      data.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    // Generate jwt
    const token = await generateJwt({ id: data.id });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    isAuthenticated = true;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    }
    return "Something went wrong, try again";
  }

  if (isAuthenticated) {
    redirect("/feed");
  }
}
