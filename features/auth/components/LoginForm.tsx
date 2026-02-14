"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/features/landing/components/PasswordField";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const { handleLogin, loading, error: authError } = useAuth();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await handleLogin(data.email, data.password);
      if (result.success) {
        push("/dashboard");
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
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Welcome back
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          Sign in to continue to{" "}
          <span className="text-blue-600 font-bold">Mitva</span>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <TextField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            required
            {...register("email")}
          />

          <div className="space-y-1">
            <PasswordField
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              required
              {...register("password")}
            />
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors p-0 h-auto"
                onClick={() =>
                  onSwitchToForgotPassword ? onSwitchToForgotPassword() : null
                }
              >
                Forgot password?
              </Button>
            </div>
          </div>
        </div>

        {authError && (
          <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600 text-center font-medium">
            {authError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-sm font-bold"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
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
