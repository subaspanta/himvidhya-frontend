import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateCommentApi, UpdateCommentPayload } from "../api/comments.api";
import { Comment } from "../types";
import { QUERY_KEYS } from "@/config/constants";

type UpdateCommentArgs = { commentId: string; data: UpdateCommentPayload };

export const useUpdateComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Comment, AxiosError, UpdateCommentArgs>({
    mutationFn: ({ commentId, data }) => updateCommentApi(commentId, data),
    onError: (error) => {
      console.error("Update comment failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postComments(postId) });
    },
  });
};

export default useUpdateComment;
