"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Grid,
  List,
  Filter,
  BookOpen,
  Users,
  Layers,
  BarChart,
  UserPlus,
} from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";
import { ClassCard } from "@/features/class/types";
import { CreateClassForm } from "@/features/class/components/dashboard/CreateClassForm";
import { getEnrolledClasses, createClass } from "@/features/class/api/classApi";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ClassGrid } from "@/features/class/components/dashboard/ClassGrid";
import { ClassList } from "@/features/class/components/dashboard/ClassList";
import DashboardHeader from "@/components/DashboardHeader";
import { TeacherStats } from "@/types/dashboard";
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

export default function TeacherDashboard() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<ClassCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchClasses();
  }, []);

  const stats: TeacherStats = {
    totalStudents: 142,
    activeBatches: 8,
    averageAttendance: 84,
    assignmentsPending: 12,
    joinRequests: 3,
  };

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const enrolledClasses = await getEnrolledClasses();
      console.log("Enrolled Classes:", enrolledClasses);
      setClasses(
        Array.isArray(enrolledClasses) ? enrolledClasses.filter(Boolean) : [],
      );
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBatches = (classes || [])
    .filter(Boolean)
    .filter(
      (cls) =>
        cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
        {user && <DashboardHeader profile={user} stats={stats} />}
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches, subjects, or codes..."
              className="pl-10 h-11 bg-card border-border focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 bg-card border-border hover:bg-muted gap-2 w-full sm:w-auto"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Batch Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active Batches
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Attendance (Low-High)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  key={batch._id}
                  batch={
                    {
                      id: batch._id,
                      name: batch.name,
                      subject: batch.subject,
                      code: batch.code || "",
                      studentCount: 0,
                      maxStudents: 0,
                      lastActivity: "Just now",
                      attendanceRate: 0,
                      unreadMessages: 0,
                      status: "active",
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
