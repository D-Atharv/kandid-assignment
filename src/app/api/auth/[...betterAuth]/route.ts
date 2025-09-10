//app/api/auth/[...betterAuth]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Exports the GET and POST handlers for Next.js API routes by converting the provided authentication handler
 * using the `toNextJsHandler` utility. These handlers are used to process incoming GET and POST requests
 * for the authentication endpoint.
 *
 * @see toNextJsHandler
 * @see auth.handler
 */
export const { GET, POST } = toNextJsHandler(auth.handler);
