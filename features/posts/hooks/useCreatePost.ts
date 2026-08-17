import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createPostApi, CreatePostPayload } from "../api/posts.api";
import { Post } from "../types";
import { QUERY_KEYS } from "@/config/constants";

export const useCreatePost = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Post, AxiosError, CreatePostPayload>({
    mutationFn: (data) => createPostApi(classId, data),
    onError: (error) => {
      console.error("Create post failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classPosts(classId) });
    },
  });
};

export default useCreatePost;
