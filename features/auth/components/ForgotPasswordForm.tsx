"use client";

import React, { useState } from "react";
import { useForgetPassword } from "@/features/auth/hooks/useForgetPassword";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { useVerifyOTP } from "@/features/auth/hooks/useVerifyOTP";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TextField from "@/components/ui/text-field";
import PasswordField from "@/components/ui/PasswordField";
import { toast } from "react-hot-toast";
import { EmailFormData, ResetFormData, Step } from "../types/form.types";
import type { ForgotPasswordFormProps } from "../types/ui.types";

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  navigation,
}) => {
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

  const forgetPasswordMutation = useForgetPassword();
  const resetPasswordMutation = useResetPassword();
  const verifyOTPMutation = useVerifyOTP();

  const onEmailSubmit = async (data: EmailFormData) => {
    forgetPasswordMutation.mutate(
      { email: data.email },
      {
        onSuccess: () => {
          setUserEmail(data.email);
          setStep("reset");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error.message);
        },
      },
    );
  };

  const onResetSubmit = (data: ResetFormData) => {
    verifyOTPMutation.mutate(
      { email: userEmail, otp: data.otp },
      {
        onSuccess: (verifyData) => {
          if (verifyData.valid) {
            resetPasswordMutation.mutate(
              {
                email: userEmail,
                otp: data.otp,
                password: data.password,
              },
              {
                onSuccess: () => {
                  toast.success("Password reset successful!");
                  push("/home"); // Auto-logged in
                },
                onError: (error) => {
                  toast.error(
                    error?.response?.data?.message ||
                      error.message ||
                      "Reset failed. OTP may be expired.",
                  );
                },
              },
            );
          } else {
            toast.error(verifyData.message || "Invalid OTP. Please try again.");
          }
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              error.message ||
              "OTP verification failed.",
          );
        },
      },
    );
  };

  const handleResendOTP = () => {
    forgetPasswordMutation.mutate(
      { email: userEmail },
      {
        onSuccess: () => {
          toast.success("New OTP sent!");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              error.message ||
              "Failed to resend OTP",
          );
        },
      },
    );
  };

  if (step === "reset") {
    return (
      <div className="space-y-8 text-foreground">
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-accent"
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
          <h2 className="text-2xl font-bold font-heading leading-tight tracking-tight text-foreground">
            Enter OTP & New Password
          </h2>
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-accent">{userEmail}</span>
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
                  className="text-sm text-accent hover:text-accent/80 font-semibold p-0 h-auto"
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

            <div className="px-4 py-3 bg-accent/10 border border-accent/20 rounded-md text-sm text-foreground">
              <p className="font-semibold mb-2">Password must include:</p>
              <ul className="space-y-1 list-disc list-inside text-muted-foreground">
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
            disabled={
              resetPasswordMutation.isPending || verifyOTPMutation.isPending
            }
          >
            {resetPasswordMutation.isPending || verifyOTPMutation.isPending
              ? "Resetting Password..."
              : "Reset Password"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <Button
            type="button"
            onClick={() => {
              setStep("email");
              resetForm.reset();
            }}
            variant="ghost"
            className="text-accent hover:text-accent/80 font-bold hover:underline p-0 h-auto"
          >
            ← Use different email
          </Button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-foreground">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-heading leading-tight tracking-tight text-foreground">
          Forgot Password?
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          No worries, we&apos;ll send you an OTP to reset it for{" "}
          <span className="text-accent font-bold">HimVidhya</span>
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

        <Button type="submit" className="w-full h-11 text-sm font-bold">
          {"Send OTP"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Button
          type="button"
          onClick={navigation.toLogin}
          variant="ghost"
          className="text-accent hover:text-accent/80 font-bold hover:underline p-0 h-auto"
        >
          Back to Login
        </Button>
      </p>
    </div>
  );
};
