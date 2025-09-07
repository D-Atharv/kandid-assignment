"use server";

import { cookies } from "next/headers";
import { db } from "../../../../db/drizzle_client";
import { session } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function logout() {
  const token = (await cookies()).get("session")?.value;

  if (token) {
    // Delete the session from DB
    await db.delete(session).where(eq(session.token, token));
    // Delete the session cookie
    (await cookies()).delete("session");
  }

  // Optionally return a success object
  return { success: true };
}
