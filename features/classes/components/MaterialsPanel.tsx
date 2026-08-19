"use client";

import { MaterialsList } from "@/features/materials/components/MaterialsList";
import { useClassContext } from "../context/ClassContext";

export function MaterialsPanel() {
  const { classDetails, isOwner, isArchived } = useClassContext();

  return (
    <MaterialsList classId={classDetails.id} isOwner={isOwner} isArchived={isArchived} />
  );
}
