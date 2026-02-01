"use client";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function Home() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/app");
    }
  }, [isAuthenticated, router]);
  return (
    <AuthPageLayout>
      <AuthModals
        openModal="login"
        onCloseModal={() => {}}
        onSwitchToRegister={() => router.push("/register")}
        onSwitchToLogin={() => {}}
      />
    </AuthPageLayout>
  );
}
