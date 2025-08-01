

import { useSection } from '@/hooks/useModerator';
import { CreateEnseignant } from '@/src/actions/moderator/crud.enseignant.action';
import { Button } from '@/src/components/ui'
import { CreateEnseignantType } from '@/src/types/type';
import { ChevronLeft, EyeIcon, EyeOffIcon, SaveIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const initialEnseignantState: CreateEnseignantType = {
  id_user: 0,
  nom: '',
  prenom: '',
  pseudo: '',
  sexe: '',
  section: '',
  date_naissance: new Date(),
  lieu_naissance: '',
  telephone: '',
  password: '',
  role: 'User',
};


export default function EnseignantForm() {
    const { sections, sectionsLoading, sectionsError} = useSection();
    
    const [errorLocal, setErrorLocal] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoadingLocal, setIsLoadingLocal] = useState(false);
    const [currentEnseignant, setCurrentEnseignant] = useState<CreateEnseignantType>(initialEnseignantState);


    const handleSaveEnseignant = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoadingLocal(true);
        
        try {
            const data = await CreateEnseignant(currentEnseignant);
            
            if (data.status === 401) {
                setErrorLocal("Le pseudo existe déjà dans votre utilisateur");
                setSuccess('');
            } else if (data.status === 403) {
                setErrorLocal("Vous n'êtes pas authorisé !");
                setSuccess('');
            } else if (data.status === 201) {
                setSuccess(data.message);
                setErrorLocal('');
                // Réinitialiser le formulaire après succès
                setCurrentEnseignant(initialEnseignantState);
            }
        } catch (err) {
            setErrorLocal("Une erreur inattendue est survenue");
            console.error(err);
        } finally {
            setIsLoadingLocal(false);
            // Effacer les messages après 3 secondes
            setTimeout(() => {
                setSuccess('');
                setErrorLocal('');
            }, 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentEnseignant({ 
            ...currentEnseignant,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentEnseignant({
            ...currentEnseignant,
            [e.target.name]: e.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <>
    <form onSubmit={handleSaveEnseignant} className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className='flex justify-between'>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ajouter un nouvel enseignant</h3>
            <Link href={'/moderator/enseignant'}>
                <div className="text-sm font-light text-gray-900 mb-4 flex items-center align-middle hover:underline cursor-pointer">
                    <ChevronLeft /> Retour
                </div>
            </Link>
        </div>
        
        {errorLocal && <div className="text-red-600 text-sm text-center my-3">{errorLocal}</div>}
        {success && <div className="text-green-600 text-sm text-center my-3">{success}</div>}
        
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
                    value={currentEnseignant.prenom}
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
                    value={currentEnseignant.date_naissance.toString() /*.toISOString() .split('T')[0]*/}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section*</label>
                <select
                    name="section"
                    value={currentEnseignant.section}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">-- section --</option>
                    {sectionsError && <option value="">{ sectionsError } </option> }
                    {sectionsLoading ? ( <option value=""> en chargement ... </option> ) : (
                    <>
                        { sections.map((section) => (
                        <React.Fragment key={section.id_section}>
                            <option value={section.id_section} >{section.section} </option>
                        </React.Fragment>
                        ))}
                    </>
                    ) }
                    
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pseudo ou Nom d&apos; utilisateur*</label>
                <input
                    type="text"
                    name="pseudo"
                    value={currentEnseignant.pseudo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="nom d'utilisateur"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sexe*</label>
                <select
                    name="sexe"
                    value={currentEnseignant.sexe}
                    onChange={handleSelectChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">-- sexe --</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                    type="text"
                    name="telephone"
                    value={currentEnseignant.telephone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+261 33 03 333 33"
                />
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe*</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={currentEnseignant.password}
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
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
            </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
            <Link href={'/moderator/enseignant'}>
                <Button type='button' variant="secondary" className="shrink-0">
                    Annuler
                </Button>
            </Link>
            <Button 
                type='submit' 
                variant="primary" 
                icon={<SaveIcon size={18} />} 
                className="shrink-0" 
                isLoading={isLoadingLocal}
            >
                Enregistrer
            </Button>
        </div>
    </form>
    </>
  )
}
