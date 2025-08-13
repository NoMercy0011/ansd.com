"use client"

import { cn } from "@/sources/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SelectProps {
  placeholder?: string;
  options?: string[];
  className?: string;
  onSelect?: (value: string) => void;
}

export function Select({
  placeholder,
  options,
  className,
  onSelect,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue || placeholder}</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {options?.map((option) => (
            <div
              key={option}
              className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}