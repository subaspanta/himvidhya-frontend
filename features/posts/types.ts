// Post types — matches API response shapes exactly (Post.model.js)

export interface PostAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// storageKey never leaves the server (ADR-0005) -- a file attachment's
// bytes are only reachable via a freshly-signed download-url call.
export interface PostFileAttachment {
  _id: string;
  type: "file";
  fileName: string;
  mimeType: string;
  size: number;
}

export interface PostLinkAttachment {
  _id: string;
  type: "link";
  url: string;
}

export interface PostYoutubeAttachment {
  _id: string;
  type: "youtube";
  url: string;
  thumbnailUrl: string;
}

export type PostAttachment =
  | PostFileAttachment
  | PostLinkAttachment
  | PostYoutubeAttachment;

// Shape returned by GET /classes/:classId/posts, GET /posts/:postId, and
// every post mutation response. authorId is populated on every one of
// these endpoints (post.service.js).
export interface Post {
  id: string;
  title: string;
  content: string;
  classId: string;
  authorId: PostAuthor;
  isPinned: boolean;
  deletedAt: string | null;
  attachments: PostAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostsPage {
  posts: Post[];
  meta: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}
