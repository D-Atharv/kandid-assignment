"use server";

import { cookies } from "next/headers";
import { db } from "../../../../db/drizzle_client";
import { session } from "../../../../db/schema";
import { eq } from "drizzle-orm";

/**
 * Logs out the current user by clearing authentication tokens from cookies and deleting the manual session from the database.
 *
 * - Removes the "session" cookie and deletes the corresponding session from the database if present.
 * - Removes the "better-auth.session_token" cookie if present; Better Auth manages its own session in the database.
 *
 * @returns An object indicating the logout was successful.
 */
export async function logout() {
  const cookieStore = await cookies();

  // Manual session
  const manualToken = cookieStore.get("session")?.value;
  if (manualToken) {
    await db.delete(session).where(eq(session.token, manualToken));
    cookieStore.delete("session");
  }

  // Better Auth session
  const betterAuthToken = cookieStore.get("better-auth.session_token")?.value;
  if (betterAuthToken) {
    // Better Auth manages DB itself, just clear cookie
    cookieStore.delete("better-auth.session_token");
  }

  return { success: true };
}
