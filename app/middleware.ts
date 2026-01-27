import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasAuthCookie = request.cookies.get("token")?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/protected");

  if (isProtectedRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
