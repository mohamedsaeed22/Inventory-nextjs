import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (!token && !isLoginPage) {
    // Redirect to login if trying to access protected route without token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isLoginPage) {
    // Redirect to dashboard if trying to access login page with token
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
