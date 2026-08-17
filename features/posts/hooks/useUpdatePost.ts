import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updatePostApi, UpdatePostPayload } from "../api/posts.api";
import { Post } from "../types";
import { QUERY_KEYS } from "@/config/constants";

type UpdatePostArgs = { postId: string; data: UpdatePostPayload };

export const useUpdatePost = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Post, AxiosError, UpdatePostArgs>({
    mutationFn: ({ postId, data }) => updatePostApi(postId, data),
    onError: (error) => {
      console.error("Update post failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classPosts(classId) });
    },
  });
};

export default useUpdatePost;
