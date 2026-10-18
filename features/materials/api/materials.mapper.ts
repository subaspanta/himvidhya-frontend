import { z } from "zod";
import type { Material } from "../types";

const MaterialUploaderDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string().nullable(),
});

const MaterialDtoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional().default(""),
  fileName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  classId: z.string(),
  uploadedBy: MaterialUploaderDtoSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

const isDev = process.env.NODE_ENV !== "production";

export function mapMaterialDto(item: unknown): Material | null {
  const result = MaterialDtoSchema.safeParse(item);

  if (!result.success) {
    if (isDev) {
      console.warn("[mapper] Dropping invalid material:", result.error.flatten());
    }
    return null;
  }

  const { _id, ...material } = result.data;
  return { id: _id, ...material };
}

export function mapMaterialListDto(items: unknown[]): Material[] {
  if (!Array.isArray(items)) return [];

  const materials = items
    .map(mapMaterialDto)
    .filter((item): item is Material => item !== null);

  if (isDev && materials.length !== items.length) {
    console.warn(
      `[mapper] ${items.length - materials.length} material(s) failed to parse and were dropped`,
    );
  }

  return materials;
}
