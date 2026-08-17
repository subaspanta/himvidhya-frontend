// Post types — matches API response shapes exactly (Post.model.js)

export interface PostAuthor {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

// Shape returned by GET /classes/:classId/posts, GET /posts/:postId, and
// every post mutation response. authorId is a raw id string on the feed
// list (lean, unpopulated) and a populated PostAuthor object on the
// single-post GET (getPostByIdService populates it) -- mirrors ClassCard's
// owner field ambiguity for the same reason.
export interface Post {
  id: string;
  title: string;
  content: string;
  classId: string;
  authorId: string | PostAuthor;
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
