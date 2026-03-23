import { ClassCard, ClassDetails, JoinRequest } from "@/features/batches/types";
import { apiClient } from "@/shared/api/axiosClient";
import { mapClassDto, mapClassListDto } from "./home.mapper";

export async function createClassApi(data: {
  name: string;
  subject: string;
}): Promise<ClassCard> {
  const response = await apiClient.post("/class", data);
  return mapClassDto(response.data.class);
}

export async function getEnrolledClasses(): Promise<ClassCard[]> {
  const response = await apiClient.get("/class/my");
  return mapClassListDto(response.data.classes || []);
}

export async function getClassDetails(id: string): Promise<ClassDetails> {
  const response = await apiClient.get(`/class/${id}`);
  return response.data.class; // We can map this later
}

// Now returns JoinRequest (pending) not ClassCard
export async function joinClass(code: string): Promise<JoinRequest> {
  const response = await apiClient.post("/class/join", { code });
  return response.data.joinRequest;
}

export async function getJoinRequests(): Promise<JoinRequest[]> {
  const response = await apiClient.get("/class/requests");
  return response.data.requests || [];
}

export async function getJoinRequestsCount(): Promise<number> {
  const response = await apiClient.get("/class/requests/count");
  return response.data.count ?? 0;
}

export async function approveJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(
    `/class/requests/${requestId}/approve`,
  );
  return response.data.joinRequest;
}

export async function rejectJoinRequest(
  requestId: string,
): Promise<JoinRequest> {
  const response = await apiClient.patch(`/class/requests/${requestId}/reject`);
  return response.data.joinRequest;
}
