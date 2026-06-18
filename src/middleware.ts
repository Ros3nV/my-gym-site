import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on all paths except api, Next internals, and files with an extension
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
