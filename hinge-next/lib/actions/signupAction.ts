"use server";

import { supabase } from "@/lib/config/supabase";
import { generateJwt } from "@/lib/dbhelpers/authHelpers";
import { SignUpInput } from "@/lib/schema/formSchema";
import { zSignup } from "@/lib/schema/formSchema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function doesUserExist(email: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) return true;

    return false;
  } catch (error) {
    console.error(error);
    return true;
  }
}

export default async function signupAction(inputData: SignUpInput) {
  let success = false;
  try {
    const validatedData = zSignup.parse(inputData);
    const userExists = await doesUserExist(validatedData.email);
    if (userExists) {
      throw new Error("User already exists");
    }
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
