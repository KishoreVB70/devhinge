"use server";
"server-only";

import { supabase } from "@/lib/config/supabase";
import { authSchema } from "@/lib/schema/authSchema";
import { serverEnv } from "@/lib/utils/serverEnv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function loginAction(formData: FormData) {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  // 1) Data sanitization
  const validatedData = authSchema.parse(rawFormData);

  // 2) User exists
  const { data, error } = await supabase
    .from("users")
    .select("password, id")
    .eq("email", validatedData.email);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    validatedData.password,
    data[0].password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Generate jwt
  const token = jwt.sign({ id: data[0].id }, serverEnv.JWT_SECRET, {
    expiresIn: "1d",
  });

  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return true;
}
