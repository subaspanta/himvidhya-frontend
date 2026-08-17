"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/shared/loading/Spinner";
import { useClassMembers } from "@/features/home/hooks/useClassMembers";
import { useRemoveClassMember } from "@/features/home/hooks/useRemoveClassMember";
import type { ClassCard } from "../../types";

interface ClassMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: ClassCard;
  isOwner: boolean;
}

function extractErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as { message?: string } | undefined)?.message ||
      error.message
    );
  }
  return fallback;
}

export function ClassMembersModal({
  isOpen,
  onClose,
  batch,
  isOwner,
}: ClassMembersModalProps) {
  const {
    data: members,
    isLoading,
    isError,
  } = useClassMembers(batch.id, { enabled: isOpen });

  const removeMember = useRemoveClassMember();
  const [confirmingUserId, setConfirmingUserId] = useState<string | null>(
    null,
  );

  const handleRemove = (userId: string) => {
    removeMember.mutate(
      { classId: batch.id, userId },
      {
        onSuccess: () => {
          toast.success("Member removed");
          setConfirmingUserId(null);
        },
        onError: (error) => {
          toast.error(
            extractErrorMessage(error, "Unable to remove member."),
          );
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Class Members">
      <div className="space-y-1">
        {/* The roster endpoint returns students only (C2: the owner is
            never a ClassMember) — the teacher is composed in here from
            the card's own owner field. */}
        {batch.owner && (
          <div className="flex items-center justify-between py-2 border-b border-border mb-2">
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">
                {batch.owner.name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {batch.owner.email}
              </p>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary shrink-0 ml-3">
              Teacher
            </span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-6">
            <Spinner size={24} />
          </div>
        )}

        {isError && (
          <p className="text-sm text-danger py-4">
            Unable to load members. Please try again.
          </p>
        )}

        {!isLoading && !isError && members?.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">
            No students have joined this class yet.
          </p>
        )}

        {!isLoading && !isError && members && members.length > 0 && (
          <ul className="divide-y divide-border">
            {members.map((member) => (
              <li key={member.user._id} className="py-2">
                {confirmingUserId === member.user._id ? (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-foreground min-w-0">
                      Remove {member.user.name}?
                    </p>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmingUserId(null)}
                        disabled={removeMember.isPending}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemove(member.user._id)}
                        disabled={removeMember.isPending}
                      >
                        {removeMember.isPending ? "Removing..." : "Remove"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {member.user.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {member.user.email}
                      </p>
                    </div>
                    {isOwner && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 ml-3"
                        onClick={() => setConfirmingUserId(member.user._id)}
                        aria-label={`Remove ${member.user.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
