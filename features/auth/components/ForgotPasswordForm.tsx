"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";
import TextField from "@/shared/ui/TextField";
import PasswordField from "@/features/landing/components/PasswordField";
import { toast } from "react-hot-toast";

type EmailFormData = {
  email: string;
};

type ResetFormData = {
  otp: string;
  password: string;
  confirmPassword: string;
};

type Step = "email" | "reset";

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin,
}) => {
  const { handleForgotPassword, handleResetPassword, loading } = useAuth();
  const { push } = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [userEmail, setUserEmail] = useState("");

  // Email form
  const emailForm = useForm<EmailFormData>({
    mode: "onChange",
  });

  // Reset form
  const resetForm = useForm<ResetFormData>({
    mode: "onChange",
  });

  const onEmailSubmit = async (data: EmailFormData) => {
    const result = await handleForgotPassword(data.email);

    if (result.success) {
      setUserEmail(data.email);
      setStep("reset");
      toast.success("OTP sent to your email!");
    } else {
      toast.error(result.message);
    }
  };

  const onResetSubmit = async (data: ResetFormData) => {
    const result = await handleResetPassword(
      userEmail,
      data.otp,
      data.password,
    );

    if (result.success) {
      toast.success("Password reset successful!");
      push("/chat"); // Auto-logged in
    } else {
      toast.error("Reset failed. OTP may be expired.");
    }
  };

  const handleResendOTP = async () => {
    const result = await handleForgotPassword(userEmail);
    if (result.success) {
      toast.success("New OTP sent!");
    } else {
      toast.error("Failed to resend OTP");
    }
  };

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else {
      push("/?modal=login");
    }
  };

  if (step === "reset") {
    return (
      <div className="space-y-8 text-gray-700">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
            Enter OTP & New Password
          </h2>
          <p className="text-sm text-gray-600">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-blue-600">{userEmail}</span>
          </p>
        </div>

        <form
          onSubmit={resetForm.handleSubmit(onResetSubmit)}
          className="space-y-6"
        >
          <div className="space-y-5">
            <div>
              <TextField
                label="OTP Code"
                type="text"
                placeholder="123456"
                maxLength={6}
                error={resetForm.formState.errors.otp?.message}
                required
                {...resetForm.register("otp")}
              />
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendOTP}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto"
                  disabled={loading}
                >
                  Resend OTP
                </Button>
              </div>
            </div>

            <PasswordField
              label="New Password"
              placeholder="••••••••"
              error={resetForm.formState.errors.password?.message}
              required
              {...resetForm.register("password")}
            />

            <PasswordField
              label="Confirm Password"
              placeholder="••••••••"
              error={resetForm.formState.errors.confirmPassword?.message}
              required
              {...resetForm.register("confirmPassword")}
            />

            <div className="px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-gray-600">
              <p className="font-semibold mb-2">Password must include:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>At least 8 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One number (0-9)</li>
                <li>One special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-sm font-bold"
            disabled={loading}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          <Button
            type="button"
            onClick={() => {
              setStep("email");
              resetForm.reset();
            }}
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline p-0 h-auto"
          >
            ← Use different email
          </Button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-gray-700">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Forgot Password?
        </h2>
        <p className="text-base leading-relaxed text-gray-600">
          No worries, we&apos;ll send you an OTP to reset it for{" "}
          <span className="text-blue-600 font-bold">Mitva</span>
        </p>
      </div>

      <form
        onSubmit={emailForm.handleSubmit(onEmailSubmit)}
        className="space-y-6"
      >
        <div className="space-y-5">
          <TextField
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            error={emailForm.formState.errors.email?.message}
            required
            {...emailForm.register("email")}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-sm font-bold"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Button
          type="button"
          onClick={handleBackToLogin}
          variant="ghost"
          className="text-blue-600 hover:text-blue-700 font-bold hover:underline p-0 h-auto"
        >
          Back to Login
        </Button>
      </p>
    </div>
  );
};
