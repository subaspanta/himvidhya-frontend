"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type Props = {
  sortBy: "newest" | "name" | "attendance";
  setSortBy: (v: "newest" | "name" | "attendance") => void;
  className?: string;
};

const labelFor = (key: Props["sortBy"]) =>
  key === "newest" ? "Newest" : key === "name" ? "Name (A-Z)" : "Attendance";

const SortMenu: React.FC<Props> = ({ sortBy, setSortBy, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`h-11 bg-card border-border hover:bg-muted gap-2 w-full sm:w-auto ${
            className ?? ""
          }`}
        >
          <span>Sort by: {labelFor(sortBy)}</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setSortBy("newest")}>
          Newest First{sortBy === "newest" ? " ✅" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("name")}>
          Name (A-Z){sortBy === "name" ? " ✅" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortBy("attendance")}>
          Attendance (Low-High){sortBy === "attendance" ? " ✅" : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortMenu;
