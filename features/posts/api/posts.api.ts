import { apiClient } from "@/shared/api/axiosClient";
import type { Post, PostsPage } from "@/features/posts/types";
import type { PaginatedAxiosResponse } from "@/shared/types";
import { mapPostDto, mapPostListDto } from "./posts.mapper";

export type CreatePostPayload = {
  title: string;
  content: string;
};

export type UpdatePostPayload = Partial<CreatePostPayload>;

export type ListPostsFeedParams = {
  cursor?: string;
  limit?: number;
};

function mapPostOrThrow(raw: unknown, action: string): Post {
  const mapped = mapPostDto(raw);
  if (!mapped) {
    throw new Error(`Failed to parse ${action} post data`);
  }
  return mapped;
}

export async function createPostApi(
  classId: string,
  data: CreatePostPayload,
): Promise<Post> {
  const response = await apiClient.post(`/classes/${classId}/posts`, data);
  const payload = response.data as { post: unknown };
  return mapPostOrThrow(payload.post, "created");
}

export async function listPostsFeedApi(
  classId: string,
  params: ListPostsFeedParams = {},
): Promise<PostsPage> {
  const response = await apiClient.get<
    { posts: unknown[] },
    PaginatedAxiosResponse<{ posts: unknown[] }>
  >(`/classes/${classId}/posts`, { params });
  return {
    posts: mapPostListDto(response.data.posts || []),
    meta: {
      nextCursor: response.meta.nextCursor,
      hasMore: response.meta.hasMore,
    },
  };
}

export async function updatePostApi(
  postId: string,
  data: UpdatePostPayload,
): Promise<Post> {
  const response = await apiClient.patch(`/posts/${postId}`, data);
  const payload = response.data as { post: unknown };
  return mapPostOrThrow(payload.post, "updated");
}

export async function deletePostApi(postId: string): Promise<Post> {
  const response = await apiClient.delete(`/posts/${postId}`);
  const payload = response.data as { post: unknown };
  return mapPostOrThrow(payload.post, "deleted");
}

export async function pinPostApi(postId: string): Promise<Post> {
  const response = await apiClient.post(`/posts/${postId}/pin`);
  const payload = response.data as { post: unknown };
  return mapPostOrThrow(payload.post, "pinned");
}

export async function unpinPostApi(postId: string): Promise<Post> {
  const response = await apiClient.delete(`/posts/${postId}/pin`);
  const payload = response.data as { post: unknown };
  return mapPostOrThrow(payload.post, "unpinned");
}
