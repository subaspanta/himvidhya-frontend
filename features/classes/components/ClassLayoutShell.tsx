"use client";

import type { ReactNode } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useClassDetails } from "@/features/classes/hooks/useClassDetails";
import { ClassHeaderSkeleton } from "@/components/ui/skeleton";
import { ClassProvider } from "../context/ClassContext";
import { ClassHeader } from "./ClassHeader";
import { ClassTabs } from "./ClassTabs";

interface ClassLayoutShellProps {
  classId: string;
  children: ReactNode;
}

// Shared shell for all three class tabs (Stream/Materials/People): fetches
// classDetails once, renders the header + tab nav, and hands isOwner/
// isArchived to every tab page through ClassContext so none of them needs
// its own useClassDetails + useAuthStore pair.
export function ClassLayoutShell({ classId, children }: ClassLayoutShellProps) {
  const { user } = useAuthStore();
  const { data: classDetails, isLoading, isError } = useClassDetails(classId);

  if (isLoading) {
    return (
      <div className="w-full pb-8">
        <ClassHeaderSkeleton />
        <p className="sr-only">Loading class...</p>
      </div>
    );
  }

  if (isError || !classDetails) {
    return (
      <p className="text-sm text-destructive py-8">Unable to load this class.</p>
    );
  }

  // Client-side visibility only -- real enforcement is server-side
  // (assertClassOwner on every write endpoint).
  const isOwner = user?.id === classDetails.owner._id;
  const isArchived = classDetails.status === "archived";

  return (
    <ClassProvider value={{ classDetails, isOwner, isArchived }}>
      <div className="w-full text-foreground pb-8 space-y-6">
        <ClassHeader classDetails={classDetails} isOwner={isOwner} isArchived={isArchived} />
        <ClassTabs classId={classId} />
        {children}
      </div>
    </ClassProvider>
  );
}
