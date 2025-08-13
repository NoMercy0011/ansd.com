// components/Header.tsx
"use client"

import { Bell, Search } from "lucide-react";
import {  useEffect, useState } from "react";
import DefaultMan from "@/public/avatarMan.png"
import Image from "next/image";


export default function HeaderAdmin() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200/80 dark:border-slate-700/80 p-4 flex justify-between items-center sticky top-0 z-10">
        <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Bonjour, Admin !</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Ravi de vous revoir.</p>
        </div>
        <div className="flex items-center gap-4">
            <button 
            // onClick={() => useAppContext().setCommandBarOpen(true)} 
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
                <Search size={20} />
            </button>
            <div className="relative">
                <Bell size={20} className="text-slate-500 dark:text-slate-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center gap-3">
                <Image src={DefaultMan} alt="Avatar" className="w-10 h-10 rounded-full border " />
                <div className="hidden md:block">
                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-100">Admin</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">admin</p>
                </div>
            </div>
        </div>
    </header>
  );
}