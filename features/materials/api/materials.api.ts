import { apiClient } from "@/shared/api/axiosClient";
import { putFileToStorageApi } from "@/shared/api/storageUpload";
import type { PaginatedAxiosResponse } from "@/shared/types";
import type { Material, MaterialsPage } from "../types";
import { mapMaterialDto, mapMaterialListDto } from "./materials.mapper";

export type MaterialFilePayload = {
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
  storageKey?: string;
  fileName?: string;
};

export type ListMaterialsParams = {
  cursor?: string;
  limit?: number;
  q?: string;
};

function mapMaterialOrThrow(raw: unknown, action: string): Material {
  const material = mapMaterialDto(raw);
  if (!material) throw new Error(`Failed to parse ${action} material data`);
  return material;
}

export async function requestMaterialUploadUrlApi(
  classId: string,
  payload: MaterialFilePayload,
): Promise<UploadUrlResult> {
  const response = await apiClient.post(
    `/classes/${classId}/materials/upload-url`,
    payload,
  );
  return response.data as UploadUrlResult;
}

export async function confirmMaterialUploadApi(
  classId: string,
  payload: ConfirmMaterialPayload,
): Promise<Material> {
  const response = await apiClient.post(`/classes/${classId}/materials`, payload);
  return mapMaterialOrThrow(
    (response.data as { material: unknown }).material,
    "created",
  );
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
    meta: response.meta,
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
  payload: UpdateMaterialPayload,
): Promise<Material> {
  const response = await apiClient.patch(`/materials/${materialId}`, payload);
  return mapMaterialOrThrow(
    (response.data as { material: unknown }).material,
    "updated",
  );
}

export async function requestMaterialReplaceUrlApi(
  materialId: string,
  payload: MaterialFilePayload,
): Promise<UploadUrlResult> {
  const response = await apiClient.post(
    `/materials/${materialId}/replace-url`,
    payload,
  );
  return response.data as UploadUrlResult;
}

export async function deleteMaterialApi(materialId: string): Promise<void> {
  await apiClient.delete(`/materials/${materialId}`);
}

export { putFileToStorageApi };
