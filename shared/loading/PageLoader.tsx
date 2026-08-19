import { Skeleton } from "@/components/ui/skeleton";

export const PageLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Skeleton className="w-12 h-12 rounded-xl" />
      <Skeleton className="h-3 w-24" />
      <p className="sr-only">Loading...</p>
    </div>
  );
};
