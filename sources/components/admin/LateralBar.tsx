// components/LateralBar.tsx
"use client"

import { usePathname } from "next/navigation";
import { Briefcase, Calendar, LayoutDashboard, LogOut, Moon, Printer, Sun, Users } from "lucide-react";
import Link from "next/link";
import logoutAction from "@/sources/actions/auth/auth.action";
import { useTheme } from "next-themes";


export default function LateralBarAdmin() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
  

  const modules = [
    { id: 'dashboard', name: 'Tableau de Bord', icon: LayoutDashboard, link: '/admin' },
    { id: 'annuaire', name: 'Annuaire', icon: Users, link: '/admin/annuaire' },
    { id: 'production', name: 'Production', icon: Printer, link: '/admin/production' },
    { id: 'planning', name: 'Mon planning', icon: Calendar, link: '/admin/planning' },
    { id: 'rh', name: 'Mon Espace RH', icon: Briefcase, link: '/admin/rh' },
  ];

    const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (moduleLink: string) => {
    if (moduleLink === '/admin') return pathname === '/admin';
    return pathname.startsWith(moduleLink);
  };

  return (
    <div className=" min-h-screen sticky top-0 z-10 bg-slate-50 dark:bg-slate-900 font-sans flex transition-colors duration-300">
            <aside className="w-20 lg:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col p-4 shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-center lg:justify-start space-x-3 p-2 mb-6">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg"><span className="text-white text-xl font-bold">ans</span></div>
                    <h1 className="text-xl font-bold text-white hidden lg:block">ORION</h1>
                </div>
                <nav className="flex flex-col space-y-2">
                    {modules.map(module => {
                        const active = isActive(module.link);
                        return ( 
                        <Link key={module.id} href={module.link} //onClick={() => setActiveTab(module.id)} 
                           className={`flex items-center justify-center lg:justify-start space-x-3 p-3 rounded-lg transition-colors text-sm font-medium group ${active ?  'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                           title={module.name}>
                            <module.icon size={22} />
                            <span className="hidden lg:inline">{module.name}</span>
                        </Link>)
                    })}
                </nav>
                <div className="mt-auto">
                    <div className="flex items-center justify-center lg:justify-start mt-4">
                        <button onClick={toggleTheme}  className="flex items-center justify-center gap-2 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-xs w-full">
                            {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            <span className="hidden lg:inline">{resolvedTheme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start mt-2">
                        <button onClick={logoutAction} className="flex items-center justify-center gap-2 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-xs w-full">
                            <LogOut size={20} />
                            <span className="hidden lg:inline">Déconnexion</span>
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 flex flex-col">
                
            </main>
        </div>
  );
}