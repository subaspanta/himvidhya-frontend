import React, { useState } from "react";
import { Plus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth";
import useCreateClass from "@/features/classes/hooks/useCreateClass";
import { CreateClassForm } from "@/features/classes/components/CreateClassForm";
import { JoinClassForm } from "@/features/classes/components/JoinClassForm";

interface DashboardHeaderProps {
  profile: User;
  activeClassCount: number;
  role?: "teacher" | "student";
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  profile,
  activeClassCount,
  role = "teacher",
}) => {
  const isTeacher = role === "teacher";
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const { mutate: createMutate, isPending: isCreating } = useCreateClass();

  const handleCreateClass = (data: {
    name: string;
    subject: string;
    description: string;
  }) => {
    createMutate(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
      onError: (err) => {
        console.error("Failed to create class:", err);
      },
    });
  };

  return (
    <div data-cmp="DashboardHeader" className="space-y-8 mb-10">
      {/* Top Bar container - Responsive */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Good Morning, {profile.name}
              </h1>
              <span className="inline-flex items-center justify-center bg-primary-subtle text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-primary/20">
                {isTeacher ? "TEACHER" : "STUDENT"}
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xl ">
              You have{" "}
              <span className="font-mono text-primary">
                {activeClassCount} active{" "}
                {activeClassCount === 1 ? "class" : "classes"}
              </span>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {isTeacher ? (
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              size="lg"
              className="w-full md:w-auto gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create Class
            </Button>
          ) : (
            <Button
              onClick={() => setIsJoinModalOpen(true)}
              size="lg"
              className="w-full md:w-auto gap-2 font-semibold"
            >
              <LogIn className="w-5 h-5" />
              Join Class
            </Button>
          )}
        </div>
      </div>
      {isTeacher && (
        <CreateClassForm
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateClass}
          isLoading={isCreating}
        />
      )}
      <JoinClassForm
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
};

export default DashboardHeader;
