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
    const { payload } = await jwtVerify(token, secret);
    const response = NextResponse.next();
    response.headers.set("id", payload.id as string);
    const isDemo = req.nextUrl.pathname.includes("/demo");
    response.headers.set("x-isdemo", isDemo.toString());

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}

/*Don't match
/auth
unique-email
unique-username
_next/image
favicon.ico
_next/static
 */

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
