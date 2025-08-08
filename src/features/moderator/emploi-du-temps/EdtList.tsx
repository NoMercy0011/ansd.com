"use client"

import { useCreneau, useNiveau, useSection } from '@/hooks/useModerator'
import { Button, Card } from '@/src/components/ui'
import { ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


// Mock data réaliste
const mockClasses = [
  { id: "CLA-1", niveau: "Terminale", nom: "A" },
  { id: "CLA-2", niveau: "Terminale", nom: "B" },
  { id: "CLA-3", niveau: "1ère", nom: "A" }
];

export default function EdtList() {
    
      const { niveaux, niveauxLoading, niveauxError} = useNiveau();
      const { sections, sectionsLoading, sectionsError} = useSection();
      const { creneaux, creneauxLoading} = useCreneau();
  return (
    <>
        <div className="flex justify-between flex-grid gap-8">
          <div className="flex justify-between flex-grid gap-4">
            <select
              name="niveau"
              defaultValue={" "}
              //onChange={handleSelectChange}
              className="w-full mx-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required
          >
          <option value=""> Niveau </option>
            {niveauxError && <option value="">{ niveauxError } </option> }
            {niveauxLoading ? (<option value=""> Chargement...</option> ) :
              ( <>
                {niveaux?.map((niveau) => (
                  <React.Fragment key={niveau.id_niveau}>
                      <option value={niveau.id_niveau} >{niveau.niveau} </option>
                  </React.Fragment>
                ))}</>
              )
              }
              
            </select>
          
          <select
              name="section"
                defaultValue={" "}
                  //onChange={handleSelectChange}
                className="w-full mx-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required
            >
          <option value="">Section </option>
          {sectionsError && <option value="">{ sectionsError } </option> }
          {sectionsLoading ? (<option value=""> Chargement...</option>) : 
              (<>
                { sections?.map((section) => (
                    <React.Fragment key={section.id_section}>
                      <option value={section.id_section} >{section.section} </option>
                    </React.Fragment>
                  ))}
                </>)
                }
              </select>
            </div>
          <div className="relative flex-1 sm:w-64">
            <button type="button" className=" cursor-pointer">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:scale-110" />
            </button>
          <input
            type="text"
              placeholder="Rechercher une classe..."
            className="pl-10 w-full pr-4 py-2 text-sm border border-gray-300 outline-0 rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-transparent"
          />
          </div>
      </div>

      <Card>
        <h3 className="text-lg font-semibold p-4 border-b">Toutes les classes</h3>
        <div className="divide-y divide-gray-200">
          { creneauxLoading ? mockClasses.map( loading => ( 
            <div 
              key={loading.id} 
              className="p-4 hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium rounded-2xl bg-gray-400 animate-pulse w-15"> &nbsp;</h4>
                <p className="text-sm rounded-2xl text-gray-500 mt-1 bg-gray-400 animate-pulse w-30"> &nbsp;</p>
              </div>
              <Link  href={`/moderator/emploi-du-temps/gestion`}>
              <Button 
                variant="ghost" 
              >
                <span className='bg-gray-400 rounded-2xl animate-pulse w-10'> &nbsp; </span>
              </Button>
              </Link>
            </div>
          )) :
          (creneaux.map(creneau => (
            <div 
              key={creneau.id_classe} 
              className="p-4 hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{creneau.classe}</h4>
                <p className="text-sm text-gray-500 mt-1">{ creneau.enseignements === 0 ? <span> Aucun créneau</span> : <span> {creneau.enseignements } créneaux planifier </span> } </p>
              </div>
              <Link  href={`/moderator/emploi-du-temps/${creneau.id_classe}`}>
              <Button 
                variant="ghost"
                className='text-md' 
              >
                Planifier <ChevronRight className="h-4 w-4" />
              </Button>
              </Link>
            </div>
          )))}
        { !creneauxLoading && !creneaux.length && <div className='text-sm h-8 text-gray-500 text-center '><div className='items-center mt-2'> Créer d&apos;abord une classe pour planifer des créneaux.</div> </div>}    
        </div>
      </Card>
    </>
  )
}
