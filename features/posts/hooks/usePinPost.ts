import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { pinPostApi } from "../api/posts.api";
import { Post } from "../types";
import { QUERY_KEYS } from "@/config/constants";

export const usePinPost = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Post, AxiosError, string>({
    mutationFn: (postId: string) => pinPostApi(postId),
    onError: (error) => {
      console.error("Pin post failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.classPosts(classId) });
    },
  });
};

export default usePinPost;
