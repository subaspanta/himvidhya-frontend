import React, { ForwardedRef, InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/shared/utils";

export function friendlyName(name?: string) {
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
          <Input
            id={name}
            name={name}
            type={type}
            ref={ref}
            aria-invalid={hasError || undefined}
            aria-describedby={hasError ? `${name}-error` : undefined}
            {...rest}
            className={cn(
              "h-11 px-4 rounded-md transition-all duration-200",
              "bg-surface text-foreground placeholder:text-muted-foreground font-medium",
              "border border-border shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError && "border-danger focus:ring-danger focus:border-danger",
            )}
          />
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

TextField.displayName = "TextField";

export default TextField;
