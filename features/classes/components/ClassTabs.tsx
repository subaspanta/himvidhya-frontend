"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils";

interface ClassTabsProps {
  classId: string;
}

export function ClassTabs({ classId }: ClassTabsProps) {
  const pathname = usePathname();

  const tabs = [
    { label: "Stream", href: `/home/classes/${classId}` },
    { label: "Materials", href: `/home/classes/${classId}/materials` },
    { label: "People", href: `/home/classes/${classId}/people` },
  ];

  return (
    <nav
      aria-label="Class navigation"
      className="flex gap-1 overflow-x-auto border-b border-border"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "shrink-0 whitespace-nowrap px-3 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-t",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
