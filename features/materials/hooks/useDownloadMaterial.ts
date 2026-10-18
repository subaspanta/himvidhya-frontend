import { useMutation } from "@tanstack/react-query";
import { getMaterialDownloadUrlApi } from "../api/materials.api";

export function useDownloadMaterial() {
  return useMutation({
    mutationFn: getMaterialDownloadUrlApi,
    onSuccess: ({ downloadUrl, fileName }) => {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });
}
