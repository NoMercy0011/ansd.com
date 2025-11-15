// app/moderator/layout.tsx
"use client"

import HeaderAdmin from "@/sources/components/admin/Header";
import LateralBarAdmin from "@/sources/components/admin/LateralBar";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex transition-colors duration-300">
      <LateralBarAdmin />
        <main className="flex-1 flex flex-col">
          <HeaderAdmin />
          <div className="p-4 md:p-6 lg:p-8 animate-fade-in flex-1 overflow-y-auto bg-slate-100/50 dark:bg-slate-900/50">
            {children}
          </div>
        </main>
    </div>
  );
}