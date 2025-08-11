"use client"

import { Button, Select } from '@/src/components/ui';
import { UserMinus, UserPlus, UserRoundCogIcon } from 'lucide-react';
import React, { useState } from 'react'
import OnLineTable from './OnLineTable';
import ActiveTable from './ActiveTable';
import QuitteTable from './QuitteTable';
import { useEnseignant } from '@/hooks/useModerator';

export default function EnseignantList() {
    const { actifs, enseignantsError, enseignantsLoading, quittes, onLine} = useEnseignant();

    const [activeSection, setActiveSection] = useState<"onLine" | "new" | "quit">("onLine");

  if(enseignantsError) {
    return (
      <div className='text-red-600 font-bold'>
        { enseignantsError }
      </div>
    )
  }
  return (
    <>
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "onLine" ? "border-green-600 text-green-600" : "border-transparent hover:text-green-500"}`}
          onClick={() => setActiveSection("onLine")}
        >
          <div className="flex items-center gap-2">
            <UserRoundCogIcon className="h-4 w-4" /> En ligne
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "new" ? "border-sky-600 text-sky-600" : "border-transparent hover:text-sky-500"}`}
          onClick={() => setActiveSection("new")}
        >
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Enseignants
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "quit" ? "border-red-600 text-red-600" : "border-transparent hover:text-red-500"}`}
          onClick={() => setActiveSection("quit")}
        >
          <div className="flex items-center gap-2">
            <UserMinus className="h-4 w-4" /> Quittés
          </div>
        </button>
      </div>

      { enseignantsLoading ? (<div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-full h-8 sm:w-48 bg-gray-400 rounded-lg animate-pulse" >
            &nbsp;
          </div>
          <div className="w-full h-8 sm:w-48 bg-gray-400 rounded-lg animate-pulse" >
            &nbsp;
          </div>
          <div className="w-full h-8 sm:w-48 bg-gray-400 rounded-lg animate-pulse" >
            &nbsp;
          </div>
          <div className="ml-auto h-8 bg-gray-400 animate-pulse w-20 rounded-lg">&nbsp;
          </div>
        </div>
      </div>) :
      (<div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <Select 
            placeholder="Niveau" 
            options={["Tous", "Terminale", "1ère", "2nde", "3ème"]}
            className="w-full sm:w-48"
          />
          <Select 
            placeholder="Classe" 
            options={["Toutes", "A", "B", "C"]}
            className="w-full sm:w-40"
          />
          <Select 
            placeholder="Période" 
            options={["Année", "Trimestre 1", "Trimestre 2"]}
            className="w-full sm:w-48"
          />
          <Button variant="secondary" size="sm" className="ml-auto">
            Appliquer
          </Button>
        </div>
      </div>)}

      {/* Contenu des sections */}
      <div className="space-y-6">
        {activeSection === "onLine" && (
          <div>
            { enseignantsLoading ? <h3 className="text-lg font-semibold mb-4 w-50 rounded-lg bg-gray-400 animate-pulse">&nbsp;</h3> : 
            <h3 className="text-lg font-semibold mb-4">Enseignants connectés</h3>}
            <OnLineTable />
            {!enseignantsLoading && onLine.enseignants?.length === 0 &&  <div className='flex justify-center text-center bg-white/70 text-sm h-10 items-center rounded-sm mt-0.5'> aucune enseignant en ligne !</div> }
          </div>
        )}

        {activeSection === "new" && (
          <div>
            { enseignantsLoading ? <h3 className="text-lg font-semibold mb-4 w-50 rounded-lg bg-gray-400 animate-pulse">&nbsp;</h3> : 
            <h3 className="text-lg font-semibold mb-4">Liste des enseignants</h3>}

            <ActiveTable />
            {!enseignantsLoading && actifs.enseignants?.length === 0 &&  <div className='flex justify-center text-center bg-white/70 text-sm h-10 items-center rounded-sm mt-0.5'> Donnée vide pour l&apos; instant !</div> }
          </div>
        )}

        {activeSection === "quit" && (
          <div>
            { enseignantsLoading ? <h3 className="text-lg font-semibold mb-4 w-50 rounded-lg bg-gray-400 animate-pulse">&nbsp;</h3> : 
            <h3 className="text-lg font-semibold mb-4">Enseignants Quittés</h3>}
            <QuitteTable />
            {!enseignantsLoading && quittes.enseignants?.length === 0 &&  <div className='flex justify-center text-center bg-white/70 text-sm h-10 items-center rounded-sm mt-0.5'> Donnée vide pour l&apos; instant !</div> }
          </div>
        )}
      </div>
    </>
  )
}
