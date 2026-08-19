import { cn } from "@/shared/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-muted rounded-md motion-safe:animate-pulse",
        className,
      )}
      {...props}
    />
  );
}

function ClassCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col gap-0 py-0 overflow-hidden">
      <div className="px-6 pt-5 pb-3 flex items-start gap-3">
        <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
        <div className="flex-1 min-w-0 space-y-2 pt-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="px-6 py-4 border-t border-border/80 flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

function ClassCardSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 items-start">
      {Array.from({ length: count }).map((_, i) => (
        <ClassCardSkeleton key={i} />
      ))}
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-2 flex-1">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

function PostFeedSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ListRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2">
      <Skeleton className="w-9 h-9 rounded-full shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

function ListRowSkeletonGroup({ count = 3 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <ListRowSkeleton key={i} />
      ))}
    </div>
  );
}

function ClassHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex items-start gap-2.5 py-2">
      <Skeleton className="w-7 h-7 rounded-full shrink-0" />
      <div className="flex-1 min-w-0 space-y-1.5">
        <Skeleton className="h-3.5 w-1/4" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

function CommentSkeletonGroup({ count = 2 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
}

export {
  Skeleton,
  ClassCardSkeleton,
  ClassCardSkeletonGrid,
  PostCardSkeleton,
  PostFeedSkeleton,
  ListRowSkeleton,
  ListRowSkeletonGroup,
  ClassHeaderSkeleton,
  CommentSkeleton,
  CommentSkeletonGroup,
};
