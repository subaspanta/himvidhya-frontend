// app/components/providers/AuthProvider.tsx
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "@/app/store/auth.store";
import { apiClient } from "@/app/lib/apiClient";
import { userSchema } from "@/app/store/auth.schemas";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, logout } = useAuthStore();
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookies.get("token");

      if (token) {
        try {
          // 1. Set the token in the API client immediately
          apiClient.defaults.headers.common["Authorization"] =
            `Bearer ${token}`;

          // 2. Fetch the latest user profile from backend
          const { data } = await apiClient.get("/auth/profile");

          // 3. Validate and update the store
          const validatedUser = await userSchema.validate(data);
          // Ensure validatedUser has username property
          setAuth({ ...validatedUser, username: data.username ?? "" }, token);
        } catch (error) {
          console.error("Hydration failed:", error);
          logout(); // Clear invalid tokens
        }
      }
      setIsHydrating(false);
    };

    initAuth();
  }, [setAuth, logout]);

  // Optional: Prevent flickering by showing a loader while checking auth
  if (isHydrating) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};
