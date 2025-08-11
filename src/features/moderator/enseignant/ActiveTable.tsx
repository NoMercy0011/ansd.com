"use client"

import { useEnseignant } from "@/hooks/useModerator";
import { Button } from "@/src/components/ui";
import { Eye, TableOfContentsIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";import DefaultWoman from "@/public/avatarWoman.png"
import DefaultMan from "@/public/avatarMan.png"


export default function ActiveTable() {
    const { actifs, enseignantsLoading} = useEnseignant();
    const [isLoading, setIsLoading ] = useState(false);
    
    const colonnes = [
        'photo',
        'nom',
        'prenom',
        `nom d'utilisateur`,
        `sexe`,
        'section',
        'action',
    ]

  return (
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
          { enseignantsLoading ? (
            <>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm "> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> <TableOfContentsIcon className="text-gray-200 animate-pulse w-10"/> </td>
              </tr>
            </>) : (
              (<>
          {actifs.enseignants.map((enseignant) => (
            <tr key={enseignant.id_enseignant} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Image src={enseignant.sexe == 'M' ? (enseignant.photo || DefaultMan) : (enseignant.photo || DefaultWoman)}  alt="pdp" className="w-8 h-8 rounded-full"/>  
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.nom} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.prenom} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.pseudo} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.sexe} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.section} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"> 
                  <Link href={`/moderator/enseignant/${enseignant.id_enseignant}`} onClick={() => setIsLoading(true) } >
                    <Button variant="ghost" isLoading={isLoading} className="border-gray-100 mr-1 hover:border-gray-400">  
                        { isLoading ? <div className='text-gray-600 animate-pulse'> </div> : <Eye className="w-4 h-4 text-gray-500" />}
                    </Button>
                  </Link> 
                  {/* <Link href={`/moderator/enseignant/${enseignant.id_enseignant}`} onClick={() => setIsLoading(true) } >
                    <Button variant="ghost" isLoading={isLoading} className="border-gray-200 ml-1">  
                        { isLoading ? <div className='text-gray-600 animate-pulse'> </div> : <Trash2 className="w-4 h-4 text-red-500" />}
                    </Button>
                  </Link> */}
                </td>
            </tr>
          ))}
          </>)
            )
          }
        </tbody>
      </table>
    </div>
  );
}