import { Card } from '@/src/components/ui'
import { Button } from '@/src/components/ui/button'
import { Calendar } from 'lucide-react'
import React from 'react'

export default function EventUpcome() {
  return (
    <>
      
        {/* Upcoming Events */}
        <Card title="Événements à Venir">
          <div className="space-y-4">
            {[1, 2, 3].map(item => (
              <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg border border-gray-200 mr-4">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Réunion des enseignants</p>
                  <p className="text-sm text-gray-500">15 Oct. 2023 • 10:00 - 12:00</p>
                </div>
                <Button variant="ghost" size="sm">
                  Détails
                </Button>
              </div>
            ))}
          </div>
        </Card>
    </>
  )
}
