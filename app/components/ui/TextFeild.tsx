import React from "react";

type TextFieldProps = {
  name?: string;
  label?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  className?: string;
  error?: string | boolean | null;
};

function friendlyName(name?: string) {
  if (!name) return "";
  return name
    .trim()
    .replace("_id", "")
    .replace(/[\W_]+/g, " ")
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default function TextField({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  required,
  autoFocus,
  className,
  error,
}: TextFieldProps) {
  const labelText = label || friendlyName(name);
  const hasError = !!error;

  return (
    <div className={className}>
      {labelText && (
        <label
          htmlFor={name}
          className={`mb-1 block text-sm font-medium ${
            hasError ? "text-red-600" : "text-slate-600"
          }`}
        >
          {labelText}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value={value as any}
        onChange={onChange}
        type={type}
        placeholder={placeholder || friendlyName(name)}
        disabled={disabled}
        autoFocus={autoFocus}
        className={`w-full h-11 rounded-md bg-white text-slate-900 placeholder:text-slate-400 border ${
          hasError ? "border-red-500" : "border-gray-300"
        } px-3 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
          disabled:bg-slate-100 disabled:text-slate-500`}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />

      {hasError && typeof error === "string" && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
