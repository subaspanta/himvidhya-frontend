import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
});

// If a token is already in localStorage, set it on startup
const token =
  typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
