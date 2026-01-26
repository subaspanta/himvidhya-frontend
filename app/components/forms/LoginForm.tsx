"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import TextField from "../ui/TextFeild";

// Validation Schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
}) => {
  const { handleLogin, loading, error: authError } = useAuth();
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    formState: { errors },
    trigger,
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate manually
    const isValid = await trigger();
    if (!isValid) return;

    try {
      const success = await handleLogin(email, password);

      if (success) {
        push("/chat");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      setError("root", { message: "Login failed" });
    }
  };

  return (
    <div className="space-y-8 text-gray-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          Sign in to continue to{" "}
          <span className="text-blue-500 font-medium">ChatApp</span>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmitForm} className="space-y-6">
        <div className="space-y-5">
          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email?.message}
            required
          />

          <div className="space-y-1">
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password?.message}
              required
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors p-0 h-auto"
              >
                Forgot password?
              </Button>
            </div>
          </div>
        </div>

        {/* Auth Error */}
        {authError && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 text-center">
            {authError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-sm font-medium"
          variant="gradient"
          isLoading={loading}
        >
          Sign In
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Button
          type="button"
          onClick={onSwitchToRegister}
          variant="ghost"
          className="text-blue-500 hover:text-blue-600 font-medium hover:underline p-0 h-auto"
        >
          Create account
        </Button>
      </p>
    </div>
  );
};
