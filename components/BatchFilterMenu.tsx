"use client";

import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const BatchFilterMenu: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-11 bg-card border-border hover:bg-muted gap-2 w-full sm:w-auto ${
            className ?? ""
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filter by</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Batch Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>
          Active Batches
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuItem>Newest First</DropdownMenuItem>
        <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
        <DropdownMenuItem>Attendance (Low-High)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BatchFilterMenu;
