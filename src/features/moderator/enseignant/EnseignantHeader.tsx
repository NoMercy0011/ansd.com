
import { Button } from '@/src/components/ui'
import { GraduationCap, Link, Plus, Search } from 'lucide-react'

export default function EnseignantHeader() {
  return (
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
          <Link href='/moderator/enseignant/gestion' >
          <Button variant="primary" icon={<Plus size={18} />} className="shrink-0">
            Ajouter un enseignant
          </Button>
          </Link>
        </div>
    </div>
  )
}
