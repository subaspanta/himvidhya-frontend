import { apiClient } from "@/shared/api/axiosClient";
import { putFileToStorageApi } from "@/shared/api/storageUpload";
import type { Post, PostsPage } from "@/features/posts/types";
import type { PaginatedAxiosResponse } from "@/shared/types";
import { mapPostDto, mapPostListDto } from "./posts.mapper";

export { putFileToStorageApi };

// Mirrors the server's discriminated attachment input (validationSchemas.js
// postAttachmentInputSchema). File entries only ever carry the storageKey
// issued by requestPostAttachmentUploadUrlApi -- mimeType/size are
// re-derived server-side from the real object.
export type PostAttachmentInput =
  | { type: "file"; storageKey: string; fileName: string }
  | { type: "link"; url: string }
  | { type: "youtube"; url: string };

export type CreatePostPayload = {
  title: string;
  content: string;
  attachments?: PostAttachmentInput[];
};

export type UpdatePostPayload = Partial<CreatePostPayload>;

export type RequestPostAttachmentUploadUrlPayload = {
  fileName: string;
  mimeType: string;
  size: number;
};

export type RequestPostAttachmentUploadUrlResult = {
  uploadUrl: string;
  storageKey: string;
};

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

export async function requestPostAttachmentUploadUrlApi(
  classId: string,
  data: RequestPostAttachmentUploadUrlPayload,
): Promise<RequestPostAttachmentUploadUrlResult> {
  const response = await apiClient.post(
    `/classes/${classId}/posts/attachment-upload-url`,
    data,
  );
  return response.data as RequestPostAttachmentUploadUrlResult;
}

// Composer-side cleanup: a file already PUT to storage but never attached
// to a saved post (removed before submit, or the draft was abandoned).
// Best-effort on the server; fire-and-forget from the caller too -- there's
// nothing useful to show the user if this fails, the object is just an
// orphan the server already logs.
export async function discardPostAttachmentUploadApi(
  classId: string,
  storageKey: string,
): Promise<void> {
  await apiClient.delete(`/classes/${classId}/posts/attachment-upload-url`, {
    data: { storageKey },
  });
}

export async function getPostAttachmentDownloadUrlApi(
  postId: string,
  attachmentId: string,
): Promise<{ downloadUrl: string; fileName: string }> {
  const response = await apiClient.get(
    `/posts/${postId}/attachments/${attachmentId}/download-url`,
  );
  return response.data as { downloadUrl: string; fileName: string };
}
