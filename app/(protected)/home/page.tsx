"use client";
import { PageLoader } from "@/shared/loading/PageLoader";

export default function DashboardPage() {
  // Role-based redirects for `/home` are handled centrally in AuthGate.
  return <PageLoader />;
}
