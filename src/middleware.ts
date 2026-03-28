import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isOnboarded = (req.auth?.user as { onboarded?: boolean })?.onboarded ?? false;

  const isOnboardingPage = nextUrl.pathname.startsWith("/onboarding");
  const isApiRoute       = nextUrl.pathname.startsWith("/api");
  const isAuthRoute      = nextUrl.pathname.startsWith("/login");

  // Already on onboarding or API/auth — let through
  if (isOnboardingPage || isApiRoute || isAuthRoute) {
    return NextResponse.next();
  }

  // Logged-in but not yet onboarded → send to /onboarding
  if (isLoggedIn && !isOnboarded) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image).*)",
  ],
};
