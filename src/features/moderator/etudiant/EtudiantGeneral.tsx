"use client"
import { useEtudiantsParClasse, useSection } from '@/hooks/useModerator'
import { Button, Card } from '@/src/components/ui';
import { EmploiDuTempsData, EtudiantClasseData } from '@/src/types/type';
import { BookOpen, BriefcaseBusinessIcon, ClipboardSignatureIcon, Loader2, LucideUserCircle2, MoreHorizontal, Plus, UserLock } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'

export default function EtudiantGeneral() {
    const {etudiantsClasse, etudiantsClasseLoading} = useEtudiantsParClasse();
    const {sections, sectionsLoading} = useSection();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const [contextMenu, setContextMenu] = useState<{
        open: boolean;
        position: { top: number; left: number };
        classe?: EtudiantClasseData;
      }>({ open: false, position: { top: 0, left: 0 } });

      const openContextMenu = (classe : EtudiantClasseData ,event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu({
          open: true,
          position: { top: event.clientY , left: event.clientX },
          classe
        });
      };
    
      const closeContextMenu = () => {
        setContextMenu({ open: false, position: { top: 0, left: 0 } });
      };

      const handleAdd = () => {

      }
        useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              closeContextMenu();
            }
          };
      
          document.addEventListener('mousedown', handleClickOutside);
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, [/*creneau, props.params*/]);

  return (
    <div>
      {sectionsLoading || etudiantsClasseLoading ? (
        <div>
            <Loader2 className='animate-spin' />
        </div>
      ): (
        <div className='flex-grid md:grid-cols-3 gap-4 mt-2'>
        {   sections.map( section => (
            <React.Fragment key={section.id_section}>
            <div>
               <h3 className='font-bold text-gray-500 mt-2 border-b border-b-gray-300'> { section.section} </h3> 
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                { etudiantsClasse?.filter(classe => classe.section.section === section.section).map( classe => (
                <Card className="hover:shadow-2xl transition-shadow p-2  bg-white border-sky-100 m-2" key={classe.id_classe}>
                <div>
                    <div className='text-md font-bold mb-2 justify-between flex items-center'>
                        <div className='flex justify-center items-center space-x-2 gap-1 text-rose-600'>
                          <BriefcaseBusinessIcon className='text-rose-600'/> {classe.classe}
                        </div>
                        <button 
                          onClick={(e) => openContextMenu(classe, e)}
                          className='rounded-2xl mr-2 contain-content hover:bg-gray-400 w-7 h-4 hover:text-white cursor-pointer'>
                            <MoreHorizontal className='w-4 h-4 ml-1.5'/>
                        </button>
                    </div>
                    <div className='text-lg mb-2'>
                        {classe.etudiants.total == 0 ? <span className='text-sm'>Auncun Etudiant</span> : <span>{ classe.etudiants.total} étudiants</span> }
                    </div>
                    <div className='text-xs mb-2 flex items-center gap-1'>
                       <UserLock className='w-4 h-4'/> 
                       {classe.responsable.sexe ==="M" ? <span> Mr</span> : <span> Mme</span> }
                       {classe.responsable.nom} {classe.responsable.prenom}
                    </div>
                </div>
                </Card>
            ))}
                {etudiantsClasse?.filter(classe => classe.section.section === section.section).length == 0 && 
                <div className='text-sm text-gray-500 font-normal mt-2 mb-2'> Aucune classe dans cette section </div>}
            </div>
            </div>
        </React.Fragment>))}
        </div>
      )}

            {contextMenu.open && (
        <div 
          className="fixed flex z-50 bg-white shadow-lg rounded-md border border-gray-200 py-1 px-1 "
          style={{
            top: `${contextMenu.position.top}px`,
            left: `${contextMenu.position.left}px`
          }}
          ref={dropdownRef}
        >
          <div className='text-start items-start'>
            <Link href={`/moderator/etudiant/gestion/${contextMenu.classe?.id_classe}`} >
            <Button
            variant='ghost'
            isLoading={ isLoading }
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
          >
            {!isLoading && <ClipboardSignatureIcon className="h-4 w-4 mr-2" />}
            gérer
          </Button></Link>
          </div>
        </div>
      )}
    </div>
  )
}
