"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "@/shared/loading/Spinner";
import { Button } from "@/components/ui/button";
import { usePostsFeed } from "../hooks/usePostsFeed";
import { usePinPost } from "../hooks/usePinPost";
import { useUnpinPost } from "../hooks/useUnpinPost";
import { PostCard } from "./PostCard";

interface PostFeedProps {
  classId: string;
  isOwner: boolean;
}

export function PostFeed({ classId, isOwner }: PostFeedProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsFeed(classId);
  const { mutate: pin } = usePinPost(classId);
  const { mutate: unpin } = useUnpinPost(classId);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    // Single in-flight request per page: hasNextPage/isFetchingNextPage
    // gate every trigger, not just the initial one, so a second
    // intersection while a fetch is already pending is a no-op.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="py-8">
        <Spinner size={24} />
        <p className="sr-only">Loading posts...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive py-4">Unable to load posts.</p>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (posts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">No posts yet.</p>
        {isOwner && (
          <p className="text-sm text-muted-foreground mt-1">
            Share your first post above.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isOwner={isOwner}
          onPin={(id) => pin(id)}
          onUnpin={(id) => unpin(id)}
        />
      ))}

      {/* IntersectionObserver drives the common path; this button is the
          keyboard/reduced-motion-reachable fallback for the same action. */}
      <div ref={sentinelRef} aria-hidden />

      {isFetchingNextPage && (
        <div className="py-4">
          <Spinner size={20} />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center py-2">
          <Button variant="outline" size="sm" onClick={() => fetchNextPage()}>
            Load more
          </Button>
        </div>
      )}

      {!hasNextPage && (
        <p className="text-sm text-muted-foreground text-center py-4">
          You&apos;re all caught up.
        </p>
      )}
    </div>
  );
}
