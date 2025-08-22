
"use client"

import HeaderVendeur from "@/sources/components/vendeur/Header";
import LateralBarVendeur from "@/sources/components/vendeur/LateralBar";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex transition-colors duration-300">
        <LateralBarVendeur />
        <main className="flex-1 flex flex-col">
          <HeaderVendeur />
          <div className="p-4 md:p-6 lg:p-8 animate-fade-in flex-1 overflow-y-auto bg-slate-100/50 dark:bg-slate-900/50">
            {children}
          </div>
        </main>
    </div>
  );
}