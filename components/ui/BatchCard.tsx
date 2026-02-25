import React from "react";
import {
  MoreHorizontal,
  Copy,
  Users,
  Clock,
  MessageSquare,
  Edit,
  Archive,
  Delete,
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import toast from "react-hot-toast";

interface BatchCardProps {
  batch: Batch;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  const hasUnread = batch.unreadMessages > 0;

  const copyCodeToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(batch.code);
    toast.success("Batch code copied!");
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "bg-card border border-border rounded-xl",
        "hover:shadow-md hover:border-primary/30 hover:scale-[1.02]",
        "flex flex-col",
        "min-h-[200px] sm:min-h-[210px] md:min-h-[220px]", // consistent height
      )}
    >
      {/* Header: Icon + Name */}
      <CardHeader className="p-5 ">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
            {batch.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base md:text-lg leading-tight truncate text-foreground group-hover:text-primary transition-colors">
              {batch.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground truncate mt-0.5">
              {batch.subject}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Content: Meta info – improved spacing */}
      <CardContent className="p-5  flex-1 flex flex-col justify-between">
        {/* Students + Last activity */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary/80" />
            <span className="font-medium text-foreground">
              {batch.studentCount}
            </span>
            <span>students</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {batch.lastActivity}
            </span>
          </div>
        </div>

        {/* Unread messages – only if exists, bottom aligned */}
        {/* {hasUnread && (
          <div className="mt-auto flex items-center gap-2 text-sm text-primary font-medium">
            <MessageSquare className="w-4 h-4" />
            {batch.unreadMessages} unread messages
          </div>
        )} */}
      </CardContent>

      {/* Footer: Actions – fixed */}
      <CardFooter className="p-5  border-t bg-muted/20">
        <div className="w-full flex items-center justify-between gap-3">
          <Button
            variant="default"
            size="sm"
            className="
              flex-1 font-medium 
              bg-primary/90 hover:bg-primary/80 
              shadow-sm hover:shadow 
              transition-all active:scale-98
            "
          >
            Open Batch
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
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
      </CardFooter>
    </Card>
  );
};

export default BatchCard;
