"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/app/components/ui/Button";
import TextField from "../ui/TextField";

// Validation Schema
const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const { handleRegister, loading, error: authError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const success = await handleRegister(
        data.email,
        data.password,
        data.name,
      );
      if (success && onSuccess) {
        onSuccess();
      }
    } catch {
      setError("root", { message: "Registration failed" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900">
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
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            error={errors.email?.message}
            required
            {...register("email")}
          />

          <TextField
            label="Password"
            type="password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>

        {authError && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 text-center animate-pulse">
            {authError}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          variant="gradient"
          isLoading={loading}
        >
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 border-t border-gray-200 pt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:text-blue-600 font-medium transition-colors hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};
