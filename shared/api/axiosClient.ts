import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/shared/types";
import { emitAuthSessionExpired } from "./authSessionEvents";

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
    const envelope = response?.data as
      | (ApiResponse<unknown> & { timestamp?: string })
      | undefined;

    const payload = envelope?.data ?? response?.data;
    const meta = {
      success: envelope?.success,
      message: envelope?.message,
      timestamp: envelope?.timestamp,
    };

    return { ...response, data: payload, meta };
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest?.url || "";

    const isLogin = url?.endsWith("/auth/login");
    const isLogout = url?.endsWith("/auth/logout");
    const isRefresh = url?.endsWith("/auth/refresh-token");

    /* ================= SKIP CASES ================= */

    if (status === 401 && (isLogin || isLogout)) {
      return Promise.reject(error);
    }

    /* ================= REFRESH TOKEN EXPIRED ================= */

    if (status === 401 && isRefresh) {
      isRefreshing = false;
      processQueue(new Error("Refresh token expired"));

      emitAuthSessionExpired("refresh-token-expired");
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

        // optional: keep this if you want fresh user data
        // (this is okay since it's not destructive like clear)
        // you can also move this out if you want strict purity

        isRefreshing = false;
        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(new Error("Token refresh failed"));

        const axiosRefreshError = refreshError as AxiosError | undefined;
        const refreshRequestUrl = axiosRefreshError?.config?.url || "";

        const alreadyHandled =
          axiosRefreshError?.response?.status === 401 &&
          refreshRequestUrl.endsWith("/auth/refresh-token");

        if (!alreadyHandled) {
          emitAuthSessionExpired("refresh-token-failed");
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
