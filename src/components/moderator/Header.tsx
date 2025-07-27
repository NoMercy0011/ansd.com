// components/Header.tsx
"use client"

import { Bell, Icon, LucideIcon, LucideProps, MailIcon, Menu, Search } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";

interface HeaderProps {
  title: string;
  setIsSidebarOpen : (state : boolean) => void;
}

export default function Header({ title, setIsSidebarOpen }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800"> {title}</h1>
            <p className="text-gray-600 text-sm">
              {currentTime.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
            <MailIcon className="h-5 w-5"/>
            <span className="absolute -top-1 -right-1 h-4 w-5 bg-red-500 rounded-full text-xs text-white">7</span>
          </button>
          <button className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-5 bg-red-500 rounded-full text-xs text-white">3</span>
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs">Lova</span>
          </div>
        </div>
      </div>
    </header>
  );
}