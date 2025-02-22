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
      .eq("email", validatedData.email);

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error("Invalid email or password");
    }

    console.log("userdata", data);

    const isPasswordCorrect = await bcrypt.compare(
      validatedData.password,
      data[0].password
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    console.log("password correct");

    // Generate jwt
    const payload = { id: data[0].id };
    const secret = new TextEncoder().encode(serverEnv.JWT_SECRET);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("cookie send");
  } catch (error) {
    console.error(error);
  }
}
