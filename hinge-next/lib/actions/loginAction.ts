"use server";
"server-only";

import { supabase } from "@/lib/config/supabase";
import { authSchema } from "@/lib/schema/authSchema";
import serverEnv from "@/lib/utils/serverEnv";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export default async function signInAction(formData: FormData) {
  try {
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
      .eq("email", validatedData.email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error("Invalid email or password");
    }

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
  } catch (error) {
    console.error(error);
  }
}

async function generateJwt(payload: { id: string }) {
  const secret = new TextEncoder().encode(serverEnv.JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
  return token;
}
