import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Check if Clerk is down (for development)
const isClerkDown = process.env.NEXT_PUBLIC_CLERK_DOWN === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';

// If Clerk is down in development, bypass authentication
if (isDevelopment && isClerkDown) {
  export default function middleware() {
    return NextResponse.next();
  }
  
  export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      '/(api|trpc)(.*)',
    ],
  };
} else {
  // Normal Clerk authentication middleware
  export default authMiddleware({
    // Only the home page is public - all other routes require authentication
    publicRoutes: ["/"],
    
    afterAuth(auth, req) {
      // Allow authenticated users to access all protected routes
      if (auth.userId) {
        return; // User is authenticated, allow access
      }
      
      // For unauthenticated users trying to access protected routes
      // Redirect them to the home page instead of showing sign-in modal
      if (!auth.userId && req.nextUrl.pathname !== "/") {
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
      }
      
      return;
    },
  });

  export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  };
} 