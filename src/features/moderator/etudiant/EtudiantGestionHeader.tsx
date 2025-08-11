"use client"

import { List, Printer, UserPlus2 } from 'lucide-react'
import React, { useState } from 'react'
import { EtudiantClasseData } from '@/src/types/type';
import EleveForm from './EtudiantFrom';
import EtudiantList from './EtudiantList';

type GestionProps = {
  classeData: EtudiantClasseData;
}

export default function EtudiantGestionHeader( props :  GestionProps) {
    const [activeSection, setActiveSection] = useState<"liste" | "inscription" |"imprimer">("liste");
    const toInscription = () => {
      setActiveSection("inscription");
    }
    const toListe = () => {
      setActiveSection("liste");
    }
  return (
    <>
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "liste" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("liste")}
        >
          <div className="flex items-center gap-2">
            <List className="h-4 w-4" /> Liste
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "inscription" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("inscription")}
        >
          <div className="flex items-center gap-2">
            <UserPlus2 className="h-4 w-4" /> Inscription
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "imprimer" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("imprimer")}
        >
          <div className="flex items-center gap-2">
            <Printer className="h-4 w-4" /> Imprimer
          </div>
        </button>
        
      </div>

      <div className="space-y-6">
        {activeSection === "liste" && (
          <div>
            <EtudiantList  classeData={props.classeData} toInscription ={toInscription} />
          </div>
        )}

        {activeSection === "inscription" && (
          <div>
            <EleveForm  classeData={props.classeData} toListe={toListe}/>
          </div>
        )}

        {activeSection === "imprimer" && (
          <div>
            Module Impression de liste
          </div>
        )}
      </div>
    </>
  )
}
