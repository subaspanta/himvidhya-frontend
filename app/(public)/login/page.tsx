"use client";

import { useRouter } from "next/navigation";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  return (
    <AuthPageLayout>
      <div className="w-96 p-8 bg-surface border border-border rounded-2xl shadow-2xl">
        <LoginForm
          onSwitchToRegister={() => router.push("/register")}
          onSwitchToForgotPassword={() => router.push("/forgot-password")}
        />
      </div>
    </AuthPageLayout>
  );
}
