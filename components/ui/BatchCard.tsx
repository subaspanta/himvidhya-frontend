import React from "react";
import {
  MoreHorizontal,
  Copy,
  Users,
  Clock,
  AlertCircle,
  AlertTriangle,
  MessageSquare,
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
import { Badge } from "./badge";
import { Card, CardContent, CardFooter, CardHeader } from "./card";

interface BatchCardProps {
  batch: Batch;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  const isAttendanceLow = batch.attendanceRate < 70;

  // Check if deadline is tomorrow (mock logic for demo)
  const isDeadlineUrgent = batch.nextDeadline
    ? new Date(batch.nextDeadline).getDate() === new Date().getDate() + 1
    : false;

  const copyCodeToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(batch.code);
    // Ideally user toast here
    console.log(`Copied code: ${batch.code}`);
  };

  return (
    <Card
      data-cmp="BatchCard"
      className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-custom hover:border-primary/50 relative overflow-hidden bg-card border-border"
    >
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start mb-2">
          {/* Status Badges - Absolute positioning or top flow */}
          <div className="flex gap-2 flex-wrap">
            {isAttendanceLow && (
              <Badge
                variant="destructive"
                className="flex gap-1 items-center px-2 py-0.5 text-xs font-medium"
              >
                <AlertCircle className="w-3 h-3" />
                Low Attendance
              </Badge>
            )}
            {batch.nextDeadline && isDeadlineUrgent && (
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 flex gap-1 items-center px-2 py-0.5 text-xs border-amber-200 dark:border-amber-800"
              >
                <AlertTriangle className="w-3 h-3" />
                Deadline Tomorrow
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 -mr-2 -mt-1"
              >
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={copyCodeToClipboard}>
                Copy Code
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Batch</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold font-heading text-foreground tracking-tight group-hover:text-primary transition-colors">
            {batch.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {batch.subject}
          </p>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2 pb-4 space-y-4">
        {/* Batch Code */}
        <div
          onClick={copyCodeToClipboard}
          className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary rounded-md px-3 py-1.5 w-fit cursor-pointer transition-colors border border-transparent hover:border-border group/code"
        >
          <span className="font-mono text-sm font-semibold text-primary/90">
            {batch.code}
          </span>
          <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover/code:text-primary transition-colors" />
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">
              {batch.studentCount}
            </span>
            <span>Students</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{batch.lastActivity}</span>
          </div>
        </div>

        {/* Activity Indicator / Messages */}
        {batch.unreadMessages > 0 ? (
          <div className="flex items-center gap-2 text-sm text-primary font-medium bg-blue-50 dark:bg-blue-950/30 px-3 py-2 rounded-lg">
            <MessageSquare className="w-4 h-4" />
            <span>{batch.unreadMessages} new messages</span>
          </div>
        ) : (
          <div className="h-[36px]"></div> // Spacer to keep card heights consistent ideally
        )}
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">Attendance</span>
            <span
              className={cn(
                "text-sm font-bold",
                batch.attendanceRate >= 70
                  ? "text-green-600 dark:text-green-400"
                  : "text-destructive",
              )}
            >
              {batch.attendanceRate}%
            </span>
          </div>
          <Button className="font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 bg-primary hover:bg-blue-800">
            Open Batch
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BatchCard;
