"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { Modal } from "@/components/ui/modal";
import { useUpdateClass } from "@/features/classes/hooks/useUpdateClass";
import type { ClassCard } from "../types";

const editClassSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Class name cannot be empty")
    .max(100, "Class name cannot exceed 100 characters"),
  subject: z
    .string()
    .trim()
    .max(100, "Subject cannot exceed 100 characters")
    .optional(),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  college: z.string().trim().optional(),
  semester: z.string().trim().optional(),
});

type EditClassFormData = z.infer<typeof editClassSchema>;

interface EditClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  classData: ClassCard;
}

export function EditClassForm({
  isOpen,
  onClose,
  classData,
}: EditClassFormProps) {
  const { mutateAsync: updateClass, isPending } = useUpdateClass();

  const defaultValues: EditClassFormData = {
    name: classData.name,
    subject: classData.subject ?? "",
    description: classData.description ?? "",
    college: classData.college ?? "",
    semester: classData.semester ?? "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    reset,
    setError,
  } = useForm<EditClassFormData>({
    mode: "onChange",
    resolver: zodResolver(editClassSchema),
    defaultValues,
  });

  const isBusy = isPending || isSubmitting;

  const submitEdit = async (data: EditClassFormData) => {
    // Only fields the user actually touched go to the server — an
    // untouched field must never overwrite its stored value with a
    // stale form default.
    const changedKeys = Object.keys(dirtyFields) as Array<
      keyof EditClassFormData
    >;

    if (changedKeys.length === 0) {
      onClose();
      return;
    }

    const payload = changedKeys.reduce<Record<string, string>>((acc, key) => {
      acc[key] = data[key] ?? "";
      return acc;
    }, {});

    try {
      await updateClass({ classId: classData.id, data: payload });
      toast.success("Class updated");
      onClose();
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)
              ?.message || error.message
          : "Unable to update class. Please try again.";

      setError("root", {
        type: "server",
        message,
      });
      toast.error(message);
    }
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Class">
      <form onSubmit={handleSubmit(submitEdit)} className="space-y-4">
        <TextField
          label="Class name"
          required
          disabled={isBusy}
          error={errors.name?.message}
          {...register("name")}
        />

        <TextField
          label="Subject"
          disabled={isBusy}
          error={errors.subject?.message}
          {...register("subject")}
        />

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            disabled={isBusy}
            className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
            {...register("description")}
          />
          {errors.description?.message && (
            <p className="text-sm text-danger mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <TextField
          label="College"
          disabled={isBusy}
          error={errors.college?.message}
          {...register("college")}
        />

        <TextField
          label="Semester"
          disabled={isBusy}
          error={errors.semester?.message}
          {...register("semester")}
        />

        {errors.root?.message && (
          <p className="text-sm text-danger">{errors.root.message}</p>
        )}

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isBusy}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isBusy || !isDirty}>
            {isBusy ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
