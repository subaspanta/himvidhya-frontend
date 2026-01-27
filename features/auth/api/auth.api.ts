import { apiClient } from "@/lib/api/apiClient";
import api from "@/lib/api/axios";
import type { User, AuthResponse } from "../types";

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface ProfileResponse {
  id: string;
  email: string;
  name: string;
}

export const registerUser = (data: RegisterData) =>
  api.post("/auth/register", data);

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", credentials);
  const { token, user } = response.data;
  const mappedUser: User = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };
  // Optionally validate with schema, but return mappedUser
  return { user: mappedUser, token };
};

export const getProfile = () => api.get<ProfileResponse>("/users/profile");
