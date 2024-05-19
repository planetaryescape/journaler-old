import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/account(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);
const isPublicApiRoute = createRouteMatcher([
  "/api/prompts",
  "/api/webhooks/auth",
  "/api/webhooks/stripe",
  "/api/webhooks/emails",
  "/api/stripe/create-customer",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  if (isApiRoute(req)) {
    if (!isPublicApiRoute(req)) {
      auth().protect();
    }
  }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
