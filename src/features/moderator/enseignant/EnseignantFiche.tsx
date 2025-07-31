"use client"
import { useEnseignant } from '@/hooks/useModerator';
import { Card } from '@/src/components/ui'
import { EnseignantIdType } from '@/src/types/type';
import Image from 'next/image'
import DefaultWoman from "@/public/avatarWoman.png"
import DefaultMan from "@/public/avatarMan.png"
import { PrinterIcon } from 'lucide-react';

type PropsEnseingantID = {
    params: string;
}

export default function EnseignantFiche(props : PropsEnseingantID) {

    
    const { actifs } =  useEnseignant()

    const enseignant = actifs.enseignants.find((ens : EnseignantIdType) => ens.id_enseignant === Number(props.params)) as EnseignantIdType;

    const empty = <span className='text-gray-400'> champs vide... </span> ;
  return (

    <>
      <Card className="hover:shadow-2xl transition-shadow p-4 bg-white text-gray-800">
            <div className=' flex flex-col-1 space-x-10 gap-8 items-center'>
                <div className='border-1 border- w-25 h-25 contain-content '>
                <Image src={enseignant.sexe === 'F' ? DefaultWoman : DefaultMan} alt='photo de profile par defaut' className='w-25 h-25 text-gray-800'/>
                </div>
                
                <div>
                    <div>
                        <h3 className="text-2xl font-bold mt-1"> <span className='uppercase'> {enseignant.nom} </span> <span> {enseignant.prenom} </span></h3>
                        <p className="text-xs text-gray-800 mt-2"> <span className='underline'> Matricule</span> : LPMA/E/00{enseignant.id_enseignant || empty} </p>
                        <p className="text-xs text-gray-800 mt-2"> <span className='underline'> Sexe  </span> :  { enseignant.sexe === 'F' ? <span> Feminin </span> :  <span> Masculin </span> } </p>
                        <p className="text-xs text-gray-800 mt-2"> <span className='underline'> Nom d&apos; utilisateur </span> : {enseignant.pseudo || empty} </p>
                    </div>
                </div>
                
            </div>
          <div className="flex-col items-start mt-7 border-t-2 border-t-gray-500 gap-2 border-b-2">
            <div className='mt-2'>
            <div className='w-full ' />
              <h3 className="text-md font-bold mt-2">Personel</h3>
              <p className="text-xs text-gray-800 mt-2"> <span className='underline'> Domicile </span> : <span> { empty } </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Mobile</span> : <span> {enseignant.telephone || empty } </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Email</span> : <span> { enseignant.email || empty}  </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Date de Naissance</span> : <span> { enseignant.date_naissance?.toString() || empty}  </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Lieu de Naissance</span> : <span> { enseignant.lieu_naissance || empty}  </span> </p>
            </div>

            <div className='mt-10 mb-5'>
            <div className='w-full ' />
              <h3 className="text-md font-bold mt-2"> Etablissement </h3>
              <p className="text-xs text-gray-800 mt-2"> <span className='underline'> Section </span> : <span>{ enseignant.section || empty }</span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Status</span> : <span> {enseignant.status || empty } </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Date d&apos; admission</span> : <span> {enseignant.date_entree?.toString() || empty } </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Contrat</span> : <span> { empty}  </span> </p>
              <p className="text-xs text-gray-800 mt-2"><span className='underline'> Salaire</span> : <span> { enseignant.salaire || empty}  </span> </p>
            </div>
          </div>
        </Card>
        <div className='flex justify-end mt-5'>
            <div className="p-2 rounded-lg text-sky-800 cursor-pointer hover:text-gray-50 hover:bg-sky-800">
                <PrinterIcon className="h-7 w-7" />
            </div>
        </div>
    </>
  )
}
