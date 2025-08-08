
import { Button } from '@/src/components/ui'
import { BookMarkedIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function MatiereHeader() {

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <BookMarkedIcon className="text-orange-600" /> Matieres
            </h1>
        </div>
        <div className='flex justify-between'>
        <Link href="/moderator/matiere/gestion"> 
            <Button  icon={<Plus size={18} />}>
                Ajouter une matière
            </Button>
        </Link>
        </div>
      </div>
    </>
  )
}
