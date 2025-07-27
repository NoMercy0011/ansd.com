// components/LateralBar.tsx
"use client"

import { usePathname } from "next/navigation";
import { Award, BarChart3, BookOpen, Calendar, ChevronRight, FileText, GraduationCap, Menu, Settings, Users, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface LateralBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function LateralBar({ isOpen, setIsOpen }: LateralBarProps) {
  const pathname = usePathname();

  const modules = [
    { id: 'dashboard', name: 'Tableau de Bord', icon: BarChart3, link: '/moderator' },
    { id: 'etudiant', name: 'Étudiants', icon: Users, link: '/moderator/etudiant' },
    { id: 'enseignant', name: 'Enseignants', icon: GraduationCap, link: '/moderator/enseignant' },
    { id: 'classe', name: 'Classes', icon: BookOpen, link: '/moderator/classe' },
    { id: 'matiere', name: 'Emploi du temps', icon: Calendar, link: '/moderator/matiere' },
    { id: 'bulletin', name: 'Bulletins', icon: Award, link: '/moderator/bulletin' },
    { id: 'certificat', name: 'Certificats', icon: FileText, link: '/moderator/certificat' },
    { id: 'parametre', name: 'Paramètres', icon: Settings, link: '/moderator/parametre' }
  ];

  const isActive = (moduleLink: string) => {
    if (moduleLink === '/moderator') return pathname === '/moderator';
    return pathname.startsWith(moduleLink);
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-6 bg-gradient-to-r from-sky-600 to-pink-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Lova</h1>
              <p className="text-orange-100 text-sm">Admin Dashboard</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        {modules.map(module => {
          const active = isActive(module.link);
          return (
            <Link
              key={module.id}
              href={module.link}
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-gradient-to-r from-sky-700 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <module.icon className="h-5 w-5 mr-3" />
              <span className="font-medium">{module.name}</span>
              {active && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}