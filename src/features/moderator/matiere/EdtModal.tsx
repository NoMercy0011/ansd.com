"use client"

import { useEmploiDuTemps, useEnseignant, useMatiere } from '@/hooks/useModerator';
import { CreateEnseignement, UpdateEnseignement } from '@/src/actions/moderator/crud.enseignement.action';
import { Button } from '@/src/components/ui'
import { EnseignementData } from '@/src/types/type';
import React, { useEffect, useRef, useState } from 'react'

type EdtModalProps = {
    isNew?: boolean;
    isEdit?: boolean;
    isDelete?: boolean;
    isLoading?: boolean;
    EditData?: EnseignementData;
    onClose : () => void; 
    onRest ?: () => void; 
}
export default function EdtModal( props : EdtModalProps) {
    
    const { actifs, enseignantsError, enseignantsLoading } = useEnseignant();
    const { mutate } = useEmploiDuTemps();
    const { matieres, matieresError, matieresLoading } = useMatiere();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [creneau, setCreneau] = useState<EnseignementData>({});
    
    useEffect(() => {
        setCreneau({
        cellule: props.EditData?.cellule,
        classe_id: props.EditData?.classe_id,
        coefficient: props.EditData?.coefficient,
        endTime: props.EditData?.endTime,
        enseignant_id: props.EditData?.enseignant_id,
        horaire: props.EditData?.horaire,
        id_enseignement: props.EditData?.id_enseignement,
        matiere_id: props.EditData?.matiere_id,
        startTime: props.EditData?.startTime,
        });
        console.log(props.EditData);
    },[props.EditData])
    const handleCancel = () => {
     props.onClose();
  };

  const handleChange = ( e : React.ChangeEvent<HTMLInputElement>) => {
      setCreneau({
          ...creneau,
          [e.target.name] : e.target.value,
          horaire: `${creneau?.startTime}-${creneau?.endTime}`
      });
    }
    const handleSubmit = async (e : React.FormEvent) => {
      e.preventDefault();
      try {
        if(props.isNew) {
            setIsLoading(true);
        const data = {
          ...creneau,
          coefficient: Number(creneau?.coefficient), 
          horaire: `${creneau?.startTime}-${creneau?.endTime}`};
  
        await CreateEnseignement(data);
        await mutate();
        setIsLoading(false);
        props.onClose();
        } else if(props.isEdit){
            setIsLoading(true);
            const data = {
                ...creneau,
                coefficient: Number(creneau?.coefficient), 
                horaire: `${creneau?.startTime}-${creneau?.endTime}`
            };
            await UpdateEnseignement(data);
            await mutate();
            setIsLoading(false);
            props.onClose();
        }

      } catch(error) {
        console.log(error);
      }
    }

  return (
    <>
      <div 
        ref={dropdownRef}
        className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-50"
        >
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl border border-gray-400 p-6 w-full max-w-md">
        <div className="space-y-4">
            <div className='text-md text-gray-800 font-semibold border-b-1 border-gray-400'>
            { props.isNew && <span> Planification du créneau </span> }
            { props.isDelete == true && <span> Suppression </span> }
            { props.isEdit == true && <span> Modification du créneau </span> }
            </div>
            <div className='flex justify-between items-center'>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Matière :</label>
            <select
              name="matiere_id"
              value={creneau?.matiere_id || props.EditData?.matiere_id}
              onChange={(e) => setCreneau({...creneau, matiere_id: Number(e.target.value)})}
              className="w-60 mx-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
              required >
              <option value="">Choisir une matière</option>
              {matieresError && <option value="">{matieresError}</option>}
              {matieresLoading ? (
                <option value="">Chargement...</option>
              ) : (
                matieres?.map((matiere) => (
                  <option key={matiere.id_matiere} value={matiere.id_matiere}>
                    {matiere.matiere} [{matiere.code}]
                  </option>
                ))
              )}
            </select>
            </div>
              <div className='flex justify-between items-center'>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Enseignant :</label>
                <select
                    name="enseignant_id"
                    value={creneau?.enseignant_id || props.EditData?.enseignant_id}
                    onChange={(e) => setCreneau({...creneau, enseignant_id: Number(e.target.value)})}
                    className="w-60 xs-w-20 mx-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                    >
                    <option value="">Choisir une Classe </option>
                        {enseignantsError && <option value="">{ enseignantsError } </option> }
                        {enseignantsLoading ? (<option value=""> Chargement...</option> ) :
                    ( <>
                      {actifs?.enseignants.map((enseignant) => (
                        <React.Fragment key={enseignant.id_enseignant}>
                            <option value={enseignant.id_enseignant} >{enseignant.nom} {enseignant.prenom} </option>
                        </React.Fragment>
                    ))}</>
                    )
                    }              
                </select>
              </div>

              <div className='flex justify-between items-center'>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Coefficient : </label>
                <input 
                    value={creneau?.coefficient || props.EditData?.coefficient || ""}
                    onChange={handleChange}
                    type="number" 
                    placeholder='coefficient' 
                    name='coefficient' 
                    required
                    className='px-4 border border-gray-300 w-60 h-9 mr-5 rounded-md focus:outline-none focus:shadow-2xl focus:ring-blue-500 focus:border-blue-500'/>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Début</label>
                  <input
                    type="time"
                    name='startTime'
                    value={creneau?.startTime?.toString() || props.EditData?.startTime ||" "}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-400 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Fin</label>
                  <input
                    type="time"
                    name='endTime'
                    value={creneau?.endTime?.toString() || props.EditData?.endTime || " "}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-gray-400 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant='ghost'
              onClick={ handleCancel}
              className="border border-gray-400"
            >
              Annuler
            </Button>
            <Button
              type='submit' 
              variant='primary'
              isLoading={isLoading}
              //onClick={handleSubmit}
            >
              Enregistrer
            </Button>
              </div>
            </div>
        </form>
    </div>
    </>
  )
}
