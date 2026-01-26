"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "@/app/hooks/useAuth";
import { Button } from "@/app/components/ui/Button";
import TextField from "../ui/TextFeild";

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    formState: { errors },
    trigger,
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await trigger();
    if (!isValid) return;

    try {
      const success = await handleRegister(email, password, name);
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
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

      <form onSubmit={handleSubmitForm} className="space-y-6">
        <div className="space-y-4">
          <TextField
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name?.message}
            required
          />

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

          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password?.message}
            required
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
