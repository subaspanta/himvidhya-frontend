import { z } from "zod";
import type { Post } from "@/features/posts/types";

const PostAuthorDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string().nullable(),
});

const PostDtoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  content: z.string(),
  classId: z.string(),
  authorId: PostAuthorDtoSchema,
  isPinned: z.boolean(),
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const isDev = process.env.NODE_ENV !== "production";

// Follows mapClassDto's drop-invalid-and-continue policy (home.mapper.ts):
// a malformed post in a feed page shouldn't blank the whole page.
export const mapPostDto = (item: unknown): Post | null => {
  const result = PostDtoSchema.safeParse(item);

  if (!result.success) {
    if (isDev) {
      console.warn(
        "[mapper] Dropping invalid post:",
        result.error.flatten(),
      );
    }
    return null;
  }

  const parsed = result.data;

  return {
    id: parsed._id,
    title: parsed.title,
    content: parsed.content,
    classId: parsed.classId,
    authorId: parsed.authorId,
    isPinned: parsed.isPinned,
    deletedAt: parsed.deletedAt,
    createdAt: parsed.createdAt,
    updatedAt: parsed.updatedAt,
  };
};

export const mapPostListDto = (items: unknown[]): Post[] => {
  if (!Array.isArray(items)) return [];

  const results = items.map(mapPostDto);
  const valid = results.filter((item): item is Post => item !== null);

  if (isDev && valid.length !== items.length) {
    console.warn(
      `[mapper] ${items.length - valid.length} post(s) failed to parse and were dropped`,
    );
  }

  return valid;
};
