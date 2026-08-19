import { apiClient } from "@/shared/api/axiosClient";
import type { Comment, CommentsPage } from "@/features/comments/types";
import type { PaginatedAxiosResponse } from "@/shared/types";
import { mapCommentDto, mapCommentListDto } from "./comments.mapper";

export type CreateCommentPayload = {
  content: string;
};

export type UpdateCommentPayload = {
  content: string;
};

export type ListCommentsParams = {
  cursor?: string;
  limit?: number;
};

function mapCommentOrThrow(raw: unknown, action: string): Comment {
  const mapped = mapCommentDto(raw);
  if (!mapped) {
    throw new Error(`Failed to parse ${action} comment data`);
  }
  return mapped;
}

export async function createCommentApi(
  postId: string,
  data: CreateCommentPayload,
): Promise<Comment> {
  const response = await apiClient.post(`/posts/${postId}/comments`, data);
  const payload = response.data as { comment: unknown };
  return mapCommentOrThrow(payload.comment, "created");
}

export async function listCommentsApi(
  postId: string,
  params: ListCommentsParams = {},
): Promise<CommentsPage> {
  const response = await apiClient.get<
    { comments: unknown[] },
    PaginatedAxiosResponse<{ comments: unknown[] }>
  >(`/posts/${postId}/comments`, { params });
  return {
    comments: mapCommentListDto(response.data.comments || []),
    meta: {
      nextCursor: response.meta.nextCursor,
      hasMore: response.meta.hasMore,
    },
  };
}

export async function updateCommentApi(
  commentId: string,
  data: UpdateCommentPayload,
): Promise<Comment> {
  const response = await apiClient.patch(`/comments/${commentId}`, data);
  const payload = response.data as { comment: unknown };
  return mapCommentOrThrow(payload.comment, "updated");
}

export async function deleteCommentApi(commentId: string): Promise<Comment> {
  const response = await apiClient.delete(`/comments/${commentId}`);
  const payload = response.data as { comment: unknown };
  return mapCommentOrThrow(payload.comment, "deleted");
}
