"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function RegisterPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/chat");
    }
  }, [isAuthenticated, router]);

  return (
    <AuthPageLayout>
      <div className="w-96 p-8 bg-surface border border-border rounded-2xl shadow-2xl">
        <RegisterForm onSwitchToLogin={() => router.push("/login")} />
      </div>
    </AuthPageLayout>
  );
}
