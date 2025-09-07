// app/(auth)/login/actions.ts
"use server";

import { db } from "../../../../db/drizzle_client";
import { users, session } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Find user
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!existingUser) {
    return { error: "User not found" };
  }

  // 2. Check password
  const match = await bcrypt.compare(password, existingUser.password ?? "");
  if (!match) {
    return { error: "Invalid credentials" };
  }

  // 3. Create session
  const sessionToken = randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.insert(session).values({
    id: randomUUID(),
    token: sessionToken,
    userId: existingUser.id,
    expiresAt,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // 4. Set cookie
  (await cookies()).set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  redirect("/dashboard");
}
