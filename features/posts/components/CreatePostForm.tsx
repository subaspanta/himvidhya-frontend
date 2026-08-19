"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Paperclip, Link2, Youtube, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TextField from "@/components/ui/text-field";
import { extractErrorMessage } from "@/shared/utils";
import { useCreatePost } from "../hooks/useCreatePost";
import { useUploadPostAttachment } from "../hooks/useUploadPostAttachment";
import { useDiscardPostAttachmentUpload } from "../hooks/useDiscardPostAttachmentUpload";
import {
  validateAttachmentFile,
  extractYoutubeThumbnail,
  MAX_POST_ATTACHMENTS,
} from "../constants";
import type { PostAttachmentInput } from "../api/posts.api";

const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(10000, "Content cannot exceed 10000 characters"),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

// Composer-local draft shape, distinct from PostAttachment (../types): a
// draft has no _id yet -- that's only assigned once the announcement is
// created and the attachment is resolved server-side.
type DraftAttachment =
  | { localId: string; type: "file"; fileName: string; storageKey: string }
  | { localId: string; type: "link"; url: string }
  | { localId: string; type: "youtube"; url: string; thumbnailUrl: string };

type LinkDraft = { kind: "link" | "youtube"; value: string };

interface CreatePostFormProps {
  classId: string;
}

export function CreatePostForm({ classId }: CreatePostFormProps) {
  const [attachments, setAttachments] = useState<DraftAttachment[]>([]);
  const [linkDraft, setLinkDraft] = useState<LinkDraft | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: createPost, isPending } = useCreatePost(classId);
  const { mutateAsync: uploadAttachment, isPending: isUploading } =
    useUploadPostAttachment(classId);
  const { mutate: discardAttachmentUpload } = useDiscardPostAttachmentUpload(classId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<CreatePostFormData>({
    mode: "onSubmit",
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "" },
  });

  const isBusy = isPending || isSubmitting || isUploading;

  const removeAttachment = (localId: string) => {
    setAttachments((prev) => {
      const removed = prev.find((attachment) => attachment.localId === localId);
      // Fire-and-forget: the file was already PUT to storage on select, so
      // removing it here would otherwise leave an orphan (best-effort,
      // logged server-side -- nothing useful to show the user on failure).
      if (removed?.type === "file") {
        discardAttachmentUpload(removed.storageKey);
      }
      return prev.filter((attachment) => attachment.localId !== localId);
    });
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    for (const file of files) {
      if (attachments.length >= MAX_POST_ATTACHMENTS) {
        toast.error(`Cannot attach more than ${MAX_POST_ATTACHMENTS} items`);
        break;
      }
      const validationError = validateAttachmentFile(file);
      if (validationError) {
        toast.error(validationError);
        continue;
      }
      try {
        const uploaded = await uploadAttachment(file);
        setAttachments((prev) => [
          ...prev,
          {
            localId: crypto.randomUUID(),
            type: "file",
            fileName: uploaded.fileName,
            storageKey: uploaded.storageKey,
          },
        ]);
      } catch (error) {
        toast.error(extractErrorMessage(error, "Unable to upload file."));
      }
    }
  };

  const confirmLinkDraft = () => {
    if (!linkDraft) return;
    const value = linkDraft.value.trim();
    if (!value) {
      setLinkDraft(null);
      return;
    }
    if (!/^https?:\/\//i.test(value)) {
      toast.error("Enter a valid URL");
      return;
    }
    try {
      new URL(value);
    } catch {
      toast.error("Enter a valid URL");
      return;
    }

    if (linkDraft.kind === "youtube") {
      const thumbnailUrl = extractYoutubeThumbnail(value);
      if (!thumbnailUrl) {
        toast.error("Enter a valid YouTube URL");
        return;
      }
      setAttachments((prev) => [
        ...prev,
        { localId: crypto.randomUUID(), type: "youtube", url: value, thumbnailUrl },
      ]);
    } else {
      setAttachments((prev) => [
        ...prev,
        { localId: crypto.randomUUID(), type: "link", url: value },
      ]);
    }
    setLinkDraft(null);
  };

  const submitPost = async (data: CreatePostFormData) => {
    try {
      const attachmentsPayload: PostAttachmentInput[] = attachments.map((attachment) =>
        attachment.type === "file"
          ? { type: "file", storageKey: attachment.storageKey, fileName: attachment.fileName }
          : { type: attachment.type, url: attachment.url },
      );

      await createPost(
        attachmentsPayload.length > 0 ? { ...data, attachments: attachmentsPayload } : data,
      );
      toast.success("Announcement posted");
      reset({ title: "", content: "" });
      setAttachments([]);
      setLinkDraft(null);
    } catch (error) {
      const message = extractErrorMessage(
        error,
        "Unable to post announcement. Please try again.",
      );
      setError("root", { type: "server", message });
      toast.error(message);
    }
  };

  return (
    <Card className="p-5">
      <form onSubmit={handleSubmit(submitPost)} className="space-y-4">
        <TextField
          label="Title"
          required
          disabled={isBusy}
          error={errors.title?.message}
          {...register("title")}
        />

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            placeholder="Announce something to your class"
            disabled={isBusy}
            className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
            {...register("content")}
          />
          {errors.content?.message && (
            <p className="text-sm text-destructive mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {attachments.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {attachments.map((attachment) => (
              <li
                key={attachment.localId}
                className="flex items-center gap-2 pl-3 pr-2 py-1.5 border border-border rounded-md text-sm bg-accent-subtle/30 max-w-[220px]"
              >
                {attachment.type === "youtube" ? (
                  // eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, small composer preview
                  <img
                    src={attachment.thumbnailUrl}
                    alt=""
                    className="w-6 h-6 rounded object-cover shrink-0"
                  />
                ) : attachment.type === "file" ? (
                  <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                )}
                <span className="truncate text-foreground">
                  {attachment.type === "file" ? attachment.fileName : attachment.url}
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(attachment.localId)}
                  disabled={isBusy}
                  aria-label="Remove attachment"
                  className="shrink-0 text-muted-foreground hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded disabled:opacity-50"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {linkDraft && (
          <div className="flex gap-2">
            <label htmlFor="attachment-url" className="sr-only">
              {linkDraft.kind === "youtube" ? "YouTube link" : "Link"}
            </label>
            <input
              id="attachment-url"
              type="url"
              autoFocus
              value={linkDraft.value}
              onChange={(event) => setLinkDraft({ ...linkDraft, value: event.target.value })}
              placeholder={linkDraft.kind === "youtube" ? "Paste a YouTube link" : "Paste a link"}
              className="flex-1 px-3 py-1.5 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="button" size="sm" onClick={confirmLinkDraft}>
              Add
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setLinkDraft(null)}>
              Cancel
            </Button>
          </div>
        )}

        {errors.root?.message && (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              disabled={isBusy}
              onChange={handleFileSelect}
              aria-label="Attach files"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBusy}
              aria-label="Attach a file"
              title="Attach a file"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent-subtle/40 rounded-md transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLinkDraft({ kind: "link", value: "" })}
              disabled={isBusy}
              aria-label="Attach a link"
              title="Attach a link"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent-subtle/40 rounded-md transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Link2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setLinkDraft({ kind: "youtube", value: "" })}
              disabled={isBusy}
              aria-label="Attach a YouTube video"
              title="Attach a YouTube video"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent-subtle/40 rounded-md transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Youtube className="w-4 h-4" />
            </button>
          </div>

          <Button type="submit" disabled={isBusy}>
            {isBusy ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
