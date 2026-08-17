import {
  ClassCard,
  ClassDetails,
  ClassMember,
  JoinRequest,
} from "@/features/classes/types";
import { apiClient } from "@/shared/api/axiosClient";
import {
  mapClassDetails,
  mapClassDto,
  mapClassListDto,
  mapClassMembersList,
  mapJoinRequest,
} from "./home.mapper";

export type CreateClassPayload = {
  name: string;
  subject: string;
};

export type UpdateClassPayload = Partial<{
  name: string;
  description: string;
  subject: string;
  college: string;
  semester: string;
}>;

export async function createClassApi(
  data: CreateClassPayload,
): Promise<ClassCard> {
  const response = await apiClient.post("/classes", data);
  const payload = response.data as { class: unknown };
  const mapped = mapClassDto(payload.class);
  if (!mapped) {
    throw new Error("Failed to parse created class data");
  }
  return mapped;
}

export async function updateClassApi(
  classId: string,
  data: UpdateClassPayload,
): Promise<ClassCard> {
  const response = await apiClient.patch(`/classes/${classId}`, data);
  const payload = response.data as { class: unknown };
  const mapped = mapClassDto(payload.class);
  if (!mapped) {
    throw new Error("Failed to parse updated class data");
  }
  return mapped;
}

export async function archiveClassApi(classId: string): Promise<ClassCard> {
  const response = await apiClient.post(`/classes/${classId}/archive`);
  const payload = response.data as { class: unknown };
  const mapped = mapClassDto(payload.class);
  if (!mapped) {
    throw new Error("Failed to parse archived class data");
  }
  return mapped;
}

export async function restoreClassApi(classId: string): Promise<ClassCard> {
  const response = await apiClient.post(`/classes/${classId}/restore`);
  const payload = response.data as { class: unknown };
  const mapped = mapClassDto(payload.class);
  if (!mapped) {
    throw new Error("Failed to parse restored class data");
  }
  return mapped;
}

export async function regenerateJoinCodeApi(
  classId: string,
): Promise<ClassCard> {
  const response = await apiClient.post(
    `/classes/${classId}/join-code/regenerate`,
  );
  const payload = response.data as { class: unknown };
  const mapped = mapClassDto(payload.class);
  if (!mapped) {
    throw new Error("Failed to parse class data after code regeneration");
  }
  return mapped;
}

export async function leaveClassApi(classId: string): Promise<void> {
  await apiClient.delete(`/classes/${classId}/members/me`);
}

export async function removeClassMemberApi(
  classId: string,
  userId: string,
): Promise<void> {
  await apiClient.delete(`/classes/${classId}/members/${userId}`);
}

export async function getEnrolledClasses(): Promise<ClassCard[]> {
  const response = await apiClient.get("/classes");
  const payload = response.data as { classes: unknown[] };
  return mapClassListDto(payload.classes || []);
}

export async function getClassMembers(
  classId: string,
): Promise<ClassMember[]> {
  const response = await apiClient.get(`/classes/${classId}/members`);
  const payload = response.data as { members: unknown[] };
  return mapClassMembersList(payload.members || []);
}

export async function getClassDetails(id: string): Promise<ClassDetails> {
  const response = await apiClient.get(`/classes/${id}`);
  const payload = response.data as { class: unknown };
  return mapClassDetails(payload.class);
}

// Now returns JoinRequest (pending) not ClassCard
export async function joinClass(code: string): Promise<JoinRequest> {
  const response = await apiClient.post("/classes/join", { code });
  const payload = response.data as { joinRequest: unknown };
  return mapJoinRequest(payload.joinRequest);
}

export async function getJoinRequests(): Promise<JoinRequest[]> {
  const response = await apiClient.get("/classes/requests");
  const payload = response.data as { requests: unknown[] };
  const raw = payload.requests || [];
  return raw.map(mapJoinRequest); // ✅ parse each through Zod
}

export async function getJoinRequestsCount(): Promise<number> {
  const response = await apiClient.get("/classes/requests/count");
  const payload = response.data as { count: number };
  return payload.count ?? 0;
}

export async function approveJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(
    `/classes/requests/${requestId}/approve`,
  );
  const payload = response.data as { joinRequest: unknown };
  return mapJoinRequest(payload.joinRequest);
}

export async function rejectJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(
    `/classes/requests/${requestId}/reject`,
  );
  const payload = response.data as { joinRequest: unknown };
  return mapJoinRequest(payload.joinRequest);
}
