import { cn } from "../utils/cn"; // Función opcional para concatenar clases
import React from "react";

// Tipos de variantes disponibles
type ButtonVariant = "primary" | "secondary" | "danger" | "outline";

// Props del botón
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-400",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-400",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin w-4 h-4 border-2 border-t-transparent border-white rounded-full" />
      ) : (
        <>
          {leftIcon && <span className="w-4 h-4">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="w-4 h-4">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
