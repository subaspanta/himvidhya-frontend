"use client";
import { AxiosError } from "axios";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/text-field";
import PasswordField from "@/features/landing/components/PasswordField";
import { useLogin } from "../hooks/useLogin";
import { LoginFormData, LoginFormProps } from "../types/auth.types";
import toast from "react-hot-toast";

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) => {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const { mutate, isPending: isLoading, error: authError } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          push("/home");
          if (onSuccess) onSuccess();
          toast.success("Logged in successfully");
        },
        onError: () => {
          setError("root", { message: "Login failed" });
        },
      },
    );
  };

  return (
    <div className="space-y-8 text-foreground">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-heading leading-tight tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Sign in to continue to{" "}
          <span className="text-primary font-bold">HimVidhya</span>
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
                className="text-sm text-primary hover:text-primary/80 font-bold transition-colors p-0 h-auto"
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
          <div className="px-4 py-3 bg-danger/10 border border-danger/20 rounded-md text-sm text-danger text-center font-medium">
            {authError instanceof AxiosError
              ? authError.response?.data?.message || authError.message
              : "An unexpected error occurred"}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-sm font-bold"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Button
          type="button"
          onClick={() =>
            onSwitchToRegister ? onSwitchToRegister() : push("/register")
          }
          variant="ghost"
          className="text-primary hover:text-primary/80 font-bold hover:underline p-0 h-auto"
        >
          Create account
        </Button>
      </p>
    </div>
  );
};
