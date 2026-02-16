"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/shared/ui/button";
import TextField from "@/shared/ui/TextField";
import { Search, Plus, Grid, List } from "lucide-react";
import { ClassCard } from "@/features/classes/types";
import { ClassGrid } from "@/features/classes/components/ClassGrid";
import { ClassList } from "@/features/classes/components/ClassList";
import { getEnrolledClasses } from "@/features/classes/api/classApi";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLayout } from "@/providers/layout-provider";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { viewMode, setViewMode } = useLayout();
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState<ClassCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const enrolledClasses = await getEnrolledClasses();
      console.log("Enrolled classes:", enrolledClasses);
      setClasses(enrolledClasses);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateClass = () => {};

  const filteredClasses = (classes || []).filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.creator.name.toLowerCase().includes(searchQuery.toLowerCase()),
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

          <Button
            onClick={handleCreateClass}
            className="shadow-lg gap-2 w-full md:w-auto "
          >
            <Plus className="w-4 h-4" />
            Create Class
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-400 pointer-events-none" />
            <TextField
              placeholder="Search classes, subjects, or teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="[&_input]:pl-10"
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
        <ClassGrid classes={filteredClasses} />
      ) : (
        <ClassList classes={filteredClasses} />
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
    </div>
  );
}
