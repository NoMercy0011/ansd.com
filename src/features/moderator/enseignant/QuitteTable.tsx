"use client"

import { useEnseignant } from "@/hooks/useModerator";
import { TableOfContentsIcon } from "lucide-react";
import DefaultWoman from "@/public/avatarWoman.png"
import DefaultMan from "@/public/avatarMan.png"
import Image from "next/image";


export default function QuitteTable() {
    const {quittes, enseignantsLoading} = useEnseignant();
    
    const colonnes = [
        'photo',
        'nom',
        'prenom',
        `nom d'utilisateur`,
        `sexe`,
        'section',
        'status',
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
          {quittes.enseignants.map((enseignant) => (
            <tr key={enseignant.id_enseignant} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Image src={enseignant.sexe == 'M' ? (enseignant.photo || DefaultMan) : (enseignant.photo || DefaultWoman)}  alt="photo de profile" className="w-8 h-8 rounded-full"/>  
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.nom} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.prenom} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.pseudo} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.sexe} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.section} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm align-middle"> 
                  <div className="bg-green-500 rounded-full text-green-500 text-center mx-4 w-4 h-4"></div>
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