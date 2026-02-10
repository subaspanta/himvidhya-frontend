import axios from "axios";
import { handleAuthEvent } from "../auth/auth-sync";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // REQUIRED
});

// Response Interceptor: The "Safety Net"
apiClient.interceptors.response.use(
  (res) => {
    const payload = res?.data?.data ?? res?.data;
    return {
      ...res,
      data: payload,
      message: res?.data?.message,
      success: res?.data?.success,
      meta: res?.data?.meta,
      timestamp: res?.data?.timestamp,
    };
  },
  (error) => {
    if (error.response?.status === 401) {
      handleAuthEvent({ type: "SESSION_EXPIRED" });
    }
    return Promise.reject(error);
  },
);
