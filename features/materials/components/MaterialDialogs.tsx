"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import TextField from "@/components/ui/text-field";
import { extractErrorMessage } from "@/shared/utils";
import { validateMaterialFile } from "../constants";
import { useCreateMaterial } from "../hooks/useCreateMaterial";
import { useDeleteMaterial } from "../hooks/useDeleteMaterial";
import { useUpdateMaterial } from "../hooks/useUpdateMaterial";
import type { Material } from "../types";
import { MaterialFileField } from "./MaterialFileField";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadMaterialDialog({
  classId,
  isOpen,
  onClose,
}: DialogProps & { classId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const createMaterial = useCreateMaterial(classId);

  const resetAndClose = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setFileError(null);
    setFormError(null);
    onClose();
  };

  const handleFile = (nextFile: File | null) => {
    setFile(nextFile);
    setFileError(nextFile ? validateMaterialFile(nextFile) : null);
    if (nextFile && !title) {
      setTitle(nextFile.name.replace(/\.[^.]+$/, ""));
    }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    if (!title.trim()) {
      setFormError("Enter a title for this material.");
      return;
    }
    if (!file) {
      setFileError("Choose a file to upload.");
      return;
    }
    const validationError = validateMaterialFile(file);
    if (validationError) {
      setFileError(validationError);
      return;
    }

    try {
      await createMaterial.mutateAsync({
        file,
        title: title.trim(),
        description: description.trim() || undefined,
      });
      resetAndClose();
    } catch (error) {
      setFormError(
        extractErrorMessage(error, "The material could not be uploaded. Try again."),
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={createMaterial.isPending ? () => {} : resetAndClose}
      title="Add material"
    >
      <form onSubmit={submit} className="space-y-4">
        <MaterialFileField
          file={file}
          onChange={handleFile}
          error={fileError}
          disabled={createMaterial.isPending}
        />
        <TextField
          name="material-title"
          label="Title"
          required
          maxLength={200}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={createMaterial.isPending}
        />
        <div className="space-y-2">
          <label htmlFor="material-description" className="block text-sm font-medium">
            Description <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="material-description"
            maxLength={1000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={createMaterial.isPending}
            className="min-h-28 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <p aria-live="polite" className="min-h-5 text-sm text-destructive">
          {formError ?? ""}
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={resetAndClose}
            disabled={createMaterial.isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={createMaterial.isPending}>
            {createMaterial.isPending ? "Uploading…" : "Upload material"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function EditMaterialDialog({
  material,
  classId,
  isOpen,
  onClose,
}: DialogProps & { material: Material; classId: string }) {
  const [title, setTitle] = useState(material.title);
  const [description, setDescription] = useState(material.description);
  const [formError, setFormError] = useState<string | null>(null);
  const updateMaterial = useUpdateMaterial(classId);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setFormError("Enter a title for this material.");
      return;
    }
    try {
      await updateMaterial.mutateAsync({
        materialId: material.id,
        title: title.trim(),
        description: description.trim(),
      });
      onClose();
    } catch (error) {
      setFormError(
        extractErrorMessage(error, "The material details could not be saved. Try again."),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={updateMaterial.isPending ? () => {} : onClose} title="Edit material">
      <form onSubmit={submit} className="space-y-4">
        <TextField
          name={`material-title-${material.id}`}
          label="Title"
          required
          maxLength={200}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={updateMaterial.isPending}
        />
        <div className="space-y-2">
          <label htmlFor={`material-description-${material.id}`} className="block text-sm font-medium">
            Description <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id={`material-description-${material.id}`}
            maxLength={1000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={updateMaterial.isPending}
            className="min-h-28 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <p aria-live="polite" className="min-h-5 text-sm text-destructive">
          {formError ?? ""}
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={updateMaterial.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateMaterial.isPending}>
            {updateMaterial.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function ReplaceMaterialDialog({
  material,
  classId,
  isOpen,
  onClose,
}: DialogProps & { material: Material; classId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const updateMaterial = useUpdateMaterial(classId);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      setFileError("Choose the replacement file.");
      return;
    }
    const validationError = validateMaterialFile(file);
    if (validationError) {
      setFileError(validationError);
      return;
    }
    try {
      await updateMaterial.mutateAsync({
        materialId: material.id,
        replacementFile: file,
      });
      onClose();
    } catch (error) {
      setFormError(
        extractErrorMessage(error, "The file could not be replaced. Try again."),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={updateMaterial.isPending ? () => {} : onClose} title="Replace file">
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-muted-foreground">
          The new file will replace <span className="font-medium text-foreground">{material.fileName}</span>.
          The title and description will stay the same.
        </p>
        <MaterialFileField
          file={file}
          onChange={(nextFile) => {
            setFile(nextFile);
            setFileError(nextFile ? validateMaterialFile(nextFile) : null);
          }}
          error={fileError}
          disabled={updateMaterial.isPending}
          label="Replacement file"
        />
        <p aria-live="polite" className="min-h-5 text-sm text-destructive">
          {formError ?? ""}
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={updateMaterial.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateMaterial.isPending}>
            {updateMaterial.isPending ? "Replacing…" : "Replace file"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export function DeleteMaterialDialog({
  material,
  classId,
  isOpen,
  onClose,
}: DialogProps & { material: Material; classId: string }) {
  const [formError, setFormError] = useState<string | null>(null);
  const deleteMaterial = useDeleteMaterial(classId);

  const remove = async () => {
    setFormError(null);
    try {
      await deleteMaterial.mutateAsync(material.id);
      onClose();
    } catch (error) {
      setFormError(
        extractErrorMessage(error, "The material could not be deleted. Try again."),
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={deleteMaterial.isPending ? () => {} : onClose} title="Delete material">
      <div className="space-y-5">
        <p className="text-sm text-foreground">
          Delete <span className="font-medium">{material.title}</span>? The file and its class record will be permanently removed.
        </p>
        <p aria-live="polite" className="min-h-5 text-sm text-destructive">
          {formError ?? ""}
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={deleteMaterial.isPending}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={remove} disabled={deleteMaterial.isPending}>
            {deleteMaterial.isPending ? "Deleting…" : "Delete material"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
