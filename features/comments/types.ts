// Comment types — matches API response shapes exactly (Comment.model.js)

export interface CommentAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// Shape returned by GET /posts/:postId/comments and every comment mutation
// response. authorId is populated on every one of these endpoints
// (comment.service.js).
export interface Comment {
  id: string;
  postId: string;
  content: string;
  authorId: CommentAuthor;
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
