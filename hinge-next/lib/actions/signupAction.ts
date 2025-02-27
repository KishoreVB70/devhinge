"use server";

import { supabase } from "@/lib/config/supabase";
import { generateJwt } from "@/lib/dbhelpers/authHelpers";
import { CustomSigunpInput } from "@/lib/schema/formSchema";
import { zCustomSigunpInput } from "@/lib/schema/formSchema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signupAction(inputData: CustomSigunpInput) {
  let success = false;
  try {
    const validatedData = zCustomSigunpInput.parse(inputData);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const userData = { ...validatedData, password: hashedPassword };
    const { error } = await supabase.from("users").insert(userData);
    if (error) {
      throw new Error(error.message);
    }

    // Access the id of the user
    const { data, error: queryError } = await supabase
      .from("users")
      .select("id")
      .eq("email", validatedData.email);

    if (queryError) {
      throw new Error(queryError.message);
    }

    // Generate jwt
    const token = await generateJwt({ id: data[0].id });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    success = true;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return error.message;
    }
    return "Unable to signup";
  }

  if (success) {
    redirect("/feed");
  }
}
