"use client";

import { useState } from "react";
import {
  Download,
  FileImage,
  FileSpreadsheet,
  FileText,
  MoreHorizontal,
  Pencil,
  Presentation,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { extractErrorMessage, formatFileSize } from "@/shared/utils";
import { useDownloadMaterial } from "../hooks/useDownloadMaterial";
import type { Material } from "../types";
import {
  DeleteMaterialDialog,
  EditMaterialDialog,
  ReplaceMaterialDialog,
} from "./MaterialDialogs";
import styles from "./MaterialsPanel.module.css";

interface MaterialRowProps {
  material: Material;
  classId: string;
  canManage: boolean;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function MaterialIcon({ mimeType }: { mimeType: string }) {
  const className = "size-5";
  if (mimeType.startsWith("image/")) return <FileImage className={className} />;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) {
    return <FileSpreadsheet className={className} />;
  }
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) {
    return <Presentation className={className} />;
  }
  return <FileText className={className} />;
}

export function MaterialRow({ material, classId, canManage }: MaterialRowProps) {
  const [dialog, setDialog] = useState<"edit" | "replace" | "delete" | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const downloadMaterial = useDownloadMaterial();

  const download = async () => {
    setDownloadError(null);
    try {
      await downloadMaterial.mutateAsync(material.id);
    } catch (error) {
      setDownloadError(
        extractErrorMessage(error, "The download could not be prepared. Try again."),
      );
    }
  };

  return (
    <li className={`${styles.materialRow} px-3 py-4 sm:px-4`}>
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary-subtle text-primary">
            <MaterialIcon mimeType={material.mimeType} />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="text-base font-bold leading-snug text-foreground">
              {material.title}
            </h3>
            {material.description && (
              <p className="max-w-prose whitespace-pre-wrap text-sm text-foreground-secondary">
                {material.description}
              </p>
            )}
            <p className="break-all text-sm text-muted-foreground">
              {material.fileName}
            </p>
            <p className="text-sm tabular-nums text-muted-foreground">
              {formatFileSize(material.size)} · Added by {material.uploadedBy.name} ·{" "}
              <time dateTime={material.createdAt}>
                {dateFormatter.format(new Date(material.createdAt))}
              </time>
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={download}
            disabled={downloadMaterial.isPending}
            className="min-h-11 whitespace-nowrap"
          >
            <Download aria-hidden />
            {downloadMaterial.isPending ? "Preparing…" : "Download"}
          </Button>

          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Manage ${material.title}`}
                  className="size-11"
                >
                  <MoreHorizontal aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onSelect={() => setDialog("edit")}>
                  <Pencil aria-hidden />
                  Edit details
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setDialog("replace")}>
                  <RefreshCw aria-hidden />
                  Replace file
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setDialog("delete")}
                >
                  <Trash2 aria-hidden />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-2 min-h-0 text-sm text-destructive">
        {downloadError ?? ""}
      </p>

      {dialog === "edit" && (
        <EditMaterialDialog
          material={material}
          classId={classId}
          isOpen
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === "replace" && (
        <ReplaceMaterialDialog
          material={material}
          classId={classId}
          isOpen
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === "delete" && (
        <DeleteMaterialDialog
          material={material}
          classId={classId}
          isOpen
          onClose={() => setDialog(null)}
        />
      )}
    </li>
  );
}
