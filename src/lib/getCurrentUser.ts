import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle_client";
import { session, users } from "../../db/schema";

/**
 * Retrieves the currently authenticated user's basic information based on the session cookie.
 *
 * This function:
 * - Reads the "session" cookie to obtain the session token.
 * - Queries the database for the session data using the session token.
 * - If a valid session is found, queries the database for the associated user.
 * - Returns an object containing the user's name (or email if name is not available) and email.
 * - Returns `null` if the session token, session data, or user is not found.
 *
 * @returns {Promise<{ name: string; email: string } | null>} 
 * An object with the user's name and email, or `null` if no user is authenticated.
 */
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) return null;

  const sessionData = await db.query.session.findFirst({
    where: eq(session.token, sessionToken),
  });

  if (!sessionData) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, sessionData.userId),
  });

  if (!user) return null;

  return {
    name: user.name || user.email,
    email: user.email,
  };
}
