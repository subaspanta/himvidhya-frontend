"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Copy,
  Users,
  Edit,
  Archive,
  Delete,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/shared/utils";
import { Batch } from "@/types/dashboard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";

interface BatchCardProps {
  batch: Batch;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  const router = useRouter();

  const copyCodeToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(batch.code);
    toast.success("Batch code copied!");
  };

  const openBatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${batch.id}`);
  };

  const initials = batch.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "bg-card border border-border rounded-2xl",
        "hover:shadow-md hover:border-primary/30 hover:scale-[1.02]",
        "flex flex-col",
      )}
    >
      {/* Header: Icon, title, kebab */}
      <CardHeader className="px-6 pt-4 pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm tracking-wide shrink-0">
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg md:text-2xl leading-tight truncate text-foreground">
                {batch.name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground truncate mt-1">
                {batch.subject}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Batch options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={copyCodeToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit Batch
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="w-4 h-4 mr-2" />
                Archive Batch
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Delete className="w-4 h-4 mr-2" />
                Delete Batch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Bottom row: students + manage */}
      <CardContent className="px-6 pt-3 pb-4 border-t border-border/60 mt-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="font-medium text-foreground">
              {batch.studentCount}
            </span>
            <span>Students</span>
          </div>

          <button
            type="button"
            onClick={openBatch}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 hover:underline"
          >
            Manage
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchCard;
