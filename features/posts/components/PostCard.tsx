"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { CommentList } from "@/features/comments/components/CommentList";
import { cn } from "@/shared/utils";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  onPin?: (postId: string) => void;
  onUnpin?: (postId: string) => void;
}

export function PostCard({ post, isOwner, onPin, onUnpin }: PostCardProps) {
  const isDeleted = Boolean(post.deletedAt);
  const [areCommentsOpen, setAreCommentsOpen] = useState(false);

  return (
    <Card className="p-5 gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <CardTitle className="text-base">{post.title}</CardTitle>
            {post.isPinned && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-subtle text-primary">
                Pinned
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {post.authorId.name}
          </p>
        </div>
        {isOwner && !isDeleted && (
          <div className="shrink-0">
            {post.isPinned ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onUnpin?.(post.id)}
              >
                Unpin
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onPin?.(post.id)}
              >
                Pin
              </Button>
            )}
          </div>
        )}
      </div>

      {isDeleted ? (
        <p className="text-sm text-muted-foreground italic">
          This post was deleted.
        </p>
      ) : (
        <p className="text-sm text-foreground whitespace-pre-wrap max-w-prose">
          {post.content}
        </p>
      )}

      <button
        type="button"
        onClick={() => setAreCommentsOpen((open) => !open)}
        aria-expanded={areCommentsOpen}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground w-fit",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
        )}
      >
        <MessageSquare className="w-3.5 h-3.5" />
        {areCommentsOpen ? "Hide comments" : "Comments"}
      </button>

      {areCommentsOpen && <CommentList postId={post.id} canModerate={isOwner} />}
    </Card>
  );
}
