// AuthPageLayout.tsx
"use client";
import React from "react";
import Image from "next/image";

export const AuthPageLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-blue-100"
    style={{ minHeight: "100vh" }}
  >
    <div className="mb-8 flex flex-col items-center">
      {/* Replace with your logo image or SVG */}
      <Image
        src="/logo.svg"
        alt="ChatApp Logo"
        width={64}
        height={64}
        className="h-16 w-16 mb-2"
        priority
      />
      <span className="text-2xl font-bold text-blue-700 tracking-wide">
        ChatApp
      </span>
    </div>
    {children}
  </div>
);
