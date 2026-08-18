"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyBatchesProps {
  searchQuery?: string;
  onClear?: () => void;
  /** Overrides the "no data at all" heading/copy — e.g. for the student
   * dashboard's "join a class" framing instead of the teacher's "create". */
  emptyTitle?: string;
  emptyDescription?: string;
  /** Optional action rendered under the "no data at all" copy (e.g. a
   * repeated Join Class CTA). Ignored while a search is active. */
  emptyAction?: React.ReactNode;
}

const EmptyBatches: React.FC<EmptyBatchesProps> = ({
  searchQuery,
  onClear,
  emptyTitle = "No classes yet",
  emptyDescription = "You haven't created a class yet. Create one to get started.",
  emptyAction,
}) => {
  const isSearching = Boolean(searchQuery && searchQuery.trim().length > 0);

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border text-center">
      <div className="bg-muted p-4 rounded-full mb-4">
        <BookOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      {isSearching ? (
        <>
          <h3 className="text-lg font-bold text-foreground mb-1">
            No classes found
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            We couldn&apos;t find any classes matching &quot;{searchQuery}
            &quot;. Try a different search or adjusting filters.
          </p>
          <Button onClick={onClear} variant="outline">
            Clear Search
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold text-foreground mb-1">
            {emptyTitle}
          </h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {emptyDescription}
          </p>
          {emptyAction}
        </>
      )}
    </div>
  );
};

export default EmptyBatches;
