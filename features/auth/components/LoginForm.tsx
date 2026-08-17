"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import PasswordField from "@/components/ui/PasswordField";
import toast from "react-hot-toast";
import type { LoginFormData } from "../types/form.types";
import type { LoginFormProps } from "../types/ui.types";
import { useLogin } from "../hooks/useLogin";

export const LoginForm: React.FC<LoginFormProps> = ({
  navigation,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();
  const { mutate, isPending: isLoading } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (userData) => {
        toast.success("Logged in successfully");
        navigation.close();
        onSuccess?.(userData);
      },
      onError: () => {
        setError("root", { message: "Login failed" });
      },
    });
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
        <TextField
          label="Email"
          {...register("email")}
          error={errors.email?.message}
          required
        />
        <PasswordField
          label="Password"
          {...register("password")}
          error={errors.password?.message}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
        <div className="flex justify-between mt-2">
          <Button type="button" variant="link" onClick={navigation.toRegister}>
            Register
          </Button>
          <Button
            type="button"
            variant="link"
            onClick={navigation.toForgotPassword}
          >
            Forgot Password?
          </Button>
        </div>
      </form>
    </div>
  );
};
