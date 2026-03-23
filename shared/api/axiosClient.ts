import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// Removing direct import: import { queryClient } from "./queryClient";
// In axios interceptors, outside of components, we have to either import the singleton
// or redirect. We have one singleton `queryClient` which we'll use here,
// so let's import the one true queryClient instance.
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

const redirectToLogin = () => {
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/login")
  ) {
    window.location.href = "/login";
  }
};

/* ================= RESPONSE TRANSFORM ================= */

apiClient.interceptors.response.use(
  (response) => {
    const payload = response?.data?.data ?? response?.data;
    const meta = {
      success: response?.data?.success,
      message: response?.data?.message,
      timestamp: response?.data?.timestamp,
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

    if (
      status === 401 &&
      url.includes("/auth/me") &&
      typeof document !== "undefined" &&
      !document.cookie.includes("refreshToken")
    ) {
      return Promise.reject(error);
    }

    if (status === 401 && url.includes("/auth/refresh-token")) {
      isRefreshing = false;
      processQueue(new Error("Refresh token expired"));
      queryClient.clear(); // clear all cached queries on session expiry
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

        // Invalidate me query so UI reflects fresh auth state
        await queryClient.invalidateQueries({ queryKey: ["me"] }); // keep fallback since it's hard to import const here simply if cyclic

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
