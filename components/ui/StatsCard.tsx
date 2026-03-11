"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div
      className="w-full   bg-card rounded-2xl border border-border shadow-sm flex items-center gap-4 p-4"
      style={{
        boxShadow:
          "0px 0px 2px rgba(23,26,31,0.12), 0px 0px 1px rgba(23,26,31,0.07)",
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-muted">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-lg font-semibold text-foreground mt-1">
          {value}
        </span>
      </div>
    </div>
  );
}
