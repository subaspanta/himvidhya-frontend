import React from "react";
import { ClassCardItem } from "./ClassCardItem";
import { ClassCard } from "../../types";

interface ClassListProps {
  classes: ClassCard[];
  onClassClick?: (classId: string) => void;
}

export const ClassList: React.FC<ClassListProps> = ({
  classes,
  onClassClick,
}) => {
  if (classes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {classes.map((cls) => (
        <ClassCardItem
          key={cls.id}
          classData={cls}
          onClick={() => onClassClick?.(cls.id)}
          variant="list"
        />
      ))}
    </div>
  );
};
