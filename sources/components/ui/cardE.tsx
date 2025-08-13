
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
//   variant?: "default" | "hover";
//   value?: string;
//   change?: string;
//   icon?: LucideIcon;
//   color?: string;
// }

// export function Card({ 
//   className, 
//   variant = "default", 
//   ...props 
// }: CardProps) {
//   return (
//     <div
//       className={cn(
//         "rounded-md border-1 border-gray-400 bg-white shadow-sm",
//         variant === "hover" && "hover:shadow-md transition-shadow",
//         className
//       )}
//       {...props}
//     />
//   );
// }

interface CardProps {
  children ?: ReactNode;
  className?: string;
  title?: string;
  titleIcon?: LucideIcon;
  icon?: LucideIcon;
  actions?: string;
  label?: string;
  value?: string | number;
  color?: {
    bg: string;
    text: string;
  }
}

export function Card ({ children, className = '', title, titleIcon: TitleIcon, actions } : CardProps) {
   return (
    <div className={`bg-white dark:bg-slate-800/50 rounded-xl shadow-lg shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 ${className}`}>
        {title && (
            <div className="p-4 flex justify-between items-center border-b border-slate-200/50 dark:border-slate-700/50">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-3">
                    {TitleIcon && <TitleIcon className="text-red-500" size={20} />}
                    {title}
                </h2>
                {actions && <div>{actions}</div>}
            </div>
        )}
        <div className="p-4 md:p-6">
            {children}
        </div>
    </div>
);
}

export function StatCard({ icon: Icon, label, value, color} : CardProps) {
  return(
    <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl shadow-lg shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-5">
        <div className={`p-3 rounded-full bg-opacity-10 text-white/80 ${color?.bg} ${color?.text}`}>
          {Icon && <Icon size={24} />}
        </div>
      <div>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{value}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}