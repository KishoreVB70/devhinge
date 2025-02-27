"use server";

import { supabase } from "@/lib/config/supabase";
import { CustomSigunpInput } from "@/lib/schema/formSchema";
import { zCustomSigunpInput } from "@/lib/schema/formSchema";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export default async function signupAction(data: CustomSigunpInput) {
  let success = false;
  try {
    const validatedData = zCustomSigunpInput.parse(data);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const userData = { ...validatedData, password: hashedPassword };
    const { error } = await supabase.from("users").insert(userData);
    if (error) {
      throw new Error(error.message);
    }
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
