import { ClassCard, ClassDetails } from "@/features/batches";
import { apiClient } from "@/shared/api/axiosClient";

export async function createClassApi(data: {
  name: string;
  description: string;
  subject: string;
}): Promise<ClassCard> {
  const response = await apiClient.post("/class", data);
  return response.data.class;
}

export async function getEnrolledClasses(): Promise<ClassCard[]> {
  const response = await apiClient.get("/class/my");
  return response.data || [];
}

export async function getClassDetails(id: string): Promise<ClassDetails> {
  const response = await apiClient.get(`/class/${id}`);
  return response.data;
}

export async function joinClass(code: string): Promise<ClassCard> {
  try {
    const response = await apiClient.post("/class/join", { code });
    return response.data.class;
  } catch (error) {
    console.error("Failed to join class:", error);
    throw error;
  }
}
