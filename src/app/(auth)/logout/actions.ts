"use server";

import { cookies } from "next/headers";
import { db } from "../../../../db/drizzle_client";
import { session } from "../../../../db/schema";
import { eq } from "drizzle-orm";

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
