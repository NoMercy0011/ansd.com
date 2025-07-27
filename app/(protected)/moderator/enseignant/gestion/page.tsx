"use client"

import { CreateEnseignant } from '@/src/actions/moderator/crud.enseignant.action';
import { Button } from '@/src/components/ui';
import { ChevronLeft, EyeIcon, EyeOffIcon, Router, SaveIcon} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type EnseignantType = {
    id_user: number;
    nom: string;
    prenom: string;
    pseudo: string;
    sexe: string;
    date_naissance: Date;
    lieu_naissance: string;
    telephone: string;
    password: string;
    role: string;
};
export default function page() {
    const route = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [currentEnseignant, setCurrentEnseignant] = useState<EnseignantType> ({
      id_user: 0,
      nom: '',
      prenom: '',
      pseudo: '',
      sexe: '',
      date_naissance: new Date(),
      lieu_naissance: '',
      telephone: '',
      password: '',
      role: 'User',
    })

    const clearData = () => {
        setCurrentEnseignant ({
      id_user: 0,
      nom: '',
      prenom: '',
      pseudo: '',
      sexe: '',
      date_naissance: new Date(),
      lieu_naissance: '',
      telephone: '',
      password: '',
      role: 'User',
    })
    }

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         clearData();
    //         setSuccess('');
    //     }
    //     , 5000);
    //     return () => clearInterval(timer);
    // }, [])

    const handleSaveEnseignant = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const data = await CreateEnseignant(currentEnseignant);
        if( data.status === 401) {
            setSuccess('')
            setError(" Le pseudo existe déjà dans votre utilisateur");
        }
        if( data.status === 403) {
            setError(" Vous n'êtes pas authoriser !");
            setSuccess('');
        }
        if( data.status === 201){
            setSuccess(data.message);
            
        }
        const timer = setInterval(() => {
            setSuccess('');
        }
        , 2000);
        setIsLoading(false);
        clearData();
        return () => clearInterval(timer);

    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setCurrentEnseignant({ ...currentEnseignant,
         [e.target.name] : e.target.value,
        });
    }
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  return (
    <>
    <div className="flex items-center justify-center md:w-200">
          <form onSubmit={handleSaveEnseignant} className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className='flex justify-between'>
                <h3 className="text-lg font-bold text-gray-900 mb-4"> Ajouter un nouveau enseignant </h3>
                <Link href={'/moderator/enseignant'}>
                    <h3 className="text-sm font-light text-gray-900 mb-4 flex items-center align-middle hover:underline hover:bg-gray-100 cursor-pointer"> <ChevronLeft /> Retour </h3>
                </Link>
            </div>
            {error && <div className="text-red-600 text-sm text-center my-3">{ error } </div>}
            {success && <div className="text-green-600 text-sm text-center my-3">{ success } </div>}
              <div className="grid grid-cols-1 text-sm md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom*</label>
                <input
                  type="text"
                  name="nom"
                  defaultValue={currentEnseignant.nom}
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
                <label className="block text-sm font-medium text-gray-500 mb-1">Date de Naissance</label>
                <input
                  type="date"
                  name="date_naissance"
                  defaultValue={currentEnseignant.date_naissance.toISOString()}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de Naissance</label>
                <input
                  type="text"
                  name="lieu_naissance"
                  defaultValue={currentEnseignant.lieu_naissance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  //required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pseudo ou Non d'utilisateur</label>
                <input
                  type="text"
                  name="pseudo"
                  defaultValue={currentEnseignant.pseudo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="pseudo ou nom d'utilisateur"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe*</label>
                <select
                  onChange={(e) => setCurrentEnseignant({...currentEnseignant, sexe: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue={currentEnseignant.sexe}
                  required
                >
                  <option value="" > -- sexe --</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  onChange={handleChange}
                  defaultValue={currentEnseignant.telephone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+261 33 03 333 33"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  defaultValue={currentEnseignant.password}
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
              </div>

            </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Link href={'/moderator/enseignant'}>
                <Button type='button' variant="secondary" className="shrink-0">
                 Annuler
                </Button>
                </Link>
              <Button type='submit' variant="primary" icon={<SaveIcon size={18} />} className="shrink-0" isLoading={isLoading} >
                Enregistrer
              </Button>
              </div>
          </form>
    </div>
    </>
  )
}

{/* <button
    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
    Annuler
</button> */}
{/* <button type="submit"
    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
    >
    Enregistrer
</button> */}
