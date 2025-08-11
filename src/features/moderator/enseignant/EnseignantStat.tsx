"use client"
import Loading from '@/app/(protected)/moderator/loading'
import { useEnseignant } from '@/hooks/useModerator'
import { Button, Card } from '@/src/components/ui'
import { AlertTriangle,  GraduationCap, Loader2, Plus, Search, TrendingUp, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'


export default function EnseignantStat() {
  
  const { actifs, enseignantsLoading, quittes, onLine} = useEnseignant();
  const [isLoading, setIsLoading] = useState(false);


  return (
    <>
    {/* Header Enseignant */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mx-2">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="text-orange-600 w-7 h-7" /> Gestion des Enseignants
            </h1>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un enseignant..."
                  className="pl-10 w-full pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <Link href='/moderator/enseignant/gestion' onClick={() => setIsLoading(true)}>
              <Button variant="primary" icon={<Plus size={18} />} className="shrink-0" isLoading={isLoading}>
                Ajouter un enseignant
              </Button>
              </Link>
            </div>
        </div>
        {/* Enseignant Stat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-2xl transition-shadow p-4 bg-gradient-to-r from-gray-200 to-gray-300 border-amber-400">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-700">Enseignants en ligne</p>
              <h3 className="text-3xl font-bold mt-1 ">{ enseignantsLoading ? <Loader2 className='animate-spin'/> : onLine.enseignants.length }  </h3>
              <p className="text-xs text-gray-700 mt-2">en développement ...</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg text-orange-600">
              <UserCircle2 className="h-5 w-5 " />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-2xl transition-shadow p-4 bg-gradient-to-r from-green-200 to-green-300  border-green-400">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-700">Efféctifs Enseignants</p>
              <h3 className="text-2xl font-bold mt-1">{enseignantsLoading ? <Loader2 className='animate-spin'/> : actifs.enseignants.length } </h3>
            <div className='flex'>
                <p className="text-xs text-gray-700 mt-2">dernier ajout </p>
                <p className="text-xs text-gray-700 m-2 text-end">- il y a 1h</p>
            </div>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-2xl transition-shadow p-4 bg-gradient-to-r from-red-200 to-red-300 border-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-700">Retraites - Démmissions</p>
              <h3 className="text-2xl font-bold mt-1 text-red-500"> {enseignantsLoading ? <Loader2 className='animate-spin'/> : quittes.enseignants.length }</h3>
              <div className='flex'>
                <p className="text-xs text-gray-700 mt-2">dernier sortie </p>
                <p className="text-xs text-gray-700 m-2 text-end">- il y a 1 ans</p>
            </div>
            </div>
            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
