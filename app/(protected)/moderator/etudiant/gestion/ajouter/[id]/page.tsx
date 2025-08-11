import { ReadClasseId } from '@/src/actions/moderator/crud.etudiant.action';
import EleveForm from '@/src/features/moderator/etudiant/EtudiantFrom'
import React from 'react'

type PropsClasseID = {
    params : Promise<{
        id: string;
    }>;
}


export default async function page({ params }: PropsClasseID) {
  const classe = {
    id: (await params).id,
  };

  const classeData = await ReadClasseId(Number(classe.id));

  return (
    <div>
      <EleveForm  classeData={classeData.data} />
    </div>
  )
}
