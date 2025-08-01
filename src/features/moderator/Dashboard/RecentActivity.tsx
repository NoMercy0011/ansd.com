
import { Card } from '@/src/components/ui';
import { ChevronRight, FileText, Users } from 'lucide-react'
import React from 'react'

export default function RecentActivity() {
    const recentActivities = [
  { id: 1, action: "Nouveau bulletin généré", class: "Terminale A", time: "10 min" },
  { id: 2, action: "Modification emploi du temps", class: "1ère B", time: "25 min" },
  { id: 3, action: "Ajout d'un enseignant", user: "Prof. Diallo", time: "1h" },
  { id: 4, action: "Inscription étudiante", user: "Aïcha Bamba", time: "2h" }
];
  return (
    <>
    <Card title="Activités Récentes">
      <div className="space-y-4">
        {recentActivities.map(activity => (
          <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className={`p-2 rounded-lg mr-4 bg-${activity.id % 2 === 0 ? 'sky' : 'pink'}-100`}>
              {activity.id % 2 === 0 ? (
                <FileText className={`h-5 w-5 text-${activity.id % 2 === 0 ? 'sky' : 'pink'}-600`} />
              ) : (
                <Users className={`h-5 w-5 text-${activity.id % 2 === 0 ? 'sky' : 'pink'}-600`} />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">
                {activity.class || activity.user} • {activity.time}
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </Card>
    </>
  )
}
