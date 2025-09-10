import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle_client";
import { session, users } from "../../db/schema";

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
