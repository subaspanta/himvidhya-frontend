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

// Shared shell for both class tabs (Stream/People): fetches classDetails
// once, renders the header + tab nav, and hands isOwner/isArchived to every
// tab page through ClassContext so none of them needs its own
// useClassDetails + useAuthStore pair.
export function ClassLayoutShell({ classId, children }: ClassLayoutShellProps) {
  const { user } = useAuthStore();
  const { data: classDetails, isLoading, isError } = useClassDetails(classId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto w-full pb-8">
        <ClassHeaderSkeleton />
        <p className="sr-only">Loading class...</p>
      </div>
    );
  }

  if (isError || !classDetails) {
    return (
      <p className="max-w-4xl mx-auto text-sm text-destructive py-8">
        Unable to load this class.
      </p>
    );
  }

  // Client-side visibility only -- real enforcement is server-side
  // (assertClassOwner on every write endpoint).
  const isOwner = user?.id === classDetails.owner._id;
  const isArchived = classDetails.status === "archived";

  return (
    <ClassProvider value={{ classDetails, isOwner, isArchived }}>
      {/* One shared reading column for header, tabs, and every tab panel --
          this page has no RightAside (unlike the dashboards), so without a
          cap the content would either stretch edge-to-edge or, worse, sit
          left-aligned in a wide container with dead space to the right. */}
      <div className="max-w-4xl mx-auto w-full text-foreground pb-8 space-y-6">
        <ClassHeader classDetails={classDetails} isOwner={isOwner} isArchived={isArchived} />
        <ClassTabs classId={classId} />
        {children}
      </div>
    </ClassProvider>
  );
}
