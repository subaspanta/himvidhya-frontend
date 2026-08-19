"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClassSearchInput } from "@/components/common/ClassSearchInput";
import { MaterialRowSkeletonGroup } from "@/components/ui/skeleton";
import { useMaterials } from "../hooks/useMaterials";
import { MaterialRow } from "./MaterialRow";
import { UploadMaterialForm } from "./UploadMaterialForm";

interface MaterialsListProps {
  classId: string;
  isOwner: boolean;
  isArchived: boolean;
}

export function MaterialsList({ classId, isOwner, isArchived }: MaterialsListProps) {
  const [query, setQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMaterials(classId, query);

  const materials = data?.pages.flatMap((page) => page.materials) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <ClassSearchInput
          id="material-search"
          label="Search materials"
          value={query}
          onChange={setQuery}
          placeholder="Search materials..."
          className="flex-1"
        />
        {isOwner && !isArchived && (
          <Button type="button" onClick={() => setIsUploadOpen(true)} className="shrink-0">
            <Plus className="w-4 h-4" />
            Upload Material
          </Button>
        )}
      </div>

      {isLoading && <MaterialRowSkeletonGroup />}

      {isError && (
        <p className="text-sm text-destructive py-4">Unable to load materials.</p>
      )}

      {!isLoading && !isError && materials.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            {query ? "No materials match your search." : "No materials yet."}
          </p>
          {isOwner && !isArchived && !query && (
            <p className="text-sm text-muted-foreground mt-1">
              Upload your first file above.
            </p>
          )}
        </div>
      )}

      {!isLoading && !isError && materials.length > 0 && (
        <div className="border-t border-border">
          {materials.map((material) => (
            <MaterialRow
              key={material.id}
              material={material}
              classId={classId}
              isOwner={isOwner}
            />
          ))}
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}

      {isOwner && (
        <UploadMaterialForm
          classId={classId}
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
        />
      )}
    </div>
  );
}
