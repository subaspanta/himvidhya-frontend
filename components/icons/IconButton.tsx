import Icon, { IconName, IconSize } from "./index";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  size?: IconSize;
  variant?: "ghost" | "primary" | "danger" | "success";
  isLoading?: boolean;
  ariaLabel: string; // Make required for accessibility
}

export default function IconButton({
  icon,
  size = "md",
  variant = "ghost",
  className = "",
  ariaLabel,
  isLoading = false,
  disabled,
  ...props
}: IconButtonProps) {
  const variantClasses = {
    ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "hover:bg-red-50 text-red-500 hover:text-red-600",
    success: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      className={`
        p-2 rounded-lg transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        ${variantClasses[variant]} 
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Icon name="clock" size={size} className="animate-spin" />
      ) : (
        <Icon name={icon} size={size} />
      )}
    </button>
  );
}
