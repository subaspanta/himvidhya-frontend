"use client";

import { FileText, Link2, Download } from "lucide-react";
import toast from "react-hot-toast";
import { formatFileSize, extractErrorMessage } from "@/shared/utils";
import { useDownloadPostAttachment } from "../hooks/useDownloadPostAttachment";
import type { PostAttachment } from "../types";

interface PostAttachmentsProps {
  postId: string;
  attachments: PostAttachment[];
}

// Read-only attachment previews for a posted announcement. File bytes are
// never linked directly (ADR-0005) -- clicking one fetches a fresh,
// short-lived download URL on demand.
export function PostAttachments({ postId, attachments }: PostAttachmentsProps) {
  const { mutate: getDownloadUrl, isPending } = useDownloadPostAttachment(postId);

  if (attachments.length === 0) return null;

  const openFile = (attachmentId: string) => {
    getDownloadUrl(attachmentId, {
      onSuccess: ({ downloadUrl }) => {
        window.open(downloadUrl, "_blank", "noopener,noreferrer");
      },
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to open file."));
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((attachment) => {
        if (attachment.type === "file") {
          return (
            <button
              key={attachment._id}
              type="button"
              onClick={() => openFile(attachment._id)}
              disabled={isPending}
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent-subtle/40 transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate max-w-[180px] text-foreground">
                  {attachment.fileName}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {formatFileSize(attachment.size)}
                </span>
              </span>
              <Download className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </button>
          );
        }

        if (attachment.type === "youtube") {
          return (
            <a
              key={attachment._id}
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-40 rounded-md overflow-hidden border border-border hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- external, unauthenticated YouTube thumbnail CDN, not app-hosted media */}
              <img
                src={attachment.thumbnailUrl}
                alt="YouTube video thumbnail"
                className="w-full h-auto block"
              />
            </a>
          );
        }

        return (
          <a
            key={attachment._id}
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent-subtle/40 transition-colors max-w-[220px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="truncate text-foreground">{attachment.url}</span>
          </a>
        );
      })}
    </div>
  );
}
