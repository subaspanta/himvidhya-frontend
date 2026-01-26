import api from "../lib/axios";

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ProfileResponse {
  id: string;
  email: string;
  name: string;
}

export const registerUser = (data: RegisterData) =>
  api.post("/auth/register", data);

export const loginUser = (data: LoginData) => api.post("/auth/login", data);

export const getProfile = () => api.get<ProfileResponse>("/users/profile");
