
"use client"

import { Moon, ShieldCheck, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import DefaultMan from "@/public/avatarMan.png"


export default function HeaderVendeur() {
    const { resolvedTheme, setTheme } = useTheme();

    const ThemeSwitcher = ({ theme, setTheme }: { theme: string | undefined, setTheme: Dispatch<SetStateAction<string>>}) => {
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
};
  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 py-2 z-20 flex-shrink-0 sticky top-0"> 
    <nav className="flex items-center space-x-2"><button className={`px-4 py-2 font-semibold rounded-lg text-xl capitalize text-red-600`}>Commercial</button></nav>
    <div className="flex items-center space-x-4">
        <ThemeSwitcher theme={resolvedTheme} setTheme={setTheme} />
        <div className="flex items-center space-x-2"><ShieldCheck size={16} className="text-slate-500"/>
            {/* <select value={userRole} onChange={e => setUserRole(e.target.value)} className="bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded-md text-sm p-1 text-slate-800 dark:text-slate-200"><option value="admin">Admin</option><option value="vendeur">Vendeur</option></select></div> */}
        </div>
        
        <Image src={DefaultMan} alt="Avatar" className="w-9 h-9 rounded-full" />
    </div>
    </header>
  );
}