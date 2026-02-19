"use client";
import React from "react";

export const AuthPageLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center bg-background"
    style={{ minHeight: "100vh" }}
  >
    <div className="mb-8 flex flex-col items-center"></div>
    {children}
  </div>
);
