import { z } from "zod";
import type { Material } from "@/features/materials/types";

const MaterialUploaderDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string().nullable(),
});

const MaterialDtoSchema = z.object({
  _id: z.string(),
  classId: z.string(),
  title: z.string(),
  description: z.string().optional().default(""),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  uploadedBy: MaterialUploaderDtoSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

const isDev = process.env.NODE_ENV !== "production";

// Follows mapPostDto's drop-invalid-and-continue policy: a malformed
// material in a list page shouldn't blank the whole page.
export const mapMaterialDto = (item: unknown): Material | null => {
  const result = MaterialDtoSchema.safeParse(item);

  if (!result.success) {
    if (isDev) {
      console.warn("[mapper] Dropping invalid material:", result.error.flatten());
    }
    return null;
  }

  const parsed = result.data;

  return {
    id: parsed._id,
    classId: parsed.classId,
    title: parsed.title,
    description: parsed.description,
    fileName: parsed.fileName,
    mimeType: parsed.mimeType,
    size: parsed.size,
    uploadedBy: parsed.uploadedBy,
    createdAt: parsed.createdAt,
    updatedAt: parsed.updatedAt,
  };
};

export const mapMaterialListDto = (items: unknown[]): Material[] => {
  if (!Array.isArray(items)) return [];

  const results = items.map(mapMaterialDto);
  const valid = results.filter((item): item is Material => item !== null);

  if (isDev && valid.length !== items.length) {
    console.warn(
      `[mapper] ${items.length - valid.length} material(s) failed to parse and were dropped`,
    );
  }

  return valid;
};
