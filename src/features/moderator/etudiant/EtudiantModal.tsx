"use client"

import { CreateEnseignantAction, DeleteEnseignantAction, UpdateEnseignantAction } from "@/src/actions/moderator/crud.enseignant.action";
import { EyeIcon, EyeOffIcon, WarningIcon } from "@/src/components/ui/icon";
import { EnseignantModalProps, EnseignantType } from "@/src/types/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"


export default function EtudiantModal(props : EnseignantModalProps ) {
    const route = useRouter()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentEnseignant, setCurrentEnseignant] = useState<EnseignantType> ({
      id_user: 0,
      nom: '',
      prenom: '',
      email: '',
      sexe: '',
      date_naissance: '',
      lieu_naissance: '',
      telephone: '',
      password: '',
    })

    const init = () => {
      setCurrentEnseignant({
        ...currentEnseignant,
      id_user: Number(props.enseignant?.id_user),
      nom: String(props.enseignant?.nom),
      prenom: String(props.enseignant?.prenom),
      email: String(props.enseignant?.email),
      sexe: String(props.enseignant?.sexe),
      date_naissance: String(props.enseignant?.date_naissance),
      lieu_naissance: String(props.enseignant?.lieu_naissance),
      telephone: String(props.enseignant?.telephone),
      password: props.enseignant?.password,
    })
    }

    const reset = () => {
      setCurrentEnseignant({
        ...currentEnseignant,
        id_user: 0,
        nom: '',
        prenom: '',
        email: '',
        sexe: '',
        date_naissance: '',
        lieu_naissance: '',
        telephone: '',
        password: '',
    })
    }

    useEffect(() => {
      if( props.isEditing ){ 
        init();
      }

    }, [])
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setCurrentEnseignant({ ...currentEnseignant,
         [e.target.name] : e.target.value,
        });
    }
    const handleSaveEnseignant = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
          const data : EnseignantType = {
            id_user: currentEnseignant.id_user,
            nom: currentEnseignant.nom,
            prenom: currentEnseignant.prenom,
            email: currentEnseignant.email,
            sexe: currentEnseignant.sexe,
            date_naissance: new Date (currentEnseignant.date_naissance!).toISOString(),
            lieu_naissance: currentEnseignant.lieu_naissance,
            telephone: currentEnseignant.telephone,
            password: currentEnseignant.password,
          }

          if( props.isEditing ) {
            console.log(data.date_naissance);
            await UpdateEnseignantAction(data);
          }

          if( props.isNew) {
              console.log(data.date_naissance);
              const res = await CreateEnseignantAction(data);

              if(!res?.success){
                setError(res!.message);
              } 
              else if( res.success ){
                setSuccess(res.message);
                setError('');
                const interval = setInterval(() => {
                  //props.onClose();
                  reset();
                  props.onClose();
                  route.refresh();
                }, 1000); 
                return () => clearInterval(interval);

              }
            }
          }
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleDelete = async () => {
      await DeleteEnseignantAction(props.id_enseignant!);
      console.log(props.id_enseignant);
      props.onClose();

    }

  return (
    <>
    {props.isDelete ? (
      <div className="fixed inset-0 text-md backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-amber-100 rounded-lg shadow-xl max-w-2xl w-full p-7 text-center">
           <div className="w-20 h-20 m-auto text-red-500">
              <WarningIcon />
            </div>
          <div> Voulez vous vraiment supprimer de votre etablissement ? </div>
          <div className="text-md font-bold m-2"> &apos;&apos; { props.enseignant?.prenom} { props.enseignant?.nom} &apos;&apos; </div>
          <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={props.onClose}
                className="px-4 py-2 shadow bg-gray-300 border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button type="button"
                onClick ={ handleDelete }
                className="px-4 py-2 shadow bg-red-500 text-gray-50 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
        </div>
      </div>
    ) : (
      <div>
        <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleSaveEnseignant} className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {props.isEditing ? 'Modifier un Enseignant' : 'Nouvel Enseignant'}
            </h3>
            {error && <div className="text-red-600 text-sm text-center my-3">{ error } </div>}
            {success && <div className="text-green-600 text-sm text-center my-3">{ success } </div>}
            <div className="grid grid-cols-1 text-sm md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom*</label>
                <input
                  type="text"
                  name="nom"
                  value={currentEnseignant.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom*</label>
                <input
                  type="text"
                  name="prenom"
                  defaultValue={currentEnseignant.prenom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de Naissance</label>
                <input
                  type="date"
                  name="date_naissance"
                  defaultValue={currentEnseignant.date_naissance?.toString()}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de Naissance</label>
                <input
                  type="text"
                  name="lieu_naissance"
                  defaultValue={currentEnseignant.lieu_naissance?.toString()}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={currentEnseignant.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@lova.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe*</label>
                <select
                  defaultValue={currentEnseignant.sexe?.toString()}
                  onChange={(e) => setCurrentEnseignant({...currentEnseignant, sexe: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value=""></option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  defaultValue={currentEnseignant.telephone?.toString()}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+261 33 03 333 33"
                />
              </div>
              
              { props.isNew && <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  defaultValue={currentEnseignant.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pt-6"
                  aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={props.onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
              >
                {props.isEditing ? 'Mettre à jour' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
        </div>
      </div>
    )}

    </>
  )
}

