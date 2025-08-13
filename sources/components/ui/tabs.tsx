"use client"

import { cn } from "@/sources/lib/utils";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ children, className }: TabsProps) {

  return (
    <div className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabList({ children, className }: TabListProps) {
  return (
    <div className={cn("flex border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  activeTab?:string;
  setActiveTab : (value : string) => void;
}

export function Tab({ value, icon, children, className,activeTab, setActiveTab}: TabProps) {
  return (
    <button
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:text-orange-600",
        "data-[active=true]:border-orange-600 data-[active=true]:text-orange-600",
        className
      )}
      data-active={value === activeTab}
      onClick={() => setActiveTab(value)}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
}

export function TabPanel({ value, children, className,activeTab }: TabPanelProps) {
  return (
    <div
      className={cn("mt-2", className)}
      hidden={value !== activeTab}
    >
      {children}
    </div>
  );
}