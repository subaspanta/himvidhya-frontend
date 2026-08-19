import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteCommentApi } from "../api/comments.api";
import { Comment } from "../types";
import { QUERY_KEYS } from "@/config/constants";

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Comment, AxiosError, string>({
    mutationFn: (commentId: string) => deleteCommentApi(commentId),
    onError: (error) => {
      console.error("Delete comment failed:", error?.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.postComments(postId) });
    },
  });
};

export default useDeleteComment;
