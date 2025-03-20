import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

// Define protected and admin-only routes
const protectedRoutes = ["/edit", "/profile"];
const adminRoutes = ["/admin/dashboard", "/admin/dashboard/*"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route));

  // Get the session cookie
  const cookie = (await cookies()).get("session")?.value;
  let session;

  try {
    // Decrypt the session
    session = await decrypt(cookie);
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    session = null; // Treat as no session
  }

  // Redirect logged-in users from the sign-in/up routes to their dashboard or profile
  if (session?.id) {
    if (path === "/signin" || path === "/signup") {
      if (session.role === "USER") {
        return NextResponse.redirect(new URL("/profile", req.nextUrl)); // User goes to their profile
      } else if (session.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl)); // Admin goes to dashboard
      }
    }
  }

  // Restrict access to admin routes for non-admin users
  if ((isAdminRoute || isProtectedRoute) && !session?.id) {
    return NextResponse.redirect(new URL("/signin", req.nextUrl)); // Redirect to admin sign-in
  }

  // Restrict access to user routes for non-user (admin) users
  if (isProtectedRoute && session?.role !== "USER") {
    return NextResponse.redirect(new URL("/signin", req.nextUrl)); // Redirect to user sign-in
  }

  // Restrict access to protected routes for unauthenticated users (guests)
  if (!session?.id) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/signin", req.nextUrl)); // Redirect guests to admin sign-in
    } else if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/signin", req.nextUrl)); // Redirect guests to user sign-in
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
