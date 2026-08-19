import { z } from "zod";
import type { Comment } from "@/features/comments/types";

const CommentAuthorDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string().nullable(),
});

const CommentDtoSchema = z.object({
  _id: z.string(),
  postId: z.string(),
  content: z.string(),
  authorId: CommentAuthorDtoSchema,
  deletedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const isDev = process.env.NODE_ENV !== "production";

// Follows mapPostDto's drop-invalid-and-continue policy (posts.mapper.ts):
// a malformed comment in a page shouldn't blank the whole list.
export const mapCommentDto = (item: unknown): Comment | null => {
  const result = CommentDtoSchema.safeParse(item);

  if (!result.success) {
    if (isDev) {
      console.warn("[mapper] Dropping invalid comment:", result.error.flatten());
    }
    return null;
  }

  const parsed = result.data;

  return {
    id: parsed._id,
    postId: parsed.postId,
    content: parsed.content,
    authorId: parsed.authorId,
    deletedAt: parsed.deletedAt,
    createdAt: parsed.createdAt,
    updatedAt: parsed.updatedAt,
  };
};

export const mapCommentListDto = (items: unknown[]): Comment[] => {
  if (!Array.isArray(items)) return [];

  const results = items.map(mapCommentDto);
  const valid = results.filter((item): item is Comment => item !== null);

  if (isDev && valid.length !== items.length) {
    console.warn(
      `[mapper] ${items.length - valid.length} comment(s) failed to parse and were dropped`,
    );
  }

  return valid;
};
