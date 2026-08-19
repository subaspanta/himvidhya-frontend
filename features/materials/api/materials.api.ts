import axios from "axios";
import { apiClient } from "@/shared/api/axiosClient";
import type { Material, MaterialsPage } from "@/features/materials/types";
import type { PaginatedAxiosResponse } from "@/shared/types";
import { mapMaterialDto, mapMaterialListDto } from "./materials.mapper";

export type UploadUrlPayload = {
  fileName: string;
  mimeType: string;
  size: number;
};

export type UploadUrlResult = {
  uploadUrl: string;
  storageKey: string;
};

export type ConfirmMaterialPayload = {
  storageKey: string;
  title: string;
  description?: string;
  fileName: string;
};

export type UpdateMaterialPayload = {
  title?: string;
  description?: string;
};

export type ListMaterialsParams = {
  cursor?: string;
  limit?: number;
  q?: string;
};

function mapMaterialOrThrow(raw: unknown, action: string): Material {
  const mapped = mapMaterialDto(raw);
  if (!mapped) {
    throw new Error(`Failed to parse ${action} material data`);
  }
  return mapped;
}

export async function requestUploadUrlApi(
  classId: string,
  data: UploadUrlPayload,
): Promise<UploadUrlResult> {
  const response = await apiClient.post(`/classes/${classId}/materials/upload-url`, data);
  return response.data as UploadUrlResult;
}

// Deliberately bypasses apiClient: this PUT goes straight to object
// storage (MinIO/R2), not the API. apiClient's baseURL, withCredentials,
// envelope-unwrap interceptor, and 401-refresh interceptor are all wrong
// here -- the presigned URL's own query-string signature is the only
// auth this request carries.
export async function putFileToStorageApi(uploadUrl: string, file: File): Promise<void> {
  await axios.put(uploadUrl, file, {
    headers: { "Content-Type": file.type },
  });
}

export async function confirmMaterialUploadApi(
  classId: string,
  data: ConfirmMaterialPayload,
): Promise<Material> {
  const response = await apiClient.post(`/classes/${classId}/materials`, data);
  const payload = response.data as { material: unknown };
  return mapMaterialOrThrow(payload.material, "created");
}

export async function listMaterialsApi(
  classId: string,
  params: ListMaterialsParams = {},
): Promise<MaterialsPage> {
  const response = await apiClient.get<
    { materials: unknown[] },
    PaginatedAxiosResponse<{ materials: unknown[] }>
  >(`/classes/${classId}/materials`, { params });
  return {
    materials: mapMaterialListDto(response.data.materials || []),
    meta: {
      nextCursor: response.meta.nextCursor,
      hasMore: response.meta.hasMore,
    },
  };
}

export async function getMaterialDownloadUrlApi(
  materialId: string,
): Promise<{ downloadUrl: string; fileName: string }> {
  const response = await apiClient.get(`/materials/${materialId}/download-url`);
  return response.data as { downloadUrl: string; fileName: string };
}

export async function updateMaterialApi(
  materialId: string,
  data: UpdateMaterialPayload,
): Promise<Material> {
  const response = await apiClient.patch(`/materials/${materialId}`, data);
  const payload = response.data as { material: unknown };
  return mapMaterialOrThrow(payload.material, "updated");
}

export async function requestReplaceUrlApi(
  materialId: string,
  data: UploadUrlPayload,
): Promise<UploadUrlResult> {
  const response = await apiClient.post(`/materials/${materialId}/replace-url`, data);
  return response.data as UploadUrlResult;
}

export async function confirmMaterialReplaceApi(
  materialId: string,
  data: { storageKey: string; fileName: string },
): Promise<Material> {
  const response = await apiClient.patch(`/materials/${materialId}`, data);
  const payload = response.data as { material: unknown };
  return mapMaterialOrThrow(payload.material, "replaced");
}

export async function deleteMaterialApi(materialId: string): Promise<void> {
  await apiClient.delete(`/materials/${materialId}`);
}
