import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  requestPostAttachmentUploadUrlApi,
  putFileToStorageApi,
} from "../api/posts.api";

export type UploadedPostAttachment = {
  storageKey: string;
  fileName: string;
};

// Two of Material's three presigned-flow steps (ADR-0005): request a URL,
// PUT bytes directly to storage. There is no third "confirm" step here --
// the storageKey is only persisted once the announcement is created or
// updated with it (post.service.js verifies the object then).
export const useUploadPostAttachment = (classId: string) => {
  return useMutation<UploadedPostAttachment, AxiosError, File>({
    mutationFn: async (file) => {
      const { uploadUrl, storageKey } = await requestPostAttachmentUploadUrlApi(classId, {
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
      });
      await putFileToStorageApi(uploadUrl, file);
      return { storageKey, fileName: file.name };
    },
    onError: (error) => {
      console.error("Upload attachment failed:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    },
  });
};

export default useUploadPostAttachment;
