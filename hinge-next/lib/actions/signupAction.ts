"use server";
"server only";

import { supabase } from "@/lib/config/supabase";
import { authSchema } from "@/lib/schema/zodSchema";

export default async function signupAction(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  // 1) Data sanitization
  const validatedData = authSchema.parse(rawFormData);

  // 2) Add to supabase
  const { data, error } = await supabase.auth.signUp(validatedData);
  console.log(data, error);
}
