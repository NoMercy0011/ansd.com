import { cn } from "@/src/lib/utils";
import { LucideIcon } from "lucide-react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover";
  value?: string;
  change?: string;
  icon?: LucideIcon;
  color?: string;
}

export function Card({ 
  className, 
  variant = "default", 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border-1 border-gray-400 bg-white shadow-sm",
        variant === "hover" && "hover:shadow-md transition-shadow",
        className
      )}
      {...props}
    />
  );
}

// interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function CardHeader({ className, ...props }: any) {
//   return <div className={cn("p-6", className)} {...props} />;
// }

// interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// export function CardContent({ className, ...props }: any) {
//   return <div className={cn("p-6 pt-0", className)} {...props} />;
// }