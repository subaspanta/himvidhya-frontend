"use client";

import React from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import PasswordField from "@/features/landing/components/PasswordField";
import toast from "react-hot-toast";
import type { RegisterFormData } from "../types/form.types";
import type { RegisterFormProps } from "../types/ui.types";
import { useRegister } from "../hooks/useRegister";

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  navigation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const { mutate, isPending: isLoading, error: authError } = useRegister();

  const onSubmit = async (data: RegisterFormData) => {
    mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Registration successful! Please log in.");
          navigation.toLogin();
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          setError("root", { message: "Registration failed" });
          toast.error(
            error instanceof AxiosError
              ? error.response?.data?.message || error.message
              : "Registration failed. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6 text-foreground">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold font-heading leading-tight tracking-tight text-foreground">
          Create Account
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
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

          <PasswordField
            label="Password"
            placeholder="Create a strong password"
            error={errors.password?.message}
            required
            {...register("password")}
          />
        </div>

        {authError && (
          <div className="p-4 bg-danger/10 border border-danger/20 rounded-md text-sm text-danger text-center font-medium">
            {authError instanceof AxiosError
              ? authError.response?.data?.message || authError.message
              : "An unexpected error occurred"}
          </div>
        )}

        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground border-t border-border pt-6 font-medium">
        Already have an account?{" "}
        <button
          type="button"
          onClick={navigation.toLogin}
          className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );
};
