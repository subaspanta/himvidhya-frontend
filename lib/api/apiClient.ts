import axios from "axios";
import { handleAuthEvent } from "../auth/auth-sync";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // REQUIRED
});

// Response Interceptor: The "Safety Net"
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      handleAuthEvent({ type: "SESSION_EXPIRED" });
    }
    return Promise.reject(error);
  },
);
