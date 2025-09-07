// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { login } from "./actions";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(formData: FormData) {
    setLoading(true);
    setError(null);

    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoginForm loading={loading} error={error} onSubmit={handleLogin} />
    </div>
  );
}
