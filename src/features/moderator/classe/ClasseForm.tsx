"use client"

import { useEnseignant, useNiveau, useSection } from '@/hooks/useModerator';
import { CreateClasse } from '@/src/actions/moderator/crud.classe.action';
import { Button } from '@/src/components/ui';
import { classeType } from '@/src/types/type';
import { Save } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';


type ClasseFormProps = {
    isEditing?: boolean;
    isNew?: boolean;
    params?: number;
}

type ClasseType = {
  classe: string;
  niveau: string;
  responsable: string;
  section: string;
}


export default function ClasseForm( props : ClasseFormProps) {
    const { actifs, enseignantsLoading } = useEnseignant();
    const { niveaux, niveauxLoading } = useNiveau();
    const { sections, sectionsLoading } = useSection();
    

    const [classeData, setClasseData] = useState<classeType>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setClasseData({
        ...classeData,
        [e.target.name] : e.target.value,
      })
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      try{
        const res = await CreateClasse(classeData);
        if( res.status === 401){
          setError(res.message);
          setSuccess('');
        }
        else if( res.status === 201) {
          setSuccess(res.message);
          setError('');
        }

        setClasseData({
          classe: '',
          niveau: 0,
          section: 0,
          responsable: 0,
        });
        
      }catch(error){
            setError("Une erreur inattendue est survenue");
            console.error(error);
      }finally{
        setIsLoading(false);
        setTimeout(() => {
                setSuccess('');
        }, 3000);
      }
    }

    const handleDelete = () => {
 
    }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ajouter une nouvelle Classe
                </h3>
                { error && <div className='text-red-600 font-medium text-center'> { error } </div> }
                { success && <div className='text-green-600 font-medium text-center'> { success } </div> }
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la classe</label>
                    <input
                      type="text"
                      value={classeData?.classe || ''}
                      onChange={(e) => setClasseData({...classeData, classe: e.target.value})}
                      name='classe'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: 6ème A"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select
                      value={classeData?.niveau || ''}
                      onChange={handleSelect}
                      name='niveau'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      { niveauxLoading ? ( <option value=""> Chargement ...</option> ) :
                      ( <>
                          <option value="">Sélectionner le niveau</option>
                          {niveaux?.map((niveau) => (
                          <option key={niveau.id_niveau} value={niveau.id_niveau}>
                            {niveau.niveau}
                          </option>
                        ))}
                      </> )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <select
                      value={classeData?.section || ''}
                      onChange={handleSelect}
                      name='section'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      { sectionsLoading ? ( <option value=""> Chargement ...</option> ) :
                       (<>
                        <option value="">Sélectionner la section</option>
                        {sections.map((section : any) => (
                          <option key={section.id_section} value={section.id_section}>
                            {section.section}
                          </option>
                        ))}
                       </> )
                      }
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professeur Principal</label>
                    <select
                      value={classeData?.responsable || ''}
                      onChange={handleSelect}
                      name='responsable'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      { enseignantsLoading ? ( <option value=""> Chargement ...</option> ) :
                        (
                          <>
                            <option value="">Sélectionner un professeur</option>
                            {actifs.enseignants.map((enseignant : any) => (
                              <option key={enseignant.id_enseignant} value={enseignant.id_enseignant}>
                                {enseignant.nom} {enseignant.prenom} 
                              </option>
                          ))}
                        </>
                        )
                      }
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Link href={'/moderator/classe'} >
                  <Button
                    type='button'
                    variant='ghost'
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </Button>
                  </Link>
                  <Button
                    type='submit'
                    className=""
                    isLoading={isLoading}
                  >
                    <Save className='mx-1'/>  Enregistrer
                  </Button>
                </div>
              </div>
        </div>
        </form>
      </div>
    </>
  )
}
