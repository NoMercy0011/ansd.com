"use client"

import { useEnseignant } from "@/hooks/useModerator";
import { Button } from "@/src/components/ui";
import Link from "next/link";
import { useState } from "react";


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
                Chargement...
              </tr>
            </>) : (
              (<>
          {actifs.enseignants.map((enseignant) => (
            <tr key={enseignant.id_enseignant} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.photo || null} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.nom} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.prenom} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.pseudo} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.sexe} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{ enseignant.section} </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm align-middle"> 
                  <Link href={`/moderator/enseignant/${enseignant.id_enseignant}`} onClick={() => setIsLoading(true) } >
                    <Button variant="ghost">  
                        { isLoading ? <div className='text-gray-600 animate-pulse'> Voir... </div> : 'Voir'}
                    </Button>
                  </Link> 
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