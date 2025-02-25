"use server";

import { supabase } from "@/lib/config/supabase";
import { authSchema } from "@/lib/schema/authSchema";
import bcrypt from "bcrypt";

// TODO: Error handling
export default async function signupAction(formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // TODO: Ensure users enter valid password in form
    const validatedUserData = authSchema.parse(rawFormData);

    const hashedPassword = await bcrypt.hash(validatedUserData.password, 10);

    const userData = {
      email: validatedUserData.email,
      password: hashedPassword,
    };

    const { error } = await supabase.from("users").insert(userData);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function customSignupAction(
  previousState: string,
  formData: FormData
) {
  console.log(previousState, formData);
  console.log("Hiyaboosahhh");
  return "Some type a error";
}
