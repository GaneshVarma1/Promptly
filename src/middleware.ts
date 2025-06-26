import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
  
  afterAuth(auth, req) {
    if (auth.userId) {
      return;
    }
    
    if (!auth.userId && req.nextUrl.pathname !== "/") {
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
    
    return;
  },
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}; 