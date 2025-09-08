"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { register } from "./actions";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleRegister(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await register(formData);
    if (res?.error) {
      setError(res.error);
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 ">
      <Card className="w-full max-w-sm p-6">
        <CardHeader className="pt-6 pb-4 px-6">
          <Link
            href="/login"
            className="flex w-fit items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4" 
          >
            <ArrowLeft className="h-4 w-4 " />
            Back
          </Link>
          <CardTitle className="text-2xl font-bold">
            Register with email
          </CardTitle>
          <CardDescription className="mt-1">
            Register using your email address.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <form action={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 mt-5 rounded-3xl"
            >
              {loading ? "Creating account..." : "Create my account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
