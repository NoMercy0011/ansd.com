import { cn } from "@/sources/lib/utils";
import { Loader2 } from "lucide-react";
import { Url } from "url";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | 'print' | 'outline';
  size?: "sm" | "default" | "lg";
  icon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?:boolean;
  href?:  Url;
}

export function Button({
  className,
  variant = "primary",
  size = "default",
  icon,
  isLoading = false,
  isDisabled = false,
  children,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500", 
    secondary: "bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-slate-600 focus-visible:ring-red-500", 
    ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    print: "px-4 py-2 bg-purple-600 text-white hover:shadow-lg transition-all hover:bg-purple-800",
    outline: "px-4 py-2 border-1 border-gray-400 bg-gray-200 text-gray-600 hover:shadow-lg transition-all hover:bg-gray-500 hover:text-wh"
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none disabled:opacity-50 cursor-pointer disabled:cursor-text",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

