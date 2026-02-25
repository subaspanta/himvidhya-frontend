"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Plus, Grid, List, Filter, BookOpen } from "lucide-react";
import { ClassCard } from "@/features/class/types";
import { JoinClassForm } from "@/features/class/components/dashboard/JoinClassForm";
import useJoinClass from "@/features/home/hooks/useJoinClass";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ClassGrid } from "@/features/class/components/dashboard/ClassGrid";
import { ClassList } from "@/features/class/components/dashboard/ClassList";
import DashboardHeader from "@/components/DashboardHeader";
import { Input } from "@/components/ui/input";
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
import { stats } from "../teacher/page";
import { useGetEnrolledClasses } from "@/features/home/hooks/useGetEnrolledClasses";
import BatchFilterMenu from "@/components/BatchFilterMenu";

export default function StudentDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const { data: enrolledClasses = [], isLoading } = useGetEnrolledClasses();
  const { mutate: joinMutate, isPending: isJoining } = useJoinClass();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleJoinClass = (batchCode: string) => {
    joinMutate(batchCode, {
      onSuccess: () => {
        setIsJoinModalOpen(false);
      },
      onError: (err) => {
        console.error("Failed to join class:", err);
      },
    });
  };

  const filteredBatches = (enrolledClasses || [])
    .filter(Boolean)
    .filter(
      (cls) =>
        cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="w-full text-foreground pb-8">
      <div className="w-full mx-auto">
        {user && <DashboardHeader profile={user} stats={stats} />}
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches, subjects, or codes..."
              className="pl-10 h-11 bg-card border-border focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <BatchFilterMenu />
          </div>
        </div>

        {/* Batch Content Grid */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">
              Active Batches
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              {filteredBatches.length} total
            </span>
          </div>

          {filteredBatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-dashed border-border text-center">
              <div className="bg-muted p-4 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">
                No batches found
              </h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                We couldn&apos;t find any batches matching &quot;{searchQuery}
                &quot;. Try creating a new one or adjusting filters.
              </p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
