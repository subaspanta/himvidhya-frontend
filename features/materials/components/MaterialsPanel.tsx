"use client";

import { useState } from "react";
import { FileStack, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListRowSkeletonGroup } from "@/components/ui/skeleton";
import { useClassContext } from "@/features/classes/context/ClassContext";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useMaterials } from "../hooks/useMaterials";
import { MaterialRow } from "./MaterialRow";
import { UploadMaterialDialog } from "./MaterialDialogs";
import styles from "./MaterialsPanel.module.css";

export function MaterialsPanel() {
  const { classDetails, isOwner, isArchived } = useClassContext();
  const [search, setSearch] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const query = useDebouncedValue(search.trim(), 300);
  const materialsQuery = useMaterials(classDetails.id, query);
  const materials = materialsQuery.data?.pages.flatMap((page) => page.materials) ?? [];
  const canManage = isOwner && !isArchived;

  return (
    <section className={`${styles.panel} space-y-5`} aria-labelledby="materials-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 id="materials-heading" className="text-2xl font-bold text-foreground">
            Materials
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            Class files, reading, presentations, and reference documents.
          </p>
        </div>
        {canManage && (
          <Button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="min-h-11 self-start whitespace-nowrap sm:self-auto"
          >
            <Plus aria-hidden />
            Add material
          </Button>
        )}
      </div>

      <div className="relative max-w-xl">
        <label htmlFor="material-search" className="sr-only">
          Search materials
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id="material-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, description, or file name"
          className="h-11 pl-9"
        />
      </div>

      <div aria-live="polite" className="sr-only">
        {!materialsQuery.isLoading &&
          `${materials.length} ${materials.length === 1 ? "material" : "materials"} found`}
      </div>

      {materialsQuery.isLoading && (
        <div>
          <ListRowSkeletonGroup count={4} />
          <p className="sr-only">Loading materials…</p>
        </div>
      )}

      {materialsQuery.isError && (
        <div className="space-y-3 border-y border-border py-6">
          <p className="text-sm text-destructive">
            Materials could not be loaded. Check your connection and try again.
          </p>
          <Button variant="outline" size="sm" onClick={() => materialsQuery.refetch()}>
            Try again
          </Button>
        </div>
      )}

      {!materialsQuery.isLoading && !materialsQuery.isError && materials.length === 0 && (
        <div className="flex flex-col items-start gap-3 border-y border-border py-10">
          <span className="grid size-11 place-items-center rounded-md bg-primary-subtle text-primary">
            <FileStack className="size-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {query ? "No matching materials" : "No materials yet"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {query
                ? "Try a different title, description, or file name."
                : canManage
                  ? "Add the first file for this class."
                  : "Your teacher has not added any class files yet."}
            </p>
          </div>
          {canManage && !query && (
            <Button type="button" variant="outline" onClick={() => setIsUploadOpen(true)}>
              Add material
            </Button>
          )}
          {query && (
            <Button type="button" variant="outline" onClick={() => setSearch("")}>
              Clear search
            </Button>
          )}
        </div>
      )}

      {!materialsQuery.isLoading && !materialsQuery.isError && materials.length > 0 && (
        <>
          <ul className="overflow-hidden rounded-md border border-border bg-card">
            {materials.map((material) => (
              <MaterialRow
                key={material.id}
                material={material}
                classId={classDetails.id}
                canManage={canManage}
              />
            ))}
          </ul>

          {materialsQuery.hasNextPage && (
            <div className="flex justify-center pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => materialsQuery.fetchNextPage()}
                disabled={materialsQuery.isFetchingNextPage}
                className="whitespace-nowrap"
              >
                {materialsQuery.isFetchingNextPage ? "Loading…" : "Load more"}
              </Button>
            </div>
          )}
        </>
      )}

      {canManage && (
        <UploadMaterialDialog
          classId={classDetails.id}
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
        />
      )}
    </section>
  );
}
