import { apiClient } from "@/shared/api/apiClient";
import { ClassCard, ClassDetails } from "../types";

/**
 * Fetch all classes the user is enrolled in
 */
export async function getEnrolledClasses(): Promise<ClassCard[]> {
  const response = await apiClient.get("/classes/my");
  return response.data || [];
}

/**
 * Fetch a specific class by ID
 */
export async function getClassDetails(id: string): Promise<ClassDetails> {
  const response = await apiClient.get(`/classes/${id}`);
  return response.data.class;
}

/**
 * Create a new class
 */
export async function createClass(data: {
  name: string;
  description: string;
  subject: string;
}): Promise<ClassCard> {
  const response = await apiClient.post("/classes", data);
  return response.data.class;
}

/**
 * Join a class with a code
 */
export async function joinClass(code: string): Promise<ClassCard> {
  try {
    const response = await apiClient.post("/classes/join", { code });
    return response.data.class;
  } catch (error) {
    console.error("Failed to join class:", error);
    throw error;
  }
}
