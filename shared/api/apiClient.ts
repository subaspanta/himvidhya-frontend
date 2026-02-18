import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { handleAuthEvent } from "../auth/auth-sync";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // Important: Send cookies with requests
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    // Unwrap response data if needed
    const payload = response?.data?.data ?? response?.data;
    return {
      ...response,
      data: payload,
    };
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If it's /auth/me and 401, just return error (user not logged in)
    if (error.response?.status === 401 && originalRequest?.url === "/auth/me") {
      return Promise.reject(error);
    }

    // If it's /auth/login and 401, invalid credentials - don't try to refresh
    if (
      error.response?.status === 401 &&
      originalRequest?.url === "/auth/login"
    ) {
      return Promise.reject(error);
    }

    // If it's /auth/refresh-token and 401, refresh token expired
    if (
      error.response?.status === 401 &&
      originalRequest?.url === "/auth/refresh-token"
    ) {
      isRefreshing = false;
      processQueue(new Error("Refresh token expired"));
      handleAuthEvent({ type: "SESSION_EXPIRED" });
      return Promise.reject(error);
    }

    // Handle 401 with refresh token logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for the refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the access token
        await apiClient.post("/auth/refresh-token");
        isRefreshing = false;
        processQueue(null);
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(new Error("Token refresh failed"));
        handleAuthEvent({ type: "SESSION_EXPIRED" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
