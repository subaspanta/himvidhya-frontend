import { ClassCard, ClassDetails, JoinRequest } from "@/features/batches/types";
import { apiClient } from "@/shared/api/axiosClient";
import type { ApiResponse } from "@/shared/types";
import { mapClassDto, mapClassListDto, mapJoinRequest } from "./home.mapper";

export type CreateClassPayload = {
  name: string;
  subject: string;
};

type ClassDetailsResponseData = ApiResponse<{ class: ClassDetails }>["data"];

export async function createClassApi(
  data: CreateClassPayload,
): Promise<ClassCard> {
  const response = await apiClient.post("/class", data);
  const payload = response.data as { class: unknown };
  const mapped = mapClassDto(payload.class);
  if (!mapped) {
    throw new Error("Failed to parse created class data");
  }
  return mapped;
}

export async function getEnrolledClasses(): Promise<ClassCard[]> {
  const response = await apiClient.get("/class/my");
  const payload = response.data as { classes: unknown[] };
  return mapClassListDto(payload.classes || []);
}

export async function getClassDetails(id: string): Promise<ClassDetails> {
  const response = await apiClient.get(`/class/${id}`);
  const payload = response.data as ClassDetailsResponseData;
  return payload.class; // We can map this later
}

// Now returns JoinRequest (pending) not ClassCard
export async function joinClass(code: string): Promise<JoinRequest> {
  const response = await apiClient.post("/class/join", { code });
  const payload = response.data as { joinRequest: unknown };
  return mapJoinRequest(payload.joinRequest);
}

export async function getJoinRequests(): Promise<JoinRequest[]> {
  const response = await apiClient.get("/class/requests");
  const payload = response.data as { requests: unknown[] };
  const raw = payload.requests || [];
  return raw.map(mapJoinRequest); // ✅ parse each through Zod
}

export async function getJoinRequestsCount(): Promise<number> {
  const response = await apiClient.get("/class/requests/count");
  const payload = response.data as { count: number };
  return payload.count ?? 0;
}

export async function approveJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(
    `/class/requests/${requestId}/approve`,
  );
  const payload = response.data as { joinRequest: unknown };
  return mapJoinRequest(payload.joinRequest);
}

export async function rejectJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(`/class/requests/${requestId}/reject`);
  const payload = response.data as { joinRequest: unknown };
  return mapJoinRequest(payload.joinRequest);
}
