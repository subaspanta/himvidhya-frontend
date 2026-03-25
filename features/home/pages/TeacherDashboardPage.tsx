"use client";

import { useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import DashboardHeader from "@/components/layout/DashboardHeader";
import BatchCard from "@/components/ui/BatchCard";
import { useGetEnrolledClasses } from "@/features/home/hooks/useGetEnrolledClasses";
import EmptyBatches from "@/components/common/EmptyBatches";
import { Spinner } from "@/shared/loading/Spinner";
import BatchFilterMenu from "@/features/batches/components/dashboard/BatchFilterMenu";
import SortMenu from "@/features/batches/components/dashboard/SortMenu";

type EnrolledClass = {
  id?: string;
  name?: string;
  subject?: string;
  code?: string;
  creator?: {
    name?: string;
  };
  attendance?: number;
  createdAt?: string;
  studentCount?: number;
  unreadMessages?: number;
  lastActivity?: string | null;
  status?: string;
};

export default function TeacherDashboardPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "name" | "attendance">(
    "newest",
  );
  const { data: enrolledClasses = [], isLoading } = useGetEnrolledClasses();

  let filteredBatches: EnrolledClass[] = (enrolledClasses || [])
    .filter(Boolean)
    .filter(
      (cls: EnrolledClass) =>
        cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((cls: EnrolledClass): boolean => {
      if (showActive) return cls.status === "active";
      if (showArchived) return cls.status === "archived";
      return true;
    });

  filteredBatches = filteredBatches.sort(
    (a: EnrolledClass, b: EnrolledClass) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      if (sortBy === "attendance") {
        const aAtt = a.attendance ?? 0;
        const bAtt = b.attendance ?? 0;
        return aAtt - bAtt;
      }

      if (a.createdAt && b.createdAt) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      const aId = a.id || "";
      const bId = b.id || "";
      return aId.localeCompare(bId) * -1;
    },
  );

  return (
    <div className="w-full text-foreground pb-8">
      <div className="w-full mx-auto">
        {user && <DashboardHeader profile={user} />}

        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 ">
            <div className="flex items-center justify-start mb-4 sm:mb-0 gap-2 ">
              <h2 className="text-xl font-bold text-foreground">
                Active Batches
              </h2>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border text-sm font-medium text-muted-foreground">
                {filteredBatches.length}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <BatchFilterMenu
                showActive={showActive}
                showArchived={showArchived}
                setShowActive={setShowActive}
                setShowArchived={setShowArchived}
              />
              <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>

          {isLoading ? (
            <Spinner size={24} />
          ) : filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 items-start">
              {filteredBatches.map((batch) => (
                <BatchCard
                  key={batch.id ?? batch.code}
                  batch={{
                    id: batch.id || "",
                    name: batch.name || "",
                    subject: batch.subject || "",
                    code: batch.code || "",
                    studentCount: batch.studentCount ?? 0,
                    lastActivity: "Just now", // TODO: Replace hardcoded value with real activity timestamp
                    unreadMessages: 0, // TODO: Replace hardcoded value with real unread count
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyBatches
              searchQuery={searchQuery}
              onClear={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
