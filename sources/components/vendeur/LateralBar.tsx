// components/LateralBar.tsx
"use client"

import { usePathname, useRouter } from "next/navigation";
import { Bot, FileClock, FileSignature, LogOut,  ShoppingBasket, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import logoutAction from "@/sources/actions/auth/auth.action";


export default function LateralBarVendeur() {
    const pathname = usePathname();
    const router = useRouter();

    const Logout = async () => {
        await logoutAction();
        router.push('/login');
    }

  const modules = [
    { id: 'point-de-vente', name: 'Point de Vente', icon: ShoppingBasket, link: '/vendeur/point-de-vente' },
    { id: 'clients', name: 'Clients', icon: Users, link: '/vendeur/clients' },
    { id: 'factures-proforma', name: 'Proformas', icon: FileClock, link: '/vendeur/factures-proforma' },
    { id: 'factures-commerciales', name: 'Factures & Tickets', icon: FileSignature, link: '/vendeur/factures-commerciales' },
    { id: 'commandes', name: 'Commandes', icon: ShoppingCart, link: '/vendeur/commandes' },
    { id: 'automatisation', name: 'Automatisation', icon: Bot, link: '/vendeur/automatisation' },
  ];


  const isActive = (moduleLink: string) => {
    if (moduleLink === '/vendeur/point-de-vente') return pathname === '/vendeur/point-de-vente';
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
                        <Link key={module.id} href={module.link}
                           className={`flex items-center justify-center lg:justify-start space-x-3 p-3 rounded-lg transition-colors text-sm font-medium group ${active ?  'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                           title={module.name}>
                            <module.icon size={22} />
                            <span className="hidden lg:inline">{module.name}</span>
                        </Link>)
                    })}
                </nav>
                <div className="mt-auto">
                    <div className="flex items-center justify-center lg:justify-start mt-2">
                        <button onClick={Logout} className="flex items-center justify-center gap-2 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-xs w-full">
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