"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useClassDetails } from "@/features/classes/hooks/useClassDetails";
import { ClassHeaderSkeleton } from "@/components/ui/skeleton";
import { CreatePostForm } from "../components/CreatePostForm";
import { PostFeed } from "../components/PostFeed";

interface ClassFeedPageProps {
  classId: string;
}

export function ClassFeedPage({ classId }: ClassFeedPageProps) {
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

  // Client-side visibility only -- real enforcement is server-side via
  // assertClassOwner (POST .../posts, pin/unpin all 403 a non-owner).
  const isOwner = user?.id === classDetails.owner._id;
  const isArchived = classDetails.status === "archived";

  return (
    <div className="w-full text-foreground pb-8 space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{classDetails.name}</h1>
          {isArchived && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
              Archived
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {classDetails.membersCount}{" "}
          {classDetails.membersCount === 1 ? "member" : "members"}
        </p>
      </div>

      {isArchived && (
        <p className="text-sm px-4 py-3 rounded-lg bg-muted text-muted-foreground border border-border">
          This class is archived. Existing content is read-only.
        </p>
      )}

      {isOwner && !isArchived && <CreatePostForm classId={classId} />}

      <PostFeed classId={classId} isOwner={isOwner} />
    </div>
  );
}
