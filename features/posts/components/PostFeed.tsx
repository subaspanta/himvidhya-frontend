"use client";

import { useEffect, useRef } from "react";
import { Spinner } from "@/shared/loading/Spinner";
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
      <p className="text-sm text-danger py-4">Unable to load posts.</p>
    );
  }

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-8 text-center">
        No posts yet.
      </p>
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

      <div ref={sentinelRef} aria-hidden />

      {isFetchingNextPage && (
        <div className="py-4">
          <Spinner size={20} />
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
