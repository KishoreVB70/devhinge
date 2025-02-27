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
