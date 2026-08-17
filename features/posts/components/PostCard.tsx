"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  isOwner: boolean;
  onPin?: (postId: string) => void;
  onUnpin?: (postId: string) => void;
}

function authorName(authorId: Post["authorId"]): string | null {
  if (typeof authorId === "string") return null;
  return authorId.name;
}

export function PostCard({ post, isOwner, onPin, onUnpin }: PostCardProps) {
  const isDeleted = Boolean(post.deletedAt);
  const author = authorName(post.authorId);

  return (
    <Card className="p-5">
      <CardHeader className="px-0 flex-row items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <CardTitle className="text-base">{post.title}</CardTitle>
          {post.isPinned && (
            <span className="text-xs font-medium text-primary">Pinned</span>
          )}
        </div>
        {isOwner && !isDeleted && (
          <div>
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
      </CardHeader>

      {author && (
        <p className="text-xs text-muted-foreground -mt-4">{author}</p>
      )}

      {isDeleted ? (
        <p className="text-sm text-muted-foreground italic">
          This post was deleted.
        </p>
      ) : (
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {post.content}
        </p>
      )}
    </Card>
  );
}
