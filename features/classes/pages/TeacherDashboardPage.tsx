"use client";

import { useState } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import DashboardHeader from "@/components/layout/DashboardHeader";
import BatchCard from "@/features/classes/components/BatchCard";
import { useGetEnrolledClasses } from "@/features/classes/hooks/useGetEnrolledClasses";
import EmptyBatches from "@/components/common/EmptyBatches";
import { ClassSearchInput } from "@/components/common/ClassSearchInput";
import { ClassCardSkeletonGrid } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import BatchFilterMenu from "@/features/classes/components/BatchFilterMenu";
import SortMenu from "@/features/classes/components/SortMenu";
import RightAside from "@/components/layout/RightAside";
import type { ClassCard } from "@/features/classes/types";

export default function TeacherDashboardPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "name">("newest");
  const {
    data: enrolledClasses = [],
    isLoading,
    isError,
    refetch,
  } = useGetEnrolledClasses();

  let filteredBatches: ClassCard[] = (enrolledClasses || [])
    .filter(Boolean)
    .filter(
      (cls: ClassCard) =>
        cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((cls: ClassCard): boolean => {
      if (showActive) return cls.status === "active";
      if (showArchived) return cls.status === "archived";
      return true;
    });

  filteredBatches = filteredBatches.sort((a: ClassCard, b: ClassCard) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full text-foreground pb-8">
      <div className="w-full lg:flex-1 min-w-0 lg:pr-6 border-r-0 lg:border-r border-border">
        {user && (
          <DashboardHeader
            profile={user}
            activeClassCount={
              enrolledClasses.filter((cls) => cls.status === "active").length
            }
          />
        )}

        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 ">
            <div className="flex items-center justify-start mb-4 sm:mb-0 gap-2 ">
              <h2 className="text-xl font-bold text-foreground">
                Active Classes
              </h2>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-border text-sm font-medium text-muted-foreground">
                {filteredBatches.length}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <ClassSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                className="w-full sm:w-56"
              />
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
            <ClassCardSkeletonGrid />
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border text-center gap-4">
              <p className="text-sm text-muted-foreground">
                Unable to load your classes.
              </p>
              <Button variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          ) : filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 items-start">
              {filteredBatches.map((batch) => (
                <BatchCard
                  key={batch.id}
                  batch={{
                    id: batch.id,
                    name: batch.name,
                    subject: batch.subject,
                    code: batch.code,
                    studentCount: batch.studentCount,
                    lastActivity: batch.lastActivity,
                    status: batch.status,
                    createdAt: batch.createdAt,
                    owner: batch.owner,
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyBatches
              searchQuery={searchQuery}
              onClear={() => setSearchQuery("")}
              emptyTitle="No classes yet"
              emptyDescription="You haven't created a class yet. Create one to get started."
            />
          )}
        </div>
      </div>
      <RightAside />
    </div>
  );
}
