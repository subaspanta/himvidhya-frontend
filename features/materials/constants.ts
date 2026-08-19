// Mirrors server/config/materialRules.js (PRD §7.6 / Domain Model I10).
// Client-side check only -- the server is the enforcement boundary
// (API Contract §3: "Frontend validation is never the security boundary").
// This exists purely so a user gets instant feedback instead of waiting
// on a round trip for a file that was always going to be rejected.

export const MAX_MATERIAL_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
]);

export const ALLOWED_FILE_EXTENSIONS_LABEL =
  "PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, PNG, JPG, JPEG";

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateMaterialFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return `File type not supported. Allowed: ${ALLOWED_FILE_EXTENSIONS_LABEL}.`;
  }
  if (file.size > MAX_MATERIAL_SIZE_BYTES) {
    return "File exceeds the 25 MB size limit.";
  }
  return null;
}
