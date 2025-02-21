"use server";
"server-only";

import { supabase } from "@/lib/config/supabase";
import { authSchema } from "@/lib/schema/authSchema";
import bcrypt from "bcrypt";

export default async function signupAction(formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
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
