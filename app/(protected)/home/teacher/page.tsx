"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import DashboardHeader from "@/components/DashboardHeader";
import { TeacherStats } from "@/types/dashboard";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BatchCard from "@/components/ui/BatchCard";
import { Batch } from "@/types/dashboard";
import { useGetEnrolledClasses } from "@/features/home/hooks/useGetEnrolledClasses";
import EmptyBatches from "@/components/EmptyBatches";
import { Spinner } from "@/shared/loading/Spinner";
import BatchFilterMenu from "@/components/BatchFilterMenu";

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: enrolledClasses = [], isLoading } = useGetEnrolledClasses();

  interface EnrolledClass {
    _id?: string;
    name?: string;
    subject?: string;
    code?: string;
    creator?: {
      name?: string;
    };
  }

  const filteredBatches: EnrolledClass[] = (enrolledClasses || [])
    .filter(Boolean)
    .filter(
      (cls: EnrolledClass) =>
        cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  return (
    <div className="w-full text-foreground pb-8">
      <div className="w-full mx-auto">
        {user && <DashboardHeader profile={user} stats={stats} />}

        {/* Batch Content Grid */}
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
              <BatchFilterMenu />
            </div>
          </div>

          {isLoading ? (
            <Spinner size={24} />
          ) : filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6">
              {filteredBatches.map((batch) => (
                <BatchCard
                  key={batch._id ?? batch.code}
                  batch={
                    {
                      id: batch._id,
                      name: batch.name,
                      subject: batch.subject,
                      code: batch.code || "",
                      studentCount: 0,
                      lastActivity: "Just now",
                      unreadMessages: 0,
                    } as Batch
                  }
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
export const stats: TeacherStats = {
  totalStudents: 142,
  activeBatches: 8,
  averageAttendance: 84,
  assignmentsPending: 12,
  joinRequests: 3,
};
