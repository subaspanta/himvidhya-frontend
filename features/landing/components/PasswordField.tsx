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
      <div className={cn("space-y-2", className)}>
        {labelText && (
          <label
            htmlFor={name}
            className={cn(
              "block text-sm font-medium transition-colors",
              hasError ? "text-danger" : "text-foreground",
            )}
          >
            {labelText}
            {required && <span className="ml-1 text-danger">*</span>}
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
              "w-full h-11 px-4 pr-12 rounded-md transition-all duration-200",
              "bg-surface text-foreground placeholder:text-muted-foreground font-medium",
              "border border-border shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError && "border-danger focus:ring-danger focus:border-danger",
            )}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "p-1.5 rounded-md transition-all duration-200",
              "text-muted-foreground hover:text-foreground hover:bg-accent",
              "focus:outline-none focus:ring-2 focus:ring-accent",
            )}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              name={showPassword ? "eyeOff" : "eye"}
              size="md"
              className="text-current bg-transparent rounded-md"
            />
          </button>
        </div>

        {hasError && typeof error === "string" && (
          <p
            id={`${name}-error`}
            className="text-sm text-danger mt-1 animate-in fade-in slide-in-from-top-1"
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
