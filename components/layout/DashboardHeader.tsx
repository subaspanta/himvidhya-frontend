import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/features/auth";
import useCreateClass from "@/features/home/hooks/useCreateClass";
import { ClassCard } from "@/features/batches";
import { CreateClassForm } from "@/features/batches/components/dashboard/CreateClassForm";

interface DashboardHeaderProps {
  profile: User;
  onClassCreated?: (cls: ClassCard) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  profile,
  onClassCreated,
}) => {
  const [classes, setClasses] = useState<ClassCard[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    mutate: createMutate,
    isPending: isCreating,
    error: createError,
  } = useCreateClass();

  const handleCreateClass = (data: {
    name: string;
    subject: string;
    description: string;
  }) => {
    createMutate(data, {
      onSuccess: (newClass) => {
        if (newClass) {
          setClasses((prev) => [newClass, ...prev]);
          if (typeof onClassCreated === "function") onClassCreated(newClass);
        }
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
              <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-primary text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                TEACHER
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-xl ">
              You have
              <span className="font-mono text-primary"> 3 classes </span>
              scheduled for today.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            size="lg"
            className="w-full md:w-auto gap-2 font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-blue-800"
          >
            <Plus className="w-5 h-5" />
            Create New Batch
          </Button>
        </div>
      </div>

      <CreateClassForm
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateClass}
        isLoading={isCreating}
      />
      {/* <JoinClassForm  /> */}
    </div>
  );
};

export default DashboardHeader;
