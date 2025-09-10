// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db as drizzleDb } from "../../db/drizzle_client";
import * as schema from "../../db/schema";
import { nextCookies } from "better-auth/next-js";
import { oneTap } from "better-auth/plugins";

/**
 * Initializes authentication using the betterAuth library with the following configuration:
 * - Uses a Drizzle ORM adapter for PostgreSQL with the provided schema.
 * - Enables email and password authentication, with optional password policy and validators.
 * - Configures Google OAuth as a social provider, requiring client ID and secret from environment variables.
 * - Sets session expiration to 7 days and refresh age to 1 day.
 * - Applies plugins for Next.js cookies and Google One Tap authentication.
 *
 * @remarks
 * Customize session and provider settings as needed for your application.
 *
 * @see {@link https://github.com/your-auth-library/betterAuth} for more details on configuration options.
 */
export const auth = betterAuth({
  database: drizzleAdapter(drizzleDb, {
    provider: "pg",
    schema,
  }),

  emailAndPassword: {
    enabled: true,
    // optional: password policy, validators
  },

  // OAuth providers:
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // optionally specify scopes, callback URL etc.
    },
  },

  // session config (defaults are ok; customize if needed)
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh after 1 day use
  },

  plugins: [nextCookies(), oneTap()],
});
