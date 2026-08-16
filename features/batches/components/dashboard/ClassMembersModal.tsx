"use client";

import { Modal } from "@/components/ui/modal";
import { Spinner } from "@/shared/loading/Spinner";
import { useClassMembers } from "@/features/home/hooks/useClassMembers";
import type { ClassCard } from "../../types";

interface ClassMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: ClassCard;
}

export function ClassMembersModal({
  isOpen,
  onClose,
  batch,
}: ClassMembersModalProps) {
  const {
    data: members,
    isLoading,
    isError,
  } = useClassMembers(batch.id, { enabled: isOpen });

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
              <li
                key={member.user._id}
                className="flex items-center justify-between py-2"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {member.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {member.user.email}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
