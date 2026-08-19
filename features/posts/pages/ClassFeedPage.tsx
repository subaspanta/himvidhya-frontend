"use client";

import { useClassContext } from "@/features/classes/context/ClassContext";
import { CreatePostForm } from "../components/CreatePostForm";
import { PostFeed } from "../components/PostFeed";

interface ClassFeedPageProps {
  classId: string;
}

// The Stream tab's content only -- header, archived banner, and tab nav
// now live in ClassLayoutShell, shared across Stream/Materials/People.
export function ClassFeedPage({ classId }: ClassFeedPageProps) {
  const { isOwner, isArchived } = useClassContext();

  return (
    <div className="space-y-4">
      {isOwner && !isArchived && <CreatePostForm classId={classId} />}
      <PostFeed classId={classId} isOwner={isOwner} />
    </div>
  );
}
