// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db as drizzleDb } from "../../db/drizzle_client"; 
import * as schema from "../../db/schema"; 
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(drizzleDb, {
    provider: "pg",
    schema,
  }),

  user: {
    fields: {
      createdAt: "",
      updatedAt: "",
    },
  },

  emailAndPassword: {
    enabled: true,
    // optional: password policy, validators
  },

  // OAuth providers:
  oauth: {
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

  plugins: [nextCookies()],
});
