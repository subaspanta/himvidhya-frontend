import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/shared/utils";

export const NavbarSkeleton = ({ className }: { className?: string }) => (
  <nav
    aria-hidden="true"
    className={cn(
      "sticky top-0 z-10 w-full flex justify-between items-center border-b bg-background",
      className,
    )}
  >
    <Skeleton className="h-8 w-32 rounded-lg" />
    <div className="flex items-center gap-3">
      <Skeleton className="h-9 w-20 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  </nav>
);
