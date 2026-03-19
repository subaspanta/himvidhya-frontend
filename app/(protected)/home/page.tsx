"use client";
import { useAuthStore } from "@/features/auth/store/auth.store";
import TeacherDashboard from "./teacher/page";
import StudentDashboard from "./student/page";
import { PageLoader } from "@/shared/loading/PageLoader";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, authChecked } = useAuthStore();

  useEffect(() => {
    if (authChecked && !user) {
      window.location.replace("/login");
    }
  }, [authChecked, user]);

  // Demo loader commented out for now
  // Demo: show page loader for 5s after auth resolves so you can preview it.
  //   useEffect(() => {
  //     if (!user) return;
  //     setDemoLoading(true);
  //     const t = setTimeout(() => setDemoLoading(false), 5000);
  //     return () => clearTimeout(t);
  //   }, [user]);

  // While auth is resolving, show the PageLoader
  if (!user) return <PageLoader />;

  // Render teacher or student dashboard in-place (URL stays `/home`)
  if (user.role === "teacher") return <TeacherDashboard />;
  return <StudentDashboard />;
}
