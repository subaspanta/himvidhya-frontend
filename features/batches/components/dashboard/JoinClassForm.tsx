"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/text-field";
import { Modal } from "@/components/ui/modal";

interface JoinClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (batchCode: string) => void;
  isLoading?: boolean;
}

export function JoinClassForm({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: JoinClassFormProps) {
  const [batchCode, setBatchCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(batchCode);
  };

  const handleClose = () => {
    setBatchCode("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Class">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextField
            name="batchCode"
            label="Enter batch code"
            placeholder="e.g., ABC123XYZ"
            value={batchCode}
            onChange={(e) => setBatchCode(e.target.value)}
            required
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Ask your CR or teacher for the code
          </p>
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
            {isLoading ? "Joining..." : "Join Now"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
