import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "hover";
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

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}