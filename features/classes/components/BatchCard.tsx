"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Copy,
  Users,
  Edit,
  Archive,
  ArchiveRestore,
  RefreshCw,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Modal } from "@/components/ui/modal";
import { cn, extractErrorMessage } from "@/shared/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import type { ClassCard } from "@/features/classes/types";
import { EditClassForm } from "@/features/classes/components/EditClassForm";
import { ClassMembersModal } from "@/features/classes/components/ClassMembersModal";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useArchiveClass } from "@/features/classes/hooks/useArchiveClass";
import { useRestoreClass } from "@/features/classes/hooks/useRestoreClass";
import { useRegenerateJoinCode } from "@/features/classes/hooks/useRegenerateJoinCode";
import { useLeaveClass } from "@/features/classes/hooks/useLeaveClass";

interface BatchCardProps {
  batch: ClassCard;
}

const BatchCard: React.FC<BatchCardProps> = ({ batch }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const isOwner = !!user && batch.owner?._id === user.id;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);
  const [isRegenerateConfirmOpen, setIsRegenerateConfirmOpen] =
    useState(false);
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);

  const archiveClass = useArchiveClass();
  const restoreClass = useRestoreClass();
  const regenerateJoinCode = useRegenerateJoinCode();
  const leaveClass = useLeaveClass();

  const copyCodeToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(batch.code);
    toast.success("Batch code copied!");
  };

  const openBatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/class/${batch.id}`);
  };

  const openEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const openMembers = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMembersOpen(true);
  };

  const openArchiveConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsArchiveConfirmOpen(true);
  };

  const confirmArchive = () => {
    archiveClass.mutate(batch.id, {
      onSuccess: () => {
        toast.success("Class archived");
        setIsArchiveConfirmOpen(false);
      },
      onError: (error) => {
        toast.error(
          extractErrorMessage(error, "Unable to archive class."),
        );
      },
    });
  };

  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    restoreClass.mutate(batch.id, {
      onSuccess: () => toast.success("Class restored"),
      onError: (error) => {
        toast.error(
          extractErrorMessage(error, "Unable to restore class."),
        );
      },
    });
  };

  const openRegenerateConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRegenerateConfirmOpen(true);
  };

  const confirmRegenerate = () => {
    regenerateJoinCode.mutate(batch.id, {
      onSuccess: (updated) => {
        toast.success(`New join code: ${updated.code}`);
        setIsRegenerateConfirmOpen(false);
      },
      onError: (error) => {
        toast.error(
          extractErrorMessage(error, "Unable to regenerate join code."),
        );
      },
    });
  };

  const openLeaveConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLeaveConfirmOpen(true);
  };

  const confirmLeave = () => {
    leaveClass.mutate(batch.id, {
      onSuccess: () => {
        toast.success("You left the class");
        setIsLeaveConfirmOpen(false);
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to leave class."));
      },
    });
  };

  const initials = batch.name
    .split(" ")
    .filter(Boolean)
    .map((word: string) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "bg-card border border-border rounded-2xl",
        "hover:shadow-md hover:border-primary/30 hover:scale-[1.02]",
        "flex flex-col gap-0 py-0",
      )}
    >
      {/* Header: Icon, title, kebab */}
      <CardHeader className="px-6 pt-5 pb-3 grid-cols-1 grid-rows-1 gap-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm tracking-wide shrink-0">
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base  leading-tight truncate text-foreground">
                {batch.name}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground truncate mt-1">
                {batch.subject}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Batch options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={copyCodeToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openMembers}>
                <Users className="w-4 h-4 mr-2" />
                View Members
              </DropdownMenuItem>
              {isOwner && (
                <DropdownMenuItem onClick={openEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Batch
                </DropdownMenuItem>
              )}
              {isOwner && batch.status === "active" && (
                <DropdownMenuItem onClick={openRegenerateConfirm}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Code
                </DropdownMenuItem>
              )}
              {isOwner && batch.status === "active" && (
                <DropdownMenuItem onClick={openArchiveConfirm}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive Batch
                </DropdownMenuItem>
              )}
              {isOwner && batch.status === "archived" && (
                <DropdownMenuItem onClick={handleRestore}>
                  <ArchiveRestore className="w-4 h-4 mr-2" />
                  Restore Batch
                </DropdownMenuItem>
              )}
              {!isOwner && (
                <DropdownMenuItem
                  onClick={openLeaveConfirm}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave Class
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      {/* Bottom row: students + manage */}
      <CardContent className="px-6 py-4 border-t border-border/80 ">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="font-medium text-foreground">
              {batch.studentCount}
            </span>
            <span>Students</span>
          </div>

          <button
            type="button"
            onClick={openBatch}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 hover:underline"
          >
            Manage
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </CardContent>
      <EditClassForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classData={batch}
      />
      <ClassMembersModal
        isOpen={isMembersOpen}
        onClose={() => setIsMembersOpen(false)}
        batch={batch}
        isOwner={isOwner}
      />
      <Modal
        isOpen={isArchiveConfirmOpen}
        onClose={() => setIsArchiveConfirmOpen(false)}
        title="Archive this class?"
      >
        <p className="text-sm text-muted-foreground mb-6">
          Existing members keep read access, but no new posts, comments or
          join requests can be added until you restore it.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsArchiveConfirmOpen(false)}
            disabled={archiveClass.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={confirmArchive}
            disabled={archiveClass.isPending}
          >
            {archiveClass.isPending ? "Archiving..." : "Archive"}
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isRegenerateConfirmOpen}
        onClose={() => setIsRegenerateConfirmOpen(false)}
        title="Regenerate join code?"
      >
        <p className="text-sm text-muted-foreground mb-6">
          The current code (
          <code className="font-mono font-semibold">{batch.code}</code>)
          will stop working immediately. Existing members are unaffected.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsRegenerateConfirmOpen(false)}
            disabled={regenerateJoinCode.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={confirmRegenerate}
            disabled={regenerateJoinCode.isPending}
          >
            {regenerateJoinCode.isPending ? "Regenerating..." : "Regenerate"}
          </Button>
        </div>
      </Modal>
      <Modal
        isOpen={isLeaveConfirmOpen}
        onClose={() => setIsLeaveConfirmOpen(false)}
        title="Leave this class?"
      >
        <p className="text-sm text-muted-foreground mb-6">
          You&apos;ll lose access until you rejoin with the class code.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsLeaveConfirmOpen(false)}
            disabled={leaveClass.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={confirmLeave}
            disabled={leaveClass.isPending}
          >
            {leaveClass.isPending ? "Leaving..." : "Leave"}
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default BatchCard;
