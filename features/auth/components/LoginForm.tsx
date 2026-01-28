"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/TextField";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await handleLogin(data.email, data.password);
      if (result.success) {
        push("/chat");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch {
      setError("root", { message: "Login failed" });
    }
  };

  return (
    <div className="space-y-8 text-gray-700">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          Sign in to continue to{" "}
          <span className="text-blue-600 font-bold">ChatApp</span>
        </p>
      </div>

      {/* Form */},
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <TextField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            required
            {...register("email")}
          />

          <div className="space-y-1">
            <TextField
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              required
              {...register("password")}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors p-0 h-auto"
              >
                Forgot password?
              </Button>
            </div>
          </div>
        </div>

        {/* Auth Error */}
        {authError && (
          <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center font-medium">
            {authError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-sm font-bold"
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
          onClick={() =>
            onSwitchToRegister ? onSwitchToRegister() : push("/register")
          }
          variant="ghost"
          className="text-blue-600 hover:text-blue-700 font-bold hover:underline p-0 h-auto"
        >
          Create account
        </Button>
      </p>
    </div>
  );
};
