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
    ghost: "hover:bg-accent text-muted-foreground hover:text-foreground",
    primary:
      "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md",
    danger: "hover:bg-danger/10 text-danger hover:text-danger/80",
    success:
      "bg-success hover:bg-success/90 text-primary-foreground shadow-sm hover:shadow-md",
  };

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      className={`
        p-2 rounded-md transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1
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
