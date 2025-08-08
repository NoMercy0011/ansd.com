"use client"

import { useSection } from '@/hooks/useModerator'
import { CreateMatiere, UpdateMatiere } from '@/src/actions/moderator/crud.matiere.action'
import { Button } from '@/src/components/ui'
import { MatiereData } from '@/src/types/type'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type MatierFormProps = {
    matiere?: MatiereData;
    isEdit?: boolean;
    isNew?: boolean;
}


export default function MatiereForm( props : MatierFormProps) {
    const router = useRouter();
    const { sections, sectionsLoading} = useSection();

    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [matiereState, setMatiereState] = useState<MatiereData>({
        id_matiere: Number(props.matiere?.id_matiere),
        code: props.matiere?.code,
        matiere: props.matiere?.matiere,
        section: props.matiere?.section,
        section_id: props.matiere?.section_id
    });

    const handleSubmit = async( e : React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        try {
            if(props.isNew){
                setIsLoading(true);
                const response = await CreateMatiere(matiereState);
                if(response.error){
                    setSuccess('');
                    setError(response.error)
                } else {
                    setSuccess(response.message);
                    setError('');
                }
            } else if (props.isEdit){
                setIsLoading(true);
                const response = await UpdateMatiere(matiereState);
                if(response.error){
                    setSuccess('');
                    setError(response.error)
                } else {
                    setSuccess(response.message);
                    setError('');
                }
            }

        }finally{
            setTimeout(() => {
                setSuccess('');
            }, 3000);
            setIsLoading(false);
            router.back();
        }
    }

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMatiereState({
        ...matiereState,
        [e.target.name] : e.target.value,
      })
    }

  return (

    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className='flex justify-between items-start border-b border-b-gray-300'>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 ">
                        {props.isEdit && 'Modification'}
                        {props.isNew && 'Nouvelle matière'}
                    </h3>
                    <Link href={'/moderator/matiere'}>
                    <p className='flex hover:underline cursor-pointer'>
                        <ChevronLeft /> Retour
                    </p>
                    </Link>
                </div>
                { error && <div className='text-red-600 font-medium text-center'> { error } </div> }
                { success && <div className='text-green-600 font-medium text-center'> { success } </div> }
                <div className="space-y-4 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Nom de la matiere</label>
                    <input
                      type="text"
                      value={matiereState?.matiere || props.matiere?.matiere || ''}
                      onChange={(e) => setMatiereState({...matiereState, matiere: e.target.value})}
                      name='matiere'
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: Mathématique"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Code Matiere (Code d&apos;identification unique pour chaque section) </label>
                    <input
                      type="text"
                      value={matiereState?.code || props.matiere?.code || ''}
                      onChange={(e) => setMatiereState({...matiereState, code: e.target.value})}
                      name='matiere'
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: MATH"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">*Section</label>
                    <select
                      value={matiereState?.section_id || props.matiere?.section_id || ''}
                      onChange={handleSelect}
                      name='section_id'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      { sectionsLoading ? ( <option value=""> Chargement ...</option> ) :
                       (<>
                        <option value="">Sélectionner la section</option>
                        {sections.map((section) => (
                          <option key={section.id_section} value={section.id_section}>
                            {section.section}
                          </option>
                        ))}
                       </> )
                      }
                    </select>
                  </div>

                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <Link href={'/moderator/matiere'}>
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
                    {!isLoading && <Save className='mx-1'/> } Enregistrer
                  </Button>
                </div>
              </div>
        </div>
        </form>
      </div>
    </>
  )
}

