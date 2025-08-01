"use client"

import { useClasse, useNiveau, useSection } from '@/hooks/useModerator';
import { Button, Card } from '@/src/components/ui';
import { TableOfContentsIcon } from 'lucide-react';
import Link from 'next/link';
import React, {useState } from 'react'


export default function ClasseList() {
      const { classes,classesLoading } = useClasse();
      const { niveaux, niveauxLoading, niveauxError} = useNiveau();
      const { sections, sectionsLoading, sectionsError} = useSection();

    const [isLoading, setIsLoading] = useState(false);


  
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
                {classes.map((classe) => (
                  <tr key={classe.id_classe} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {classe.classe}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {classe?.responsable?.nom} {classe?.responsable?.prenom} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {classe?.niveau?.niveau}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {classe.section?.section}
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
