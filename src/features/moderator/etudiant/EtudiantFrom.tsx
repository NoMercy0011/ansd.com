"use client"

import { useClasseId } from '@/hooks/useModerator';
import { CreateEtudiant } from '@/src/actions/moderator/crud.etudiant.action';
import { Button } from '@/src/components/ui';
import { EtudiantClasseData, InscriptionData } from '@/src/types/type';
import { Recycle, Save, UserPlus2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type EleveFormProps = {
    classeData : EtudiantClasseData;
    toListe?: () => void;
}

const initData = {
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    sexe: '',
    domicile: '',
    nom_pere: '',
    nom_mere: '',
    telephone_parent: '',
    nom_tuteur: '',
    telephone_tuteur: '',
    telephone_urgence: '',
    matricule: '',
    classe_id: 0,
    inscription: '',
    date_entree: '',
    annee_scolaire_id: '',
    ecole_precedente: '',
    sortie_ecole_precedente: '',
    raison_admission: '',
    statut: '',
  }


export default function EleveForm( props: EleveFormProps)  {
  const { mutate } = useClasseId()
  const [eleves, setEleves] = useState<InscriptionData> (initData);
  const [etablissement, setEtablissement] = useState<"Inscription" | "Réinscription">( "Inscription");
  const [isLoading, setIsLoading] = useState(false);
  //const [showActionModal, setShowActionModal] = useState(null);

  // Options pour les listes déroulantes
  const sexeOptions = [
    { value: 'M', label: 'Masculin' },
    { value: 'F', label: 'Féminin' }
  ];

  useEffect(() => {
    if(etablissement == "Inscription") {
      setEleves({...eleves, statut: ''});
    } else {
      setEleves({...eleves,
        ecole_precedente: '',
        raison_admission: '',
        sortie_ecole_precedente: '',
        date_entree: ''});
    }
  }, [etablissement]);

  const handleChoice = (value : "Inscription" | "Réinscription") => {
    if(value == "Inscription") {
      setEleves({...eleves, statut: ''});
      setEtablissement(value);
      setEleves({ ...eleves, inscription: value})
    } else {
      setEleves({...eleves,
        ecole_precedente: '',
        raison_admission: '',
        sortie_ecole_precedente: '',
        date_entree: ''});
      setEtablissement(value);
      setEleves({ ...eleves, inscription: value})
    }
    
  }

  // // Gestion des actions
  // const handleEdit = (updatedEleve) => {
  //   setEleves(eleves.map(e => e.id === updatedEleve.id ? updatedEleve : e));
  //   setShowActionModal(null);
  // };

  // const handleDelete = (id) => {
  //   setEleves(eleves.filter(e => e.id !== id));
  //   setShowActionModal(null);
  // };



  const handleChange = (e : React.ChangeEvent<HTMLInputElement>  )=> {
    setEleves({ ...eleves,
      [e.target.name]: e.target.value,
      classe_id:Number(props.classeData.id_classe)
    });
  }

  const handleSumit = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await CreateEtudiant(eleves);
      await mutate();
    }finally{
    setIsLoading(false);
    setEleves(initData);

    }
  }

  return (
    <div className="lg:w-200 md:w-full">

        <form onSubmit={handleSumit} className="w-full inset-0 flex items-center justify-center p-4 z-5">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-y-auto">
            <div className="p-6 ">
              <div className='mb-5 border-b border-b-gray-500'>
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Formulaire d&apos;inscription</h3>
                <div className="text-sm font-medium text-gray-700 mb-4"> <span className='border-b border-b-gray-400'> Classe</span> : {props.classeData.classe} </div>
                <div className="text-sm font-medium text-gray-700 mb-2"> <span className='border-b border-b-gray-400'> Responsable </span> : {props.classeData.responsable.nom} {props.classeData.responsable.prenom}</div>
              </div>
              <div>
                {/* Infos peronnel */}
                <h3 className="text font-bold text-gray-900 mb-4 uppercase"> Information Personnel </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-5 border-b-gray-400">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Nom</label>
                    <input
                      type="text"
                      name='nom'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Prénom</label>
                    <input
                      type="text"
                      name='prenom'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.prenom}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Date de naissance</label>
                    <input
                      type="date"
                      name='date_naissance'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.date_naissance}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Lieu de naissance</label>
                    <input
                      type="text"
                      name='lieu_naissance'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.lieu_naissance}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Sexe</label>
                    <select
                      className="w-full h-10.5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.sexe}
                      required
                      onChange={(e) => setEleves({...eleves, sexe: e.target.value})}
                    >
                      <option value="">Sélectionnez</option>
                      {sexeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domicile</label>
                    <input
                      type="text"
                      name='domicile'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.domicile}
                      onChange={handleChange}
                    />
                  </div>

                </div>
                
                {/* Infos Parental */}
                <h3 className="text font-bold text-gray-900 mb-4 mt-4 uppercase"> Information Parental </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-5 border-b-gray-400">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du père</label>
                    <input
                      type="text"
                      name='nom_pere'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.nom_pere}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la mère</label>
                    <input
                      type="text"
                      name='nom_mere'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.nom_mere}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Contact des parents</label>
                    <input
                      type="text"
                      name='telephone_parent'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.telephone_parent}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Tuteur</label>
                    <input
                      type="text"
                      name='nom_tuteur'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.nom_tuteur}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact du tuteur</label>
                    <input
                      type="text"
                      name=''
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.telephone_tuteur}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Etablissement */}
                <div className='flex justify-start items-center space-x-5'>
                  <h3 className="text font-bold text-gray-900 mb-4 mt-4 uppercase"> Etablissement </h3> 
                  <div className="flex border-b border-gray-200">
                    <div
                      className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer ${etablissement === "Inscription" ? "border-sky-600 text-sky-600 shadow-inner" : "border-transparent hover:text-sky-500"}`}
                      onClick={() => handleChoice("Inscription")}
                    >
                    <div className="flex items-center gap-2">
                      <UserPlus2 className="h-4 w-4"/> Inscription
                    </div>
                    </div>
                    <div
                      className={`px-4 py-2 font-medium text-sm border-b-2 cursor-pointer ${etablissement === "Réinscription" ? "border-sky-600 text-sky-600 shadow-inner" : "border-transparent hover:text-sky-500"}`}
                      onClick={() => handleChoice("Réinscription")}
                    >
                      <div className="flex items-center gap-2">
                        <Recycle className="h-4 w-4" /> Réinscription
                      </div>
                    </div>
                </div>
                </div>
                {etablissement === "Inscription" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-5 border-b-gray-400 items-end">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*École précédente</label>
                    <input
                      type="text"
                      name='ecole_precedente'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.ecole_precedente}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Raison d&apos;admission</label>
                    <input
                      type="text"
                      name='raison_admission'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.raison_admission}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de Sortie école précédente</label>
                    <input
                      type="date"
                      name='sortie_ecole_precedente'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.sortie_ecole_precedente}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Date d&apos;entrée</label>
                    <input
                      type="date"
                      name='date_entree'
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.date_entree}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>  
                )}
                {etablissement === "Réinscription" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-5 border-b-gray-400 items-end">

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut*</label>
                    <select
                      className="w-full h-10.5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={eleves.statut}
                      onChange={(e) => setEleves({...eleves, statut: e.target.value})}
                    >
                      <option  value={''} ></option>
                      <option  value={'Passant'} className='text-gray-700'>Passant</option>
                      <option  value={'Redoublant'} className='text-gray-700'>Redoublant</option>
                    </select>
                  </div>
                </div>  
                )}   
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant='ghost'
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={props.toListe}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                 {!isLoading && <Save className='mr-2'/>} Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </form>
      
    </div>
  )
}

