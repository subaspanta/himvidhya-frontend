import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getPostAttachmentDownloadUrlApi } from "../api/posts.api";

// Mirrors useDownloadMaterial: the presigned GET is short-lived
// (ADR-0005) -- fetched fresh on every click rather than cached.
export const useDownloadPostAttachment = (postId: string) => {
  return useMutation<{ downloadUrl: string; fileName: string }, AxiosError, string>({
    mutationFn: (attachmentId: string) =>
      getPostAttachmentDownloadUrlApi(postId, attachmentId),
    onError: (error) => {
      console.error("Get attachment download URL failed:", error?.response?.data || error.message);
    },
  });
};

export default useDownloadPostAttachment;
