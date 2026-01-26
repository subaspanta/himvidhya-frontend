import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "../store/auth.store";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
});

// Response Interceptor: The "Safety Net"
apiClient.interceptors.response.use(
  (response) => response, // If the request succeeds, just return it
  (error) => {
    // Check if the error is 401 (Unauthorized)
    if (error.response?.status === 401) {
      console.warn("Session expired or invalid token. Logging out...");

      // Access the Zustand store directly to clear state
      useAuthStore.getState().logout();

      // Optional: Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  },
);
