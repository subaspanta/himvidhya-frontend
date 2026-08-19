import axios from "axios";

// Deliberately bypasses apiClient: this PUT goes straight to object
// storage (MinIO/R2), not the API. apiClient's baseURL, withCredentials,
// envelope-unwrap interceptor, and 401-refresh interceptor are all wrong
// here -- the presigned URL's own query-string signature is the only
// auth this request carries. Shared by every feature using the presigned
// upload flow (ADR-0005): Materials and Posts (announcement attachments).
export async function putFileToStorageApi(uploadUrl: string, file: File): Promise<void> {
  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": file.type },
  });
}
