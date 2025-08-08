import { Button } from '@/src/components/ui'
import { CalendarDays, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function EdtHeader() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarDays className="text-orange-600" /> Emplois du temps
        </h1>
        <Link href="/moderator/emploi-du-temps/gestion"> 
        <Button  icon={<Plus size={18} />}>
          Créer un créneau
        </Button>
        </Link>
      </div>
    </div>
  )
}
