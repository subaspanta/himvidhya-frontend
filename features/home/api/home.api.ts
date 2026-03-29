import { ClassCard, ClassDetails, JoinRequest } from "@/features/batches/types";
import { apiClient } from "@/shared/api/axiosClient";
import type { ApiResponse } from "@/shared/types";
import { mapClassDto, mapClassListDto, mapJoinRequest } from "./home.mapper";

export type CreateClassPayload = {
  name: string;
  subject: string;
  description?: string;
};

type CreateClassResponseData = ApiResponse<{ class: unknown }>["data"];
type EnrolledClassesResponseData = ApiResponse<{ classes: unknown[] }>["data"];
type ClassDetailsResponseData = ApiResponse<{ class: ClassDetails }>["data"];
type JoinRequestResponseData = ApiResponse<{
  joinRequest: JoinRequest;
}>["data"];
type JoinRequestsResponseData = ApiResponse<{
  requests: JoinRequest[];
}>["data"];
type JoinRequestsCountResponseData = ApiResponse<{ count: number }>["data"];

export async function createClassApi(
  data: CreateClassPayload,
): Promise<ClassCard> {
  const response = await apiClient.post("/class", data);
  const payload = response.data as CreateClassResponseData;
  return mapClassDto(payload.class);
}

export async function getEnrolledClasses(): Promise<ClassCard[]> {
  const response = await apiClient.get("/class/my");
  const payload = response.data as EnrolledClassesResponseData;
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
  return mapJoinRequest(response.data.joinRequest);
}

export async function getJoinRequests(): Promise<JoinRequest[]> {
  const response = await apiClient.get("/class/requests");
  const payload = response.data as JoinRequestsResponseData;
  return payload.requests || [];
}

export async function getJoinRequestsCount(): Promise<number> {
  const response = await apiClient.get("/class/requests/count");
  const payload = response.data as JoinRequestsCountResponseData;
  return payload.count ?? 0;
}

export async function approveJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(
    `/class/requests/${requestId}/approve`,
  );
  const payload = response.data as JoinRequestResponseData;
  return payload.joinRequest;
}

export async function rejectJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(`/class/requests/${requestId}/reject`);
  const payload = response.data as JoinRequestResponseData;
  return payload.joinRequest;
}
