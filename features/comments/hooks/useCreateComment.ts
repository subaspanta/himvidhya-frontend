import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createCommentApi, CreateCommentPayload } from "../api/comments.api";
import { Comment } from "../types";
import { QUERY_KEYS } from "@/config/constants";

export const useCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Comment, AxiosError, CreateCommentPayload>({
    mutationFn: (data) => createCommentApi(postId, data),
    onError: (error) => {
      console.error("Create comment failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postComments(postId) });
    },
  });
};

export default useCreateComment;
