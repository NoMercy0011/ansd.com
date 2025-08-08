"use client"

import { useMatiere } from '@/hooks/useModerator'
import { DeleteMatiere } from '@/src/actions/moderator/crud.matiere.action'
import { Button, Card } from '@/src/components/ui'
import { MatiereData } from '@/src/types/type'
import { AlertTriangle, PenBoxIcon, Search, TableOfContentsIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const mockMatieres = [
    { id: 1, matiere: '&nbsp;', code: '' },
    { id: 2, matiere: '&nbsp;', code: '' },
    { id: 3, matiere: '&nbsp;', code: '' },
    { id: 4, matiere: '&nbsp;', code: '' },
]

export default function MatiereList() {
    const {matieres, matieresLoading, mutate} = useMatiere();
    const [isLoading,setIsLoading] =useState(false); 
    const [alert, setAlert] = useState('');
    const [openModal, setOpenModel] = useState(false);
    
    const colonnes = [
        'Matiere',
        'Code',
        'Section',
        'Action',
    ]
    const message = "Ne peut pas être supprimée car elle est utilisée dans des emplois du temps et les notes en cours.\n Pour le supprimer définitivement, veuillez supprimer d'abord tous les créneaux concernant cette matière."
    const handleDelete = async (matiere : MatiereData) => {
        setIsLoading(true);
        try{
          const res = (await DeleteMatiere(matiere));
          if(res.status){
            setOpenModel(true);
            setAlert(message);
          }
          
        }finally{
          setIsLoading(false);
          await mutate();
        }
    }
    const WarningModal = () => (

      <div className="fixed inset-0 text-md backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-7 text-justify">
          <AlertTriangle className='w-20 h-20 m-auto text-red-500 mb-2'/>
          <div> {alert} </div>
          <div className="text-md font-bold m-2"> </div>
          <div className="mt-6 flex justify-center space-x-3">
              <Button
                onClick={() => setOpenModel(false)}
                className="px-4 py-2 shadow bg-blue-500 border border-gray-300 rounded-md text-sm font-bold text-gray-50 hover:scale-110"
              >
                j&apos;ai compris
              </Button>
            </div>
        </div>
      </div>
    )

  return (
    <>
        { openModal && <WarningModal /> }
        <Card className='mt-5'>
                <div className='flex justify-between items-center mx-4 border-b border-b-gray-400'>
                    <h3 className="text-lg font-semibold p-4 mr-5">Listes des matieres</h3>
                <div className="relative flex-1 sm:w-60 ml-5">
                    <button type="button" className=" cursor-pointer">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:scale-110" />
                    </button>
                    <input
                    type="text"
                    placeholder="Rechercher une matière..."
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300 outline-0 rounded-lg focus:ring-1 focus:ring-blue-700 focus:border-transparent"
                    />
                </div>
                </div>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {colonnes.map((column, idx) => (
              <th 
                key={idx} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { matieresLoading ? ( mockMatieres.map( matiere => (
            <tr key={matiere.id} className='text-center text-gray-600 animate-pulse'>
                <td className='h-15'><TableOfContentsIcon className='w-20 h-5 ml-5 animate-pulse'/> {matiere.code} </td>
                <td className='w-30 h-15 '><TableOfContentsIcon className='w-20 h-5 mr-5 animate-pulse'/> {matiere.code} </td>
                <td className='w-30 h-15 '><TableOfContentsIcon className='w-20 h-5 mr-5 animate-pulse'/> {matiere.code} </td>
                <td className='w-30 h-15 '> <TableOfContentsIcon className='w-20 h-5 mr-2 animate-pulse'/> {matiere.code} </td>
            </tr>
          ))) : (
            (<>
          {matieres.map((matiere) => (
            <tr key={matiere.id_matiere} className="hover:bg-gray-50">
                <td className="h-15 px-6 py-4 whitespace-nowrap text-sm border-r border-r-gray-200">{ matiere.matiere || null} </td>
                <td className="w-30 h-15 px-6 py-4 whitespace-nowrap text-sm border-r border-r-gray-200"> {matiere.code} </td>
                <td className="w-30 h-15 px-6 py-4 whitespace-nowrap text-sm border-r border-r-gray-200"> {matiere.section} </td>
                <td className="w-30 h-15 px-6 py-4 whitespace-nowrap text-sm flex justify-center items-center">
                    <Link  href={`/moderator/matiere/${matiere.id_matiere}`} onClick={() => setIsLoading(true)}>
                        <Button 
                        variant="ghost"
                        isLoading={isLoading}
                        className='text-md border hover:border-gray-300 text-green-600 hover:bg-gray-100 hover:text-green-600' 
                        >
                            {! isLoading && <PenBoxIcon className="h-4 w-4 hover:scale-120" /> }
                        </Button>
                    </Link>
                      <Button 
                        variant="ghost"
                        onClick={() => handleDelete(matiere) }
                        isLoading={isLoading}
                        className='text-md border hover:border-gray-300 text-red-500 hover:bg-gray-100 hover:text-red-500' 
                      >
                         {!isLoading && <Trash2Icon className="h-4 w-4 hover:scale-120" />}
                      </Button>
                </td>
            </tr>
            ))}
          </>))}
        </tbody>
        </table>
        { !matieresLoading && !matieres.length && <div className='text-sm h-8 text-gray-500 text-center '><div className='items-center mt-2'> Ajouter des matières à votre établissement.</div> </div>}    
        </div>
        </Card>
    </>
  )
}

{/* <div 
                      key={matiere.id_matiere} 
                      className="p-4 hover:bg-gray-50 flex justify-between items-center"
                    >
                      <div className='grid grid-cols-2'>
                        <p className="font-medium">{matiere.matiere}</p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center"> <span>[ {matiere.code} ] </span> <PenBoxIcon className="h-4 w-4 text-green-600 ml-3" /> </p>
                      </div>
                      <Link  href={`/moderator/emploi-du-temps/${matiere.id_matiere}`}>
                      <Button 
                        variant="ghost"
                        className='text-md text-red-500 hover:bg-gray-100 hover:text-red-500' 
                      >
                         <Trash2Icon className="h-4 w-4 hover:scale-120" />
                      </Button>
                      </Link>
                    </div> */}