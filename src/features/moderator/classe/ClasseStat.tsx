"use client"

import { useClasse } from '@/hooks/useModerator'
import {  Button, Card } from '@/src/components/ui'
import { BarChart2, BookOpen, Loader2, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


export default function ClasseStat() {
      const { classes, classesLoading } = useClasse();
      const [isLoading, setIsLoading] = useState(false);

      const EnDev = <span className='text-sm text-sky-700 animate-pulse flex items-center '> <Loader2 className='animate-spin mr-2' /> On Dev... </span>
        
  return (
    <>
    {/* Header avec bouton d'ajout */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="text-orange-600" /> Gestion des Classes
        </h1>
        <Link href="/moderator/classe/gestion/ajouter" onClick={() => setIsLoading(true)}>
        <Button icon={<Plus size={18} />} isLoading={isLoading}>
          Ajouter une classe
        </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Classes actives</p>
              <h3 className="text-2xl text-sky-950 font-bold mt-1">
                { classesLoading && <Loader2 className='animate-spin'/>}
                {classes?.length}
              </h3>
            </div>
            <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Effectif moyen</p>
              <h3 className="text-2xl font-bold mt-1">
                { EnDev }
              </h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Moyenne générale</p>
              <h3 className="text-2xl font-bold mt-1">
                { EnDev }
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <BarChart2 className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>
    </>
    
  )
}
