"use client";
import { useRouter } from "next/navigation";
import { AuthModals } from "@/features/auth/components/AuthModals";
import { AuthPageLayout } from "@/components/layout/AuthPageLayout";

export default function LoginPage() {
  const router = useRouter();
  return (
    <AuthPageLayout>
      <AuthModals
        openModal="login"
        onCloseModal={() => router.push("/")}
        onSwitchToRegister={() => router.push("/register")}
      />
    </AuthPageLayout>
  );
}
