// components/ui/button.tsx
import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  // Styles de base
  const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  // Variants
  const variantStyles = {
    primary: "bg-gradient-to-r from-orange-600 to-pink-700 text-white hover:from-orange-700 hover:to-pink-800 shadow-sm",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm",
    ghost: "hover:bg-gray-100 text-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    outline: "bg-white/70 border border-stone-300 text-gray-700 hover:bg-stone-50 shadow-sm"
  };

  // Tailles
  const sizeStyles = {
    sm: "h-9 px-4 py-2",
    md: "h-10 px-6 py-2",
    lg: "h-11 px-8 py-2"
  };

  // Combinaison des classes
  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}