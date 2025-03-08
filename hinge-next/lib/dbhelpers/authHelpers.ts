import "server-only";
import { supabase } from "@/lib/config/supabase";
import serverEnv from "@/lib/utils/serverEnv";
import { SignJWT } from "jose";

export async function generateJwt(payload: { id: string }) {
  const secret = new TextEncoder().encode(serverEnv.JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1d")
    .sign(secret);
  return token;
}

export async function doesUsernameAlreadyExist(username: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("name", username);

    if (error) {
      throw new Error(error.message);
    }

    return data.length > 0;
  } catch (error) {
    console.error(error);
    return true;
  }
}
