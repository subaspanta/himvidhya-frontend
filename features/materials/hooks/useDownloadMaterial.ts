import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getMaterialDownloadUrlApi } from "../api/materials.api";

// Presigned GET is short-lived (ADR-0005) -- fetched fresh on every click
// rather than cached, then handed straight to the browser.
export const useDownloadMaterial = () => {
  return useMutation<{ downloadUrl: string; fileName: string }, AxiosError, string>({
    mutationFn: (materialId: string) => getMaterialDownloadUrlApi(materialId),
    onError: (error) => {
      console.error("Get download URL failed:", error?.response?.data || error.message);
    },
  });
};

export default useDownloadMaterial;
