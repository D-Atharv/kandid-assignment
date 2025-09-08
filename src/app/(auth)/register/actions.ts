// app/(auth)/register/actions.ts
"use server";

import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { db } from "../../../../db/drizzle_client";
import { users } from "../../../../db/schema";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const name = `${firstName} ${lastName}`.trim();

  // 1. Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create user
  const newUserId = randomUUID();
  await db.insert(users).values({
    id: newUserId,
    name,
    email,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    password: hashedPassword,
  });

  // 4. redirect to login page
  redirect("/login");

  return { success: true };
}
