import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/edit", "/profile", "complete-profile"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // console.error("This is path: ", path);
  // console.error("Is Protected path: ", isProtectedRoute);
  // console.error("Is Public path: ", isPublicRoute);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (session?.userId) {
    if (path == "/login" || path == "/login") {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}
