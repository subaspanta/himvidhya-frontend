export interface CommentAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// Returned by GET /posts/:postId/comments and all comment mutation endpoints
export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: CommentAuthor; // Always populated
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsPage {
  comments: Comment[];
  meta: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}
