import { NextRequest, NextResponse } from "next/server";
import serverEnv from "@/lib/utils/serverEnv";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }
    const JWT_SECRET = serverEnv.JWT_SECRET;
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: "/feed",
};
