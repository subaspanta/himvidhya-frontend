import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  ALLOWED_FILE_EXTENSIONS_LABEL,
  MAX_ATTACHMENT_SIZE_BYTES,
} from "@/shared/attachmentRules";

export const MATERIAL_FILE_ACCEPT = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".png",
  ".jpg",
  ".jpeg",
].join(",");

export function validateMaterialFile(file: File): string | null {
  if (!ALLOWED_ATTACHMENT_MIME_TYPES.has(file.type)) {
    return `Choose a supported file: ${ALLOWED_FILE_EXTENSIONS_LABEL}.`;
  }
  if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
    return "Choose a file smaller than 25 MB.";
  }
  if (file.size === 0) return "Choose a file that is not empty.";
  return null;
}
