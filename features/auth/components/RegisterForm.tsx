"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/shared/ui/button";
import TextField from "@/shared/ui/TextField";
import PasswordField from "@/features/landing/components/PasswordField";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const router = useRouter();
  const { handleRegister, loading, error: authError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await handleRegister(
        data.email,
        data.password,
        data.name,
        data.username,
      );
      if (result && result.success) {
        if (onSwitchToLogin) {
          onSwitchToLogin();
        } else {
          router.push("/login");
        }
      } else if (onSuccess) {
        onSuccess();
      }
    } catch {
      setError("root", { message: "Registration failed" });
    }
  };

  return (
    <div className="space-y-6 text-gray-700">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Create Account
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          Join our community today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <TextField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
            required
            {...register("name")}
          />

          <TextField
            label="Username"
            type="text"
            placeholder="yourusername"
            error={errors.username?.message}
            required
            {...register("username")}
          />

          <TextField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            required
            {...register("email")}
          />

          <PasswordField
            label="Password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>

        {authError && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 text-center font-medium animate-pulse">
            {authError}
          </div>
        )}

        <Button type="submit" className="w-full font-bold" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 border-t border-gray-100 pt-6 font-medium">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() =>
            onSwitchToLogin ? onSwitchToLogin() : router.push("/login")
          }
          className="text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};
