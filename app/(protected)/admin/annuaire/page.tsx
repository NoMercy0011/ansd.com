"use client"

import { Search } from 'lucide-react';
import React, { useState } from 'react'
import DefaultMan from "@/public/avatarMan.png"
import DefaultWoman from "@/public/avatarWoman.png"
import Image from 'next/image';

export default function Page() {

  const [searchTerm, setSearchTerm] = useState('');
  const filteredPersonnel =  [
    {
      id: 'personne-a', matricule: 'E001', name: 'Ando Rakoto', email: 'a.rakoto@ans.mg', password: 'password123', role: 'ROLES.EMPLOYEE', avatar: DefaultWoman, position: 'Opérateur Prépresse',
      managerId: 'admin-d', hireDate: new Date('2022-03-15'), jobHistory: ['Opérateur Finition (2022-2024)', 'Opérateur Prépresse (2024-...)'],
      skills: ['Suite Adobe', 'Maintenance préventive presse Heidelberg', 'CACES 3'],
      leaveBalance: { paid: 12.5, rtt: 3 },
      documents: [{id: 'DOC-PERSO-1', type: 'Contrat de Travail', url: '#'}],
      address: '12 Làlana ny Voninkazo, 101 Antananarivo', phone: '0341234567', rib: 'MG76 3000 4000 0500 0012 3456 789',
      salary: 1800000,
      lateArrivals: { month: 2 },
      lateJustifications: [],
      performance: {
          monthlyScore: 8.5,
          strengths: ['Grande autonomie', 'Qualité de travail constante', 'Respecte les délais'],
          improvements: ['Communication proactive sur les blocages potentiels', 'Prendre plus d\'initiative sur les problèmes mineurs'],
      },
      feedback: [{ date: new Date('2025-07-25'), from: 'Riana Vololona', comment: 'Excellent travail sur le dossier Quantum. Très proactif.', rating: 5 }],
      objectives: [{ id: 'OBJ-1', text: 'Réduire le taux d\'erreur en conception de 5%', progress: 60 }, { id: 'OBJ-2', text: 'Se former sur la nouvelle découpeuse laser', progress: 20 }],
    },
     {
      id: 'personne-c', matricule: 'E002', name: 'Faly Andriana', email: 'f.andriana@ans.mg', password: 'password123', role: 'ROLES.EMPLOYEE', avatar: DefaultMan, position: 'Graphiste',
      managerId: 'admin-d', hireDate: new Date('2021-09-01'), jobHistory: ['Graphiste Junior (2021-2023)', 'Graphiste (2023-...)'],
      skills: ['Figma', 'Illustrator', 'Motion Design'],
      leaveBalance: { paid: 20, rtt: 8 },
      documents: [{id: 'DOC-PERSO-2', type: 'Contrat de Travail', url: '#'}],
      address: '45 Arabe ny Repoblika, 101 Antananarivo', phone: '0328765432', rib: 'MG76 1234 5678 9012 3456 7890 123',
      salary: 2200000,
      lateArrivals: { month: 0 },
      lateJustifications: [],
      performance: {
          monthlyScore: 9.2,
          strengths: ['Créativité exceptionnelle', 'Rapidité d\'exécution'],
          improvements: ['Respect des contraintes techniques d\'impression'],
      },
      feedback: [{ date: new Date('2025-08-10'), from: 'Riana Vololona', comment: 'Les propositions pour le client Orinasa Masoandro étaient superbes mais ont nécessité quelques ajustements techniques.', rating: 4 }],
      objectives: [{ id: 'OBJ-3', text: 'Proposer 3 nouvelles pistes graphiques pour la campagne interne', progress: 100 }],
    },
    {
      id: 'admin-d', matricule: 'A001', name: 'Riana Vololona', email: 'r.vololona@ans.mg', password: 'adminpass', role: 'ROLES.ADMIN', avatar: DefaultWoman, position: 'Directrice Générale',
    },
     {
      id: 'personne-b', matricule: 'E003', name: 'Mamy Andria', email: 'm.andria@ans.mg', password: 'password123', role: 'ROLES.EMPLOYEE', avatar: DefaultMan, position: 'Graphiste',
    },
    {
      id: 'personne-d', matricule: 'E004', name: 'Fara Rasoa', email: 'f.rasoa@ans.mg', password: 'password123', role: 'ROLES.EMPLOYEE', avatar: DefaultWoman, position: 'Chef d\'atelier',
    },
  ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Annuaire des Employés</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Retrouvez rapidement les membres de votre équipe.</p>
            </div>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text"
                    placeholder="Rechercher un employé par nom ou poste..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-12 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-red-500"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPersonnel.map(person => (
                    <div key={person.id} className="text-center bg-white dark:bg-slate-800/50 p-6 rounded-xl shadow-lg shadow-slate-200/40 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 transform hover:-translate-y-1 transition-transform duration-300">
                        <Image src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-700" />
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{person.name}</h3>
                        <p className="text-sm text-red-500">{person.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
