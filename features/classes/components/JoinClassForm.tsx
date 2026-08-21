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
import { useJoinClass } from "@/features/classes/hooks/useJoinClass";

const joinClassSchema = z.object({
  batchCode: z
    .string()
    .trim()
    .min(6, "Class code must be at least 6 characters.")
    .max(10, "Class code cannot exceed 10 characters.")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Class code can only contain letters and numbers.",
    ),
});

type JoinClassFormData = z.infer<typeof joinClassSchema>;

interface JoinClassFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinClassForm({ isOpen, onClose }: JoinClassFormProps) {
  const { mutateAsync: joinClass, isPending } = useJoinClass();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<JoinClassFormData>({
    mode: "onChange",
    resolver: zodResolver(joinClassSchema),
    defaultValues: {
      batchCode: "",
    },
  });

  const isBusy = isPending || isSubmitting;

  const submitJoinCode = async (data: JoinClassFormData) => {
    try {
      const normalizedCode = data.batchCode.trim().toUpperCase();
      await joinClass(normalizedCode);

      toast.success("Join request submitted. Waiting for teacher approval.");
      reset();
      onClose();
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)
              ?.message || error.message
          : "Unable to send join request. Please try again.";

      setError("root", {
        type: "server",
        message,
      });
      toast.error(message);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Class">
      <form onSubmit={handleSubmit(submitJoinCode)} className="space-y-4">
        <div>
          <TextField
            label="Enter class code"
            placeholder="e.g., ABC123XYZ"
            maxLength={10}
            required
            disabled={isBusy}
            error={errors.batchCode?.message}
            autoCapitalize="characters"
            autoCorrect="off"
            {...register("batchCode", {
              setValueAs: (value) =>
                typeof value === "string"
                  ? value.replace(/\s+/g, "").toUpperCase()
                  : value,
            })}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Ask your CR or teacher for the code
          </p>
        </div>

        {errors.root?.message && (
          <p className="text-sm text-destructive">{errors.root.message}</p>
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
          <Button type="submit" disabled={isBusy || !!errors.batchCode}>
            {isBusy ? "Joining..." : "Join Now"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
