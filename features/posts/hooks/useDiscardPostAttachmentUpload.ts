import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { discardPostAttachmentUploadApi } from "../api/posts.api";

// Fires when the composer removes an already-uploaded file before submit
// (or the draft is abandoned) -- cleans up the now-unreferenced storage
// object. Best-effort: nothing useful to surface to the user on failure,
// the server already logs the orphan.
export const useDiscardPostAttachmentUpload = (classId: string) => {
  return useMutation<void, AxiosError, string>({
    mutationFn: (storageKey: string) => discardPostAttachmentUploadApi(classId, storageKey),
    onError: (error) => {
      console.error("Discard attachment upload failed:", error?.response?.data || error.message);
    },
  });
};

export default useDiscardPostAttachmentUpload;
