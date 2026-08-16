import React from "react";
import { ClassCard } from "../../types";

interface ClassCardItemProps {
  classData: ClassCard;
  onClick?: () => void;
  variant?: "grid" | "list";
}

export const ClassCardItem: React.FC<ClassCardItemProps> = ({
  classData,
  onClick,
  variant = "grid",
}) => {
  const { owner, name, subject, studentCount } = classData;

  return (
    <div
      onClick={onClick}
      className={`
        group cursor-pointer rounded-lg border border-border bg-card p-4 
        transition-all hover:shadow-md hover:border-primary
        ${variant === "list" ? "flex items-center justify-between" : ""}
      `}
    >
      <div className="flex items-start gap-3 flex-1">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-primary">
            {owner?.avatar || name.substring(0, 2).toUpperCase()}
          </span>
        </div>

        {/* Class Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {studentCount || 0}{" "}
            {studentCount === 1 ? "member" : "members"}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-block px-2 py-1 rounded bg-primary/10 text-xs font-medium text-primary">
              {subject}
            </span>
            <span className="text-xs text-muted-foreground">
              {owner?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
