"use client";
import { useRouter } from "next/navigation";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";
import { useEffect } from "react";
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
      <AuthModals
        openModal="register"
        onCloseModal={() => {}}
        onSwitchToLogin={() => router.push("/")}
      />
    </AuthPageLayout>
  );
}
