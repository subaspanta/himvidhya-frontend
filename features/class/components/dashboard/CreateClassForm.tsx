"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { Modal } from "@/components/ui/modal";

interface CreateClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    subject: string;
    description: string;
  }) => void;
  isLoading?: boolean;
}

export function CreateClassForm({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateClassFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({ name: "", subject: "", description: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Class">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Class Name <span className="text-danger">*</span>
          </label>
          <TextField
            id="name"
            placeholder="e.g., Advanced Mathematics"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject <span className="text-danger">*</span>
          </label>
          <TextField
            id="subject"
            placeholder="e.g., Mathematics"
            value={formData.subject}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, subject: e.target.value }))
            }
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Brief description of the class..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            disabled={isLoading}
            className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
          />
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Class"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
