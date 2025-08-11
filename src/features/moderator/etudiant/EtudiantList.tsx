"use client"

import { Button, Card } from "@/src/components/ui";
import { EtudiantClasseData } from "@/src/types/type";
import { AlertCircle, BookOpen, PenBox, Plus } from "lucide-react";
import Link from "next/link";
import React, { JSX, useRef, useState } from "react";

type classeData = {
  classeData: EtudiantClasseData;
  toInscription: () => void;
}

export default function EtudiantList( props : classeData) {
  //const { mutate } = useClasseId();
  const [tooltip, setTooltip] = useState({ visible: false, content: '', position: { x: 0, y: 0 } });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
          open: boolean;
          position: { top: number; left: number };
        }>({ open: false, position: { top: 0, left: 0 } });

      const openContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({
          open: true,
          position: { top: event.clientY-35 , left: event.clientX },
        });
      };
    
      const closeContextMenu = () => {
        setContextMenu({ open: false, position: { top: 0, left: 0 } });
      };

  return (
    <>
    <div className="flex justify-between items-center">
        <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="text-orange-600" /> { props.classeData.classe}
            </h1>
            <div className="flex justify-between items-center">
              { props.classeData.responsable.nom} { props.classeData.responsable.prenom} 
              <PenBox className="w-4 h-4 text-green-600 ml-2 cursor-pointer hover:scale-120" 
                onMouseEnter={(e) => openContextMenu(e)} 
                onMouseLeave={closeContextMenu}/>
            </div>
            <strong></strong>
        </div>
        <div className='flex justify-between'>
          <Button  icon={<Plus size={18} />} onClick={props.toInscription}>
              Inscription
          </Button>
        </div>
      </div>
    <Card className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matricule</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom Complet</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">sexe</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          { props.classeData.etudiants?.etudiants.map((etudiant) => (
            <React.Fragment key={etudiant.id_inscription}>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {etudiant.matricule}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {etudiant.nom}  {etudiant.prenom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                { etudiant.sexe}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Link href={`/moderator/etudiant/`}>
                      Voir
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" >
                    <Link href={`/moderator/etudiant/editer/`}>
                      Éditer
                    </Link>
                  </Button>
                </div>
              </td>
            </tr>
            </React.Fragment>
          ))
          }
        </tbody>
      </table>
         { !props.classeData.etudiants.etudiants.length && 
         <div className="bg-white rounded-b-2xl h-8 text-sm text-gray-600 text-center"> 
            <div className="mt-2"> Liste vide pour l&apos;instant </div> 
         </div>}  
    </Card>

        {contextMenu.open && (
            <div 
              className="fixed flex z-50 bg-transparent shadow-lg rounded-md border border-gray-200 py-1 px-1 "
              style={{
                top: `${contextMenu.position.top}px`,
                left: `${contextMenu.position.left}px`
              }}
              ref={dropdownRef}
            >
              <div className="text-sm flex justify-between items-center">
                <AlertCircle className="mr-2 w-4 h-4"/> Modifier le Responsable
              </div>
            </div>
      )}
    </>
  );
}