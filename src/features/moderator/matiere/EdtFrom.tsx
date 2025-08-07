"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, GripVertical, CalendarCogIcon, Loader2, Edit, Trash2, Eye, Printer, EyeIcon, X } from 'lucide-react';
import { useClasse, useEmploiDuTemps } from '@/hooks/useModerator';
import { Button } from '@/src/components/ui';
import { EmploiDuTempsData, EnseignementData } from '@/src/types/type';
import { DeleteEnseignement } from '@/src/actions/moderator/crud.enseignement.action';
import EdtModal from './EdtModal';

interface TimeSlot {
  id: number;
  label: string;
  timeBlock: 'Matin' | 'Récréation' | 'Après-midi';
  visible: boolean;
  timeRange?: string;
}
type Subject = 'FR' | 'MATH' | 'PC' | 'HG' | 'SVT' | 'ANG' | 'ESP' | 'PHILO' | 'EPS';


export default function EdtForm( props : { params?: number}) {
  const { classes, classesError, classesLoading } = useClasse();
  const { emploiDuTemps, emploiDuTempsLoading, mutate } = useEmploiDuTemps();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [creneau, setCreneau] = useState<EnseignementData>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [contextMenu, setContextMenu] = useState<{
    open: boolean;
    position: { top: number; left: number };
    enseignement?: EmploiDuTempsData;
  }>({ open: false, position: { top: 0, left: 0 } });

  const openContextMenu = (enseignement: EmploiDuTempsData, event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({
      open: true,
      position: { top: event.clientY , left: event.clientX-170 },
      enseignement
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ open: false, position: { top: 0, left: 0 } });
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await DeleteEnseignement(id);
    await mutate();
    setIsLoading(false);
    setIsNew(false);
    setIsEdit(false);
    setIsDelete(true);
    closeContextMenu();
  };

  const handleEdit = (enseignement: EmploiDuTempsData) => {
    setCreneau({ 
      ...creneau,
      id_enseignement: enseignement.id_enseignement,
      classe_id: enseignement.classe.id_classe,
      enseignant_id: enseignement.enseignant.id_user,
      cellule: enseignement.coordonnee,
      coefficient: enseignement.coefficient,
      startTime: enseignement.startTime,
      endTime: enseignement.endTime,
      horaire: enseignement.horaire,
      matiere_id: enseignement.matiere.id_matiere
    }); 
    setDropdownOpen(true);
    setIsNew(false);
    setIsEdit(true);
    setIsDelete(false);
    closeContextMenu();
  };

  const handleClose = () => {
    setDropdownOpen(false);
    
    setCreneau({ ...creneau,
      matiere_id: 0,
      enseignant_id: 0,
      cellule:0,
      coefficient: undefined,
      startTime: "",
      endTime: "",
      horaire:"",
    });
  }

  const days = [
    { id: 1, day: 'Lundi' }, 
    { id: 2, day: 'Mardi' }, 
    { id: 3, day: 'Mercredi' }, 
    { id: 4, day: 'Jeudi' }, 
    { id: 5, day: 'Vendredi' }, 
    { id: 6, day: 'Samedi' }
  ];
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: 1, label: 'H1', timeBlock: 'Matin', visible: true, timeRange: '8h00 - 8h45' },
    { id: 2, label: 'H2', timeBlock: 'Matin', visible: true, timeRange: '8h45 - 9h30' },
    { id: 3, label: 'H3', timeBlock: 'Matin', visible: true, timeRange: '9h30 - 10h15' },
    { id: 4, label: 'H4', timeBlock: 'Récréation', visible: true, timeRange: '10h15 - 10h30' },
    { id: 5, label: 'H5', timeBlock: 'Récréation', visible: true, timeRange: '10h30 - 11h15' },
    { id: 6, label: 'H6', timeBlock: 'Récréation', visible: false, timeRange: '11h15 - 12h00' },
    { id: 7, label: 'H7', timeBlock: 'Après-midi', visible: true, timeRange: '13h30 - 14h15' },
    { id: 8, label: 'H8', timeBlock: 'Après-midi', visible: true, timeRange: '14h15 - 15h00' },
    { id: 9, label: 'H9', timeBlock: 'Après-midi', visible: true, timeRange: '15h00 - 15h45' },
    { id: 10, label: 'H10', timeBlock: 'Après-midi', visible: false, timeRange: '15h45 - 16h30' },
  ]);

    const subjectColors: Record<Subject, string> = {
    FR: 'bg-blue-100 text-blue-800 border-blue-200',
    MATH: 'bg-purple-100 text-purple-800 border-purple-200',
    PC: 'bg-red-100 text-red-800 border-red-200',
    HG: 'bg-green-100 text-green-800 border-green-200',
    SVT: 'bg-teal-100 text-teal-800 border-teal-200',
    ANG: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ESP: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    PHILO: 'bg-pink-100 text-pink-800 border-pink-200',
    EPS: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const toggleSlotVisibility = (id: number) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === Number(id) ? { ...slot, visible: !slot.visible } : slot
      )
    );
  };

  const handleClick = (cellule: number, event: React.MouseEvent) => {
    setCreneau(prev => ({ ...prev, cellule }));
    console.log(cellule);
    setDropdownOpen(true);
    setIsNew(true);
    setIsEdit(false);
    setIsDelete(false);
    event.stopPropagation();
  };


  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    if(props.params){
      setCreneau( {...creneau, classe_id: props.params});
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [creneau, props.params]);

const renderCellContent = (slotId: number, dayId: number) => {
    if (emploiDuTempsLoading) {
      return (
        <Button 
          type='button' 
          className="w-full h-full rounded-lg bg-gray-200 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center relative"
        >
          <Loader2 className='animate-spin h-4 w-4' />
        </Button>
      );
    }

    const existingEmploi = emploiDuTemps?.find(edt => 
      edt.classe.id_classe === creneau?.classe_id && 
      edt.cellule.creneau === slotId && 
      edt.cellule.jour === dayId
    );


    if (existingEmploi) {
      return (
        <div 
          className={`w-full h-full p-2 rounded-lg ${subjectColors[existingEmploi.matiere.code as Subject] || 'bg-gray-100'} flex flex-col items-center justify-center cursor-pointer`}
          onContextMenu={(e) => openContextMenu(existingEmploi, e)}
          onClick={(e) => openContextMenu(existingEmploi, e)}
        >
          <span className="text-xs font-medium truncate w-full text-center">
            {existingEmploi.enseignant.prenom}
          </span>
          <span className="text-xs font-bold">
            [{existingEmploi.matiere.code}]
          </span>
          <span className="text-xs">
            {existingEmploi.horaire}
          </span>
        </div>
      );
    }
     return (
      <Button 
        onClick={(e) => handleClick(Number(`${slotId}${dayId}`), e)}
        type='button' 
        isDisabled={!creneau?.classe_id} 
        className="w-full h-full rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center relative"
      >
        <GripVertical className="absolute left-1 text-gray-400" size={14} />
        <span className="text-xs text-gray-500">Ajouter</span>
      </Button>
    );
  };




  return (
    <div className="max-w-[1800px] mx-auto p-1">
      {/* En-tête */}
      <div className='flex justify-between space-x-2 mb-4 py-2 border-b-2 border-b-gray-400'>
        <div className='flex items-center space-x-2'>
          <CalendarCogIcon className='text-orange-500 w-7 h-7'/>
          <h2 className='text-xl text-gray-700 font-semibold'>Planification de l&apos;emploi du temps</h2>
        </div>
        <div className='mr-7'>
          <select
            name="classe_id"
            defaultValue={props.params}
            value={creneau?.classe_id}
            onChange={(e) => setCreneau({...creneau, classe_id: Number(e.target.value)})}
            className="w-full mx-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Choisir une Classe</option>
            {classesError && <option value="">{classesError}</option>}
            {classesLoading ? (
              <option value="">Chargement...</option>
            ) : (
              classes?.map((classe) => (
                <option key={classe.id_classe} value={classe.id_classe}>
                  {classe.classe}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* Emploi du temps */}
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* En-tête des jours */}
        <div className="grid grid-cols-7 gap-4 bg-gradient-to-r from-blue-600 to-pink-600 p-4">
          <div className="col-span-1"></div>
          {days.map(day => (
            <div key={day.id} className="text-center text-gray-100 font-bold">
              <div className="text-md">{day.day === 'Mercredi' ? 'Mercre.' : day.day}</div>
            </div>
          ))}
        </div>

        {/* Corps de l'emploi du temps */}
        <div className="divide-y divide-gray-200">
          {(['Matin', 'Récréation', 'Après-midi'] as const).map(block => (
            <div key={block} className="group">
              <div className={`flex border-b-1 border-b-gray-400 items-center justify-center h-6 px-6 py-3 ${
                block === 'Matin' ? 'bg-blue-200' : 
                block === 'Récréation' ? 'bg-pink-100' : 'bg-indigo-50'
              }`}>
                <h3 className="text-lg font-semibold text-gray-700">{block}</h3>
              </div>

              <div className="grid grid-cols-7 gap-1">
                <div className="col-span-1 bg-gray-50">
                  {timeSlots
                    .filter(slot => slot.timeBlock === block)
                    .map(slot => (
                      <div key={`label-${slot.id}`} className="flex items-center justify-center p-3 h-[80px] border-b">
                        <div className='flex justify-between md:w-1'>
                          <div className="text-xs text-center font-medium">{slot.label}</div>
                          {(slot.id === 3 || slot.id === 6 || slot.id === 10) && (
                            <button 
                              onClick={() => toggleSlotVisibility(slot.id)}
                              className="p-1 rounded-full hover:bg-gray-200"
                            >
                              {slot.visible ? <Minus size={12} /> : <Plus size={12} />}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                  {days.map(day => (
                  <div key={day.id} className="col-span-1 bg-white w-35">
                    {timeSlots
                      .filter(slot => slot.timeBlock === block && slot.visible)
                      .map(slot => (
                        <div key={`${day.id}-${slot.id}`} className="p-1 h-[80px] border-b">
                          {renderCellContent(slot.id, day.id)}
                        </div>
                      ))}
                  </div>
                ))}
                 
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* Menu contextuel */}
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
            <Button
            variant='ghost'
            isLoading={ isLoading }
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
            onClick={() => handleEdit(contextMenu.enseignement!)}
          >
            {!isLoading && <Edit className="h-4 w-4 mr-2" />}
            Modifier
          </Button>
          <Button 
            variant='ghost'
            isLoading={ isLoading }
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 justify-start"
            onClick={() => handleDelete(contextMenu.enseignement!.id_enseignement)}
          >
            {!isLoading && <Trash2 className="h-4 w-4 mr-2" />}
            Supprimer
          </Button>
          <Button 
            variant='ghost'
            isLoading={ isLoading }
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-start"
            onClick={closeContextMenu}
          >
            { !isLoading && <Eye className="h-4 w-4 mr-2" />}
            Détails
          </Button>
          </div>
          <div className='w-7 text-gray-500 mt-1'>
            <Button 
            variant='ghost'
            className="w-7 h-7 text-left p-1 border-1 border-gray-200 rounded-sm  hover:bg-red-600 hover:text-white"
            onClick={closeContextMenu}
          >
            <X className="h-4 w-4 " />
          </Button>
          </div>
        </div>
      )}

      {/* Légende et actions */}
      <div className="mt-6 flex justify-end items-center mr-5 space-x-2">
        <Button variant='outline' icon={ <EyeIcon  /> } >
          Apperçu
        </Button>
        <Button variant='print' icon={ <Printer  /> } >
          Imprimer
        </Button>
      </div>

      {/* Menu modal */}
      {dropdownOpen && <EdtModal onClose={ handleClose} isNew={isNew} isEdit={isEdit} isDelete={isDelete} EditData={creneau} />}
    </div>
  );
};