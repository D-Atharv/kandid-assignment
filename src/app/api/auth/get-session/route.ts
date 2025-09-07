// app/api/auth/get-session/route.ts

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "../../../../../db/drizzle_client";
import { session } from "../../../../../db/schema";

export async function GET() {
  const token = (await cookies()).get("session")?.value;
  if (!token)
    return new Response(JSON.stringify({ session: null }), { status: 200 });

  const existingSession = await db.query.session.findFirst({
    where: eq(session.token, token),
    with: { user: true },
  });

  if (!existingSession) {
    return new Response(JSON.stringify({ session: null }), { status: 200 });
  }

  return new Response(
    JSON.stringify({
      session: {
        id: existingSession.id,
        userId: existingSession.userId,
        user: existingSession.user,
      },
    }),
    { status: 200 }
  );
}
