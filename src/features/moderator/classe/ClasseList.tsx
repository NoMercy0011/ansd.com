"use client"

import { useClasse, useNiveau, useSection } from '@/hooks/useModerator';
import { Button, Card } from '@/src/components/ui';
import { TableOfContentsIcon } from 'lucide-react';
import Link from 'next/link';
import React, {useState } from 'react'

// const mockClasses = [
//   { id: "CLA-2023-1",niveau: "Terminale", nom: "A", effectif: 32, responsable: "Prof. Diallo", moyenne: 14.2,topStudents: 8,aboveAverage: 24,belowAverage: 4},
//   { id: "CLA-2023-2", niveau: "Terminale", nom: "B", effectif: 28, responsable: "Prof. Konaté", moyenne: 13.7,topStudents: 8,aboveAverage: 10,belowAverage: 2},
//   { id: "CLA-2023-3", niveau: "1ère", nom: "B", effectif: 25, responsable: "Prof. Ndiaye", moyenne: 12.9,topStudents: 8,aboveAverage: 17,belowAverage: 0},
//   { id: "CLA-2023-4",niveau: "1ère", nom: "B", effectif: 30,responsable: "Prof. Traoré", moyenne: 11.8,topStudents: 5,aboveAverage: 19,belowAverage: 6},
//   { id: "CLA-2023-5", niveau: "2nde", nom: "A", effectif: 29, responsable: "Prof. Rakoto", moyenne: 13.5, topStudents: 10, aboveAverage: 19, belowAverage: 0},
//   { id: "CLA-2023-6", niveau: "2nde", nom: "B", effectif: 31, responsable: "Prof. Razafy", moyenne: 12.9, topStudents: 12, aboveAverage: 18, belowAverage: 1},
// ]

export default function ClasseList() {
    //const { classes, niveaux, sections, error, isLoading } = useModerator();
      const { classes,classesLoading } = useClasse();
      const { niveaux, niveauxLoading, niveauxError} = useNiveau();
      const { sections, sectionsLoading, sectionsError} = useSection();

    //const [selectedLevel, setSelectedLevel] = useState("Terminale");
    //const [selectedClass, setSelectedClass] = useState("CLA-2023-1");
    const [isLoading, setIsLoading] = useState(false);


    // const currentClass = mockClasses.find(c => c.id === selectedClass);
  
    // // Filtrer les classes par niveau
    // const filteredClasses = selectedLevel === "Tous les niveaux" 
    //   ? mockClasses 
    //   : mockClasses.filter(c => c.niveau === selectedLevel);
  
  return (
    <>
      <div className="flex flex-grid gap-8">
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
              {niveaux?.map((niveau : any) => (
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
            { sections?.map((section : any) => (
                <React.Fragment key={section.id_section}>
                    <option value={section.id_section} >{section.section} </option>
                </React.Fragment>
            ))}
            </>)
            }
        </select>
      </div>

      {/* Liste des classes */}
      <Card>
        <div className="overflow-x-auto rounded-2xl border-2 border-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Niveau</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              { classesLoading === true ? 
              (<>
              <tr className='animate-pulse mb-5'>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  
              </tr> 
              <tr className='animate-pulse mt-5'>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  <td className='h-1 text-gray-400 text-center ml-5 px-6 py-4 whitespace-nowrap font-medium'> <TableOfContentsIcon className='w-full animate-pulse'/> </td>
                  
              </tr>
              </> ) : (
                <>
                {classes.map((classe : any) => (
                  <tr key={classe.id_classe} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {classe.classe}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {classe.responsable.nom} {classe.responsable.prenom} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {classe.niveau.niveau}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {classe.section.section}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/moderator/classe/gestion/${classe.id_classe}`} onClick={() => setIsLoading(true)}>
                      <Button variant="ghost" size="sm" disabled={isLoading} >
                        { isLoading ? <div className='text-gray-600 animate-pulse'> Gérer... </div> : 'Gérer'}
                      </Button>
                      </Link>
                    </td>
                  </tr>
                  ))}
                </>
                )
              }
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
