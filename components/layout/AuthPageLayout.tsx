"use client";
import React from "react";

export const AuthPageLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100"
    style={{ minHeight: "100vh" }}
  >
    <div className="mb-8 flex flex-col items-center"></div>
    {children}
  </div>
);
