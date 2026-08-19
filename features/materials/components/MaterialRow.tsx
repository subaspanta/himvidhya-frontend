"use client";

import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  Presentation,
  File as FileIcon,
  Download,
  Trash2,
  Pencil,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractErrorMessage } from "@/shared/utils";
import { useDownloadMaterial } from "../hooks/useDownloadMaterial";
import { useUpdateMaterial } from "../hooks/useUpdateMaterial";
import { useReplaceMaterial } from "../hooks/useReplaceMaterial";
import { useDeleteMaterial } from "../hooks/useDeleteMaterial";
import { formatFileSize, validateMaterialFile } from "../constants";
import type { Material } from "../types";

// A real declared component (not a runtime-selected reference) so the
// icon choice can switch on mimeType without violating the
// components-must-not-be-created-during-render rule.
function MaterialIcon({ mimeType, className }: { mimeType: string; className?: string }) {
  if (mimeType === "application/pdf" || mimeType.includes("word")) {
    return <FileText className={className} />;
  }
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) {
    return <Presentation className={className} />;
  }
  if (mimeType.includes("sheet") || mimeType.includes("excel")) {
    return <FileSpreadsheet className={className} />;
  }
  if (mimeType.startsWith("image/")) {
    return <FileImage className={className} />;
  }
  return <FileIcon className={className} />;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

interface MaterialRowProps {
  material: Material;
  classId: string;
  isOwner: boolean;
}

export function MaterialRow({ material, classId, isOwner }: MaterialRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(material.title);
  const [descriptionDraft, setDescriptionDraft] = useState(material.description);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const download = useDownloadMaterial();
  const updateMaterial = useUpdateMaterial(classId);
  const replaceMaterial = useReplaceMaterial(classId);
  const deleteMaterial = useDeleteMaterial(classId);

  const handleDownload = () => {
    download.mutate(material.id, {
      onSuccess: ({ downloadUrl }) => {
        window.open(downloadUrl, "_blank", "noopener,noreferrer");
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to get download link."));
      },
    });
  };

  const startEdit = () => {
    setTitleDraft(material.title);
    setDescriptionDraft(material.description);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const title = titleDraft.trim();
    if (!title) {
      toast.error("Title cannot be empty");
      return;
    }
    updateMaterial.mutate(
      { materialId: material.id, data: { title, description: descriptionDraft.trim() } },
      {
        onSuccess: () => setIsEditing(false),
        onError: (error) => {
          toast.error(extractErrorMessage(error, "Unable to update material."));
        },
      },
    );
  };

  const handleReplaceFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const validationError = validateMaterialFile(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    replaceMaterial.mutate(
      { materialId: material.id, file },
      {
        onSuccess: () => toast.success("File replaced"),
        onError: (error) => {
          toast.error(extractErrorMessage(error, "Unable to replace file."));
        },
      },
    );
  };

  const confirmDelete = () => {
    deleteMaterial.mutate(material.id, {
      onSuccess: () => toast.success("Material deleted"),
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to delete material."));
        setIsConfirmingDelete(false);
      },
    });
  };

  if (isEditing) {
    return (
      <div className="py-3 border-b border-border last:border-b-0 space-y-2">
        <input
          value={titleDraft}
          onChange={(e) => setTitleDraft(e.target.value)}
          disabled={updateMaterial.isPending}
          autoFocus
          className="w-full h-9 px-3 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        />
        <textarea
          value={descriptionDraft}
          onChange={(e) => setDescriptionDraft(e.target.value)}
          disabled={updateMaterial.isPending}
          placeholder="Description (optional)"
          className="w-full min-h-[52px] px-3 py-1.5 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-vertical"
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(false)}
            disabled={updateMaterial.isPending}
          >
            Cancel
          </Button>
          <Button type="button" size="sm" onClick={saveEdit} disabled={updateMaterial.isPending}>
            {updateMaterial.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <MaterialIcon mimeType={material.mimeType} className="w-4.5 h-4.5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{material.title}</p>
        {material.description && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{material.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formatFileSize(material.size)} &middot; {material.uploadedBy.name} &middot;{" "}
          {formatDate(material.createdAt)}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={handleDownload}
          disabled={download.isPending}
          aria-label={`Download ${material.title}`}
        >
          <Download className="w-4 h-4" />
        </Button>

        {isOwner && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={startEdit}
              aria-label={`Edit ${material.title}`}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <input
              ref={replaceInputRef}
              type="file"
              className="sr-only"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={handleReplaceFile}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => replaceInputRef.current?.click()}
              disabled={replaceMaterial.isPending}
              aria-label={`Replace file for ${material.title}`}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>

            {isConfirmingDelete ? (
              <div className="flex items-center gap-1.5 pl-1">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={confirmDelete}
                  disabled={deleteMaterial.isPending}
                >
                  {deleteMaterial.isPending ? "Deleting..." : "Confirm"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsConfirmingDelete(false)}
                  disabled={deleteMaterial.isPending}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => setIsConfirmingDelete(true)}
                aria-label={`Delete ${material.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
