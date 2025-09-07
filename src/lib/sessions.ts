import { auth } from "@/lib/auth";

export async function getCurrentUser(headers: Headers) {
  const session = await auth.api.getSession({ headers });
  return session?.user ?? null;
}
