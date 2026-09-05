import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";
import { listCommentsApi } from "../api/comments.api";
import type { CommentsPage } from "../types";

// Explicit "Load more" control — no auto-scroll trigger.
export const useComments = (postId: string) => {
  return useInfiniteQuery<CommentsPage>({
    queryKey: QUERY_KEYS.postComments(postId),
    queryFn: ({ pageParam }) =>
      listCommentsApi(postId, { cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextCursor : undefined,
    enabled: Boolean(postId),
  });
};

export default useComments;
