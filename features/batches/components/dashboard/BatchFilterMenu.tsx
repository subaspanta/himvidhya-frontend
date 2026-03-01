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
} from "@/components/ui/dropdown-menu";

type Props = {
  className?: string;
  showActive?: boolean;
  showArchived?: boolean;
  setShowActive?: (v: boolean) => void;
  setShowArchived?: (v: boolean) => void;
};

const BatchFilterMenu: React.FC<Props> = ({
  className,
  showActive = true,
  showArchived = false,
  setShowActive,
  setShowArchived,
}) => {
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
        <DropdownMenuCheckboxItem
          checked={showActive}
          onCheckedChange={(_v: boolean) => {
            // make this behave like a radio: selecting Active shows only active
            setShowActive?.(true);
            setShowArchived?.(false);
          }}
        >
          Active Batches
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showArchived}
          onCheckedChange={(_v: boolean) => {
            // selecting Archived shows only archived
            setShowArchived?.(true);
            setShowActive?.(false);
          }}
        >
          Archived
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BatchFilterMenu;
