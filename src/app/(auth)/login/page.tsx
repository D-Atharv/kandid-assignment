// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { login } from "./actions";

/**
 * LoginPage component renders the login form and manages its state.
 *
 * @component
 * @returns {JSX.Element} The rendered login page.
 *
 * @remarks
 * - Uses React state to manage loading and error messages.
 * - Handles form submission asynchronously via `handleLogin`.
 * - Displays the `LoginForm` component with loading and error props.
 */
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
