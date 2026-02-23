import React, { useState } from "react";
import { Plus, BarChart3, Users, BookOpen, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherStats } from "@/types/dashboard";
import { User } from "@/features/auth";
import { CreateClassForm } from "@/features/class/components/dashboard/CreateClassForm";
import { ClassCard, createClass } from "@/features/class";

interface DashboardHeaderProps {
  profile: User;
  stats: TeacherStats;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  profile,
  stats,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<ClassCard[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  return (
    <div data-cmp="DashboardHeader" className="space-y-8 mb-10">
      {/* Top Bar container - Responsive */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Hello, {profile.name}
              </h1>
              <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                TEACHER
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              Teacher ID:{" "}
              <span className="font-mono text-foreground/80">{profile.id}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Stats visible on larger screens */}
          <div className="hidden lg:flex items-center space-x-6 mr-4 border-r border-border pr-6">
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Students
              </p>
              <p className="text-xl font-bold text-foreground">
                {stats.totalStudents}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Avg. Attend
              </p>
              <p className="text-xl font-bold text-primary">
                {stats.averageAttendance}%
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full md:w-auto gap-2 font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-blue-800"
          >
            <Plus className="w-5 h-5" />
            Create New Batch
          </Button>
        </div>
      </div>

      {/* Mobile Stats Grid - Visible only on mobile/tablet */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-primary">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Total Students
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.totalStudents}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
              <BarChart3 className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Avg. Attendance
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.averageAttendance}%
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Active Batches
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.activeBatches}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <UserPlus className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Join Requests
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {stats.joinRequests}
          </p>
        </div>
      </div>
      <CreateClassForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateClass}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashboardHeader;
