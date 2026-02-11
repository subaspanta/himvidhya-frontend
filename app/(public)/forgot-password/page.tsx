"use client";

import { useRouter } from "next/navigation";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <AuthPageLayout>
      <div className="w-96 p-8 bg-surface border border-border rounded-2xl shadow-2xl">
        <ForgotPasswordForm onBackToLogin={() => router.push("/login")} />
      </div>
    </AuthPageLayout>
  );
}
