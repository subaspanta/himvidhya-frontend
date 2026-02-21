import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { queryClient } from "./queryClient";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

/* ================= QUEUE ================= */

let isRefreshing = false;

type QueueItem = {
  resolve: () => void;
  reject: (error: Error) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

/* ================= RESPONSE TRANSFORM ================= */

apiClient.interceptors.response.use(
  (response) => {
    const payload = response?.data?.data ?? response?.data;
    return { ...response, data: payload };
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    /* ================= NETWORK ERROR ================= */
    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest?.url || "";

    /* ================= SKIP CASES ================= */

    if (status === 401 && url.includes("/auth/me")) {
      return Promise.reject(error);
    }

    if (status === 401 && url.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (status === 401 && url.includes("/auth/refresh-token")) {
      isRefreshing = false;
      processQueue(new Error("Refresh token expired"));

      // HARD RESET (correct behavior)
      window.location.href = "/login";

      return Promise.reject(error);
    }

    /* ================= REFRESH FLOW ================= */

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => apiClient(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await apiClient.post("/auth/refresh-token");

        // 🔥 CRITICAL: Sync React Query
        await queryClient.invalidateQueries({ queryKey: ["me"] });

        isRefreshing = false;
        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(new Error("Token refresh failed"));

        // HARD RESET
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
