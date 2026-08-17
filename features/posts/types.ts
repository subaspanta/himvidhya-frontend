// Post types — matches API response shapes exactly (Post.model.js)

export interface PostAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

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
