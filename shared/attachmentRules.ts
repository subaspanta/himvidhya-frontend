// Client-side mirror of server/config/attachmentRules.js. Fast-reject only
// -- the server is the enforcement boundary either way. Shared by every
// feature using the presigned-upload flow (ADR-0005).
export const MAX_ATTACHMENT_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export const ALLOWED_ATTACHMENT_MIME_TYPES = new Set([
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
