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

// Matches watch?v=, youtu.be/, embed/, and shorts/ URL forms -- mirrors
// post.service.js's YOUTUBE_ID_PATTERN. Client-side only, for an instant
// composer preview; the server re-derives and verifies this independently.
const YOUTUBE_ID_PATTERN =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export function extractYoutubeThumbnail(url: string): string | null {
  const match = YOUTUBE_ID_PATTERN.exec(url);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}
