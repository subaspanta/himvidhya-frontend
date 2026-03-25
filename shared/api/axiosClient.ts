import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { queryClient } from "./queryClient";
import Router from "next/router";
import type { ApiResponse } from "@/shared/types";
import { QUERY_KEYS } from "@/config/constants";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
});

/* ================= QUEUE ================= */

let isRefreshing = false;
const PROTECTED_PREFIXES = ["/home"];

const isProtectedPath = (pathname: string) =>
  PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

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

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;

    if (isProtectedPath(pathname) && !pathname.includes("/login")) {
      Router.push("/login");
    }
  }
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

    /* ================= NETWORK ERROR ================= */
    if (!error.response) {
      return Promise.reject(error);
    }
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response.status;
    const url = originalRequest?.url || "";

    /* ================= SKIP CASES ================= */
    if (status === 401 && url.includes("/auth/login")) {
      return Promise.reject(error);
    }

    if (status === 401 && url.includes("/auth/logout")) {
      return Promise.reject(error);
    }

    if (status === 401 && url.includes("/auth/refresh-token")) {
      isRefreshing = false;
      processQueue(new Error("Refresh token expired"));
      queryClient.clear();
      redirectToLogin();
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

        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.currentUser,
        });

        isRefreshing = false;
        processQueue(null);

        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(new Error("Token refresh failed"));
        queryClient.clear();
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
