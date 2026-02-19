"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Plus, Grid, List } from "lucide-react";
import { ClassCard } from "@/features/class/types";
import { CreateClassForm } from "@/features/class/components/dashboard/CreateClassForm";
import {
  createClass,
  getEnrolledClasses,
  joinClass,
} from "@/features/class/api/classApi";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLayout } from "@/providers/layout-provider";
import { JoinClassForm } from "@/features/class/components/dashboard/JoinClassForm";
import { ClassGrid } from "@/features/class/components/dashboard/ClassGrid";
import { ClassList } from "@/features/class/components/dashboard/ClassList";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { viewMode, setViewMode } = useLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<ClassCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const enrolledClasses = await getEnrolledClasses();
      // Filter out any null/undefined entries
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

  const handleCreateClass = async (data: {
    name: string;
    subject: string;
    description: string;
  }) => {
    setIsLoading(true);
    try {
      const newClass = await createClass(data);
      if (newClass) {
        setClasses((prev) => [newClass, ...prev]);
      }
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create class:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinClass = async (batchCode: string) => {
    setIsLoading(true);
    try {
      const joinedClass = await joinClass(batchCode);
      if (joinedClass) {
        setClasses((prev) => [joinedClass, ...prev]);
      }
      setIsJoinModalOpen(false);
    } catch (error) {
      console.error("Failed to join class:", error);
      // TODO: Show error toast/notification to user
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClasses = (classes || [])
    .filter(Boolean) // Remove null/undefined entries
    .filter(
      (cls) =>
        cls.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.creator?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Hi {user?.name || "Student"}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Ready to learn something new today? You have{" "}
              <span className="font-semibold text-foreground">
                {classes?.length || 0}{" "}
                {classes?.length === 1 ? "class" : "classes"}
              </span>{" "}
              with active discussions.
            </p>
          </div>

          {user?.role === "teacher" && (
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="shadow-lg gap-2 w-full md:w-auto "
            >
              <Plus className="w-4 h-4" />
              Create Class
            </Button>
          )}
          {user?.role === "student" && (
            <Button
              onClick={() => setIsJoinModalOpen(true)}
              className="shadow-lg gap-2 w-full md:w-auto "
            >
              <Plus className="w-4 h-4" />
              Join Class
            </Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-20 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search classes, subjects, or teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full pl-10 pr-4 rounded-xl transition-all duration-200 bg-black/5 text-gray-900 placeholder:text-gray-400 font-medium border border-black/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 focus:bg-white"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">Loading classes...</div>
        </div>
      ) : viewMode === "grid" ? (
        <ClassGrid
          classes={filteredClasses}
          onClassClick={(classId: string) => router.push(`/class/${classId}`)}
        />
      ) : (
        <ClassList
          classes={filteredClasses}
          onClassClick={(classId: string) => router.push(`/class/${classId}`)}
        />
      )}
      {!isLoading && filteredClasses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No classes found
          </h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search"
              : "Create a new class to get started"}
          </p>
        </div>
      )}
      <CreateClassForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateClass}
        isLoading={isLoading}
      />
      <JoinClassForm
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinClass}
        isLoading={isLoading}
      />
    </div>
  );
}
