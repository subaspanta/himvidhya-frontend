import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/constants";
import { listPostsFeedApi } from "../api/posts.api";
import type { PostsPage } from "../types";

export const usePostsFeed = (classId: string) => {
  return useInfiniteQuery<PostsPage>({
    queryKey: QUERY_KEYS.classPosts(classId),
    queryFn: ({ pageParam }) =>
      listPostsFeedApi(classId, { cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.nextCursor : undefined,
    enabled: Boolean(classId),
  });
};
