"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.role === "teacher") {
      router.replace("/dashboard/teacher");
    } else if (user?.role === "student") {
      router.replace("/dashboard/student");
    }
  }, [user, router]);

  return null;
}
