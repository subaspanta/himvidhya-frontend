import React from "react";
import { ClassCard } from "../../types";
import { ClassCardItem } from "./ClassCardItem";

interface ClassGridProps {
  classes: ClassCard[];
  onClassClick?: (classId: string) => void;
}

export const ClassGrid: React.FC<ClassGridProps> = ({
  classes,
  onClassClick,
}) => {
  if (classes.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((cls) => (
        <ClassCardItem
          key={cls._id}
          classData={cls}
          onClick={() => onClassClick?.(cls._id)}
        />
      ))}
    </div>
  );
};
