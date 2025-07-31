// app/moderator/layout.tsx
"use client"

import {useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/src/components/moderator/Header";
import LateralBar from "@/src/components/moderator/LateralBar";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Détermine le titre en fonction de la route
  const getTitle = () => {
    const titles: Record<string, string> = {
      // '/moderator': 'Tableau de Bord',
      // '/moderator/etudiant': '',
      // '/moderator/enseignant': 'Gestion des Enseignants',
      // '/moderator/classe': 'Classes',
      // '/moderator/matiere': 'Emploi du temps',
      // '/moderator/bulletin': 'Bulletins',
      // '/moderator/certificat': 'Certificats',
      // '/moderator/parametre': 'Paramètres'
    };
    
    return titles[pathname] || 'Lycée Privée Mihary Andraisoro (LPMA)';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <LateralBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="lg:ml-64">
        <Header title={getTitle()} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="p-6">
          {children}
        </main>
      </div>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}