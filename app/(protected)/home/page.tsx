"use client";
import { useAuthStore } from "@/features/auth/store/auth.store";
import TeacherDashboard from "./teacher/page";
import StudentDashboard from "./student/page";
import { PageLoader } from "@/shared/loading/PageLoader";

export default function DashboardPage() {
  const { user, authChecked } = useAuthStore();

  // While auth is resolving, show the PageLoader
  if (!authChecked || !user) return <PageLoader />;

  // Render teacher or student dashboard in-place (URL stays `/home`)
  if (user.role === "teacher") return <TeacherDashboard />;
  return <StudentDashboard />;
}
