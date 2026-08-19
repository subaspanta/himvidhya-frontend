"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { extractErrorMessage } from "@/shared/utils";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { useDeleteComment } from "../hooks/useDeleteComment";
import type { Comment } from "../types";

interface CommentItemProps {
  comment: Comment;
  postId: string;
  isAuthor: boolean;
  canModerate: boolean;
}

export function CommentItem({ comment, postId, isAuthor, canModerate }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const updateComment = useUpdateComment(postId);
  const deleteComment = useDeleteComment(postId);

  const isDeleted = Boolean(comment.deletedAt);
  const canDelete = isAuthor || canModerate;

  const startEdit = () => {
    setDraft(comment.content);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const content = draft.trim();
    if (!content) {
      toast.error("Comment cannot be empty");
      return;
    }
    updateComment.mutate(
      { commentId: comment.id, data: { content } },
      {
        onSuccess: () => setIsEditing(false),
        onError: (error) => {
          toast.error(extractErrorMessage(error, "Unable to update comment."));
        },
      },
    );
  };

  const confirmDelete = () => {
    deleteComment.mutate(comment.id, {
      onSuccess: () => setIsConfirmingDelete(false),
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to delete comment."));
      },
    });
  };

  return (
    <div className="flex items-start gap-2.5 py-2">
      <Avatar className="w-7 h-7 shrink-0">
        {comment.authorId.avatar ? (
          <AvatarImage src={comment.authorId.avatar} alt={comment.authorId.name} />
        ) : (
          <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
            {comment.authorId.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground">{comment.authorId.name}</span>
          {comment.authorId.role === "teacher" && (
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-full bg-primary-subtle text-primary">
              Teacher
            </span>
          )}
        </div>

        {isDeleted ? (
          <p className="text-sm text-muted-foreground italic mt-0.5">
            This comment has been deleted.
          </p>
        ) : isEditing ? (
          <div className="mt-1 flex flex-col gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={updateComment.isPending}
              autoFocus
              className="w-full min-h-[52px] px-2.5 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-vertical"
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
                disabled={updateComment.isPending}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={saveEdit} disabled={updateComment.isPending}>
                {updateComment.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground whitespace-pre-wrap mt-0.5 max-w-prose">{comment.content}</p>
        )}

        {!isDeleted && !isEditing && (isAuthor || canDelete) && (
          <div className="flex items-center gap-3 mt-1">
            {isAuthor && (
              <button
                type="button"
                onClick={startEdit}
                className="text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                Edit
              </button>
            )}
            {canDelete &&
              (isConfirmingDelete ? (
                <span className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Delete comment?</span>
                  <button
                    type="button"
                    onClick={confirmDelete}
                    disabled={deleteComment.isPending}
                    className="text-xs font-medium text-destructive hover:text-destructive/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded disabled:opacity-50"
                  >
                    {deleteComment.isPending ? "Deleting..." : "Confirm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConfirmingDelete(false)}
                    disabled={deleteComment.isPending}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    Cancel
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(true)}
                  className="text-xs font-medium text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Delete
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
