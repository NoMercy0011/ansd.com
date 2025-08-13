"use client" // Ajoutez cette directive au début

import { useState } from "react";

export function Select({ 
  items, 
  selected, 
  onSelect 
}: {
  items: string[];
  selected: string;
  onSelect: (item: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white w-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {items.map((item) => (
            <button
              key={item}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                item === selected ? 'bg-gray-100 font-medium' : ''
              }`}
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}