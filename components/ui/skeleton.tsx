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

export { Skeleton, ClassCardSkeleton, ClassCardSkeletonGrid };
