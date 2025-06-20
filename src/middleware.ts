import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // Allow authenticated users to access all protected routes
    if (auth.userId) {
      return; // User is authenticated, allow access
    }
    
    // For unauthenticated users, let Clerk handle authentication
    // Don't redirect, just let Clerk show the sign-in modal
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