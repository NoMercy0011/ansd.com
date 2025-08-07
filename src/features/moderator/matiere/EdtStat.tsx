import { Card } from '@/src/components/ui'
import { Clock } from 'lucide-react'
import React from 'react'

export default function EdtStat() {

    const mockEdtStats = {
      totalCours: 124,
      couverture: "92%",
      conflicts: 3
    };
    
  return (
    <>
    {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Créneaux planifiés</p>
              <h3 className="text-2xl font-bold">{mockEdtStats.totalCours}</h3>
            </div>
          </div>
        </Card>
        {/* ... autres stats ... */}
      </div> 
    </>
  )
}

