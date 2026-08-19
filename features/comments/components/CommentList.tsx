"use client";

import { Button } from "@/components/ui/button";
import { CommentSkeletonGroup } from "@/components/ui/skeleton";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useComments } from "../hooks/useComments";
import { CommentItem } from "./CommentItem";
import { CommentComposer } from "./CommentComposer";

interface CommentListProps {
  postId: string;
  /** Class owner -- may delete (never edit) any comment in this class. */
  canModerate: boolean;
}

export function CommentList({ postId, canModerate }: CommentListProps) {
  const { user } = useAuthStore();
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useComments(postId);

  const comments = data?.pages.flatMap((page) => page.comments) ?? [];

  return (
    <div className="border-t border-border pt-3 mt-3 space-y-3">
      <CommentComposer postId={postId} />

      {isLoading && <CommentSkeletonGroup />}

      {isError && (
        <p className="text-sm text-destructive py-2">Unable to load comments.</p>
      )}

      {!isLoading && !isError && comments.length === 0 && (
        <p className="text-sm text-muted-foreground py-2">
          No comments yet. Be the first to reply.
        </p>
      )}

      {!isLoading && !isError && comments.length > 0 && (
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              isAuthor={comment.authorId._id === user?.id}
              canModerate={canModerate}
            />
          ))}
        </div>
      )}

      {/* D6/C8: comments never auto-load on scroll -- this is the only
          trigger, not a fallback alongside an observer. */}
      {hasNextPage && (
        <div className="flex justify-center pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more comments"}
          </Button>
        </div>
      )}
    </div>
  );
}
