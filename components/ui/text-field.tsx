import React, { ForwardedRef, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/utils";

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

type TextFieldProps = {
  label?: string;
  className?: string;
  error?: string | boolean | null;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { name, label, className, error, required, type = "text", ...rest },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const labelText = label || friendlyName(name);
    const hasError = !!error;

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
          <Input
            id={name}
            name={name}
            type={type}
            ref={ref}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...rest}
            className={cn(
              "h-11 px-4 rounded-xl transition-all duration-200",
              "bg-black/5 text-gray-900 placeholder:text-gray-400 font-medium",
              "border border-black/10",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 focus:bg-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError &&
                "border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50",
            )}
          />
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

TextField.displayName = "TextField";

export default TextField;
