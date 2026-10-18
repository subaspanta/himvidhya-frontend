import {
  MAX_ATTACHMENT_SIZE_BYTES,
  ALLOWED_ATTACHMENT_MIME_TYPES,
  ALLOWED_FILE_EXTENSIONS_LABEL,
} from "@/shared/attachmentRules";
import { formatFileSize } from "@/shared/utils";

export { ALLOWED_ATTACHMENT_MIME_TYPES, ALLOWED_FILE_EXTENSIONS_LABEL, formatFileSize };

export const MAX_POST_ATTACHMENTS = 10; // mirrors validationSchemas.js's postAttachmentsSchema cap

export function validateAttachmentFile(file: File): string | null {
  if (!ALLOWED_ATTACHMENT_MIME_TYPES.has(file.type)) {
    return `File type not supported. Allowed: ${ALLOWED_FILE_EXTENSIONS_LABEL}.`;
  }
  if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
    return "File exceeds the 25 MB size limit.";
  }
  return null;
}

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function extractYoutubeThumbnail(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;

    const hostname = parsed.hostname.toLowerCase();
    let videoId: string | null = null;
    if (hostname === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
      const [route, id] = parsed.pathname.split("/").filter(Boolean);
      if (route === "watch") videoId = parsed.searchParams.get("v");
      if (route === "embed" || route === "shorts") videoId = id ?? null;
    }

    return videoId && YOUTUBE_ID_PATTERN.test(videoId)
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  } catch {
    return null;
  }
}
