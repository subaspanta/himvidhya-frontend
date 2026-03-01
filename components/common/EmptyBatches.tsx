"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyBatchesProps {
  searchQuery?: string;
  onClear?: () => void;
}

const EmptyBatches: React.FC<EmptyBatchesProps> = ({
  searchQuery,
  onClear,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-dashed border-border text-center">
      <div className="bg-muted p-4 rounded-full mb-4">
        <BookOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">
        No batches found
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        We couldn&apos;t find any batches matching &quot;{searchQuery}
        &quot;. Try creating a new one or adjusting filters.
      </p>
      <Button onClick={onClear} variant="outline">
        Clear Search
      </Button>
    </div>
  );
};

export default EmptyBatches;
