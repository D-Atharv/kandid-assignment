import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/register"];

/**
 * Middleware function to handle authentication for incoming requests.
 *
 * - Allows access to public routes defined in `publicRoutes`.
 * - Checks for authentication tokens in cookies: "session" or "better-auth.session_token".
 * - Redirects unauthenticated users to the "/login" page.
 * - Allows authenticated users to proceed.
 *
 * @param req - The incoming Next.js request object.
 * @returns A NextResponse object that either continues the request or redirects to login.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // check cookie
  const token =
    req.cookies.get("session")?.value ||
    req.cookies.get("better-auth.session_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ at this point, user has a cookie
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
