import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPage = path === "/login" || path === "/register";
  const token = request.cookies.get("token")?.value || "";

  const verifiedToken = token &&
        (await verifyJwtToken(token).catch((err) => {
            console.log(err);
        }));

  if (isPublicPage && verifiedToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPage && !verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
  ],
};
