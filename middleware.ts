import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isPublicRoute: (request: NextRequest) => boolean = createRouteMatcher([
  "/api/:path*",
]);

export default clerkMiddleware(
  (auth: ClerkMiddlewareAuth, request: NextRequest): void => {
    if (!isPublicRoute(request)) {
      auth().protect();
    }
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
