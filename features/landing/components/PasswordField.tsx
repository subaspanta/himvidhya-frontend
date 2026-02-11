"use client";

import React, { ForwardedRef, InputHTMLAttributes, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/icons";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function friendlyName(name?: string) {
  if (!name) return "";
  return name
    .trim()
    .replace("_id", "")
    .replace(/[^\w]+/g, " ")
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

type PasswordFieldProps = {
  label?: string;
  className?: string;
  error?: string | boolean | null;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    { name, label, className, error, required, ...rest },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const labelText = label || friendlyName(name);
    const hasError = !!error;

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className={cn("space-y-1.5", className)}>
        {labelText && (
          <label
            htmlFor={name}
            className={cn(
              "block text-sm font-medium transition-colors",
              hasError ? "text-red-500" : "text-gray-700",
            )}
          >
            {labelText}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            id={name}
            name={name}
            type={showPassword ? "text" : "password"}
            ref={ref}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...rest}
            className={cn(
              "w-full h-11 px-4 pr-12 rounded-xl transition-all duration-200",
              "bg-black/5 text-gray-900 placeholder:text-gray-400 font-medium",
              "border border-black/10",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 focus:bg-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError &&
                "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50",
            )}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "p-1.5 rounded-lg transition-all duration-200",
              "text-gray-400 hover:text-gray-600 hover:bg-black/5",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            )}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              name={showPassword ? "eyeOff" : "eye"}
              size="md"
              className="text-current bg-transparent rounded-lg"
            />
          </button>
        </div>

        {hasError && typeof error === "string" && (
          <p
            id={`${name}-error`}
            className="text-xs text-red-400 mt-1 animate-in fade-in slide-in-from-top-1"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
