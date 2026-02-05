import { apiClient } from "@/lib/api/apiClient";
import type { User, AuthResponse } from "../types";

/* ================= REGISTER ================= */

interface RegisterData {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}
export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/register", data);

  const user = response.data.user;

  const mappedUser: User = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };

  return { user: mappedUser };
};

/* ================= LOGIN ================= */

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", credentials);

  const user = response.data.user;

  const mappedUser: User = {
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    username: user.username || user.name || user.email,
  };

  return { user: mappedUser };
};

/* ================= PROFILE ================= */

// export const getProfile = async (): Promise<User> => {
//   const response = await apiClient.get("/auth/profile");

//   const user = response.data;

//   return {
//     id: user._id || user.id,
//     email: user.email,
//     name: user.name,
//     username: user.username || user.name || user.email,
//   };
// };
