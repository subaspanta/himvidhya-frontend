"use client";

import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import TextField from "@/components/ui/text-field";
import { cn } from "@/shared/utils";
import { useUploadMaterial } from "../hooks/useUploadMaterial";
import {
  validateMaterialFile,
  formatFileSize,
  ALLOWED_FILE_EXTENSIONS_LABEL,
} from "../constants";

const uploadMetaSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
});

type UploadMetaFormData = z.infer<typeof uploadMetaSchema>;

interface UploadMaterialFormProps {
  classId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function UploadMaterialForm({ classId, isOpen, onClose }: UploadMaterialFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { mutateAsync: uploadMaterial, isPending } = useUploadMaterial(classId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UploadMetaFormData>({
    mode: "onSubmit",
    resolver: zodResolver(uploadMetaSchema),
    defaultValues: { title: "", description: "" },
  });

  const isBusy = isPending || isSubmitting;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) {
      setFile(null);
      setFileError(null);
      return;
    }

    const validationError = validateMaterialFile(selected);
    if (validationError) {
      setFile(null);
      setFileError(validationError);
      e.target.value = "";
      return;
    }

    setFile(selected);
    setFileError(null);
    if (!getValues("title")) {
      setValue("title", selected.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const closeAndReset = () => {
    setFile(null);
    setFileError(null);
    reset({ title: "", description: "" });
    onClose();
  };

  const submitUpload = async (data: UploadMetaFormData) => {
    if (!file) {
      setFileError("Please choose a file to upload.");
      return;
    }
    try {
      await uploadMaterial({ file, title: data.title, description: data.description });
      toast.success("Material uploaded");
      closeAndReset();
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)
              ?.message || error.message
          : "Unable to upload material. Please try again.";
      toast.error(message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset} title="Upload Material">
      <form onSubmit={handleSubmit(submitUpload)} className="space-y-4">
        <div>
          <label htmlFor="material-file" className="block text-sm font-medium mb-1">
            File <span className="text-destructive">*</span>
          </label>
          <label
            htmlFor="material-file"
            className={cn(
              "flex items-center gap-3 px-4 py-3 border border-dashed rounded-md cursor-pointer transition-colors",
              "border-border hover:border-primary/50 hover:bg-accent-subtle/40",
              fileError && "border-destructive",
            )}
          >
            <UploadCloud className="w-5 h-5 text-muted-foreground shrink-0" />
            {file ? (
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-foreground truncate">
                  {file.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </span>
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Click to choose a file (max 25 MB)
              </span>
            )}
          </label>
          <input
            id="material-file"
            type="file"
            className="sr-only"
            disabled={isBusy}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg"
          />
          {fileError ? (
            <p className="text-sm text-destructive mt-1">{fileError}</p>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">{ALLOWED_FILE_EXTENSIONS_LABEL}</p>
          )}
        </div>

        <TextField
          label="Title"
          required
          disabled={isBusy}
          error={errors.title?.message}
          {...register("title")}
        />

        <div>
          <label htmlFor="material-description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="material-description"
            disabled={isBusy}
            className="w-full min-h-[80px] px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={closeAndReset} disabled={isBusy}>
            Cancel
          </Button>
          <Button type="submit" disabled={isBusy}>
            {isBusy ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
