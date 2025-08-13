
import { AlertTriangle, BarChart2, Bell, Clock, List } from "lucide-react";
import { Card, StatCard } from "@/sources/components/ui";



export default function DashboardPage() {

     const stats = {
        tasksToDo: 2,
        tasksInProgress:4,
        lateTasks: 1,
    }
    
    const announcements = [
      { id: 'ANN-01', date: new Date('2025-08-18'), title: 'Lancement réussi du projet Quantum Solutions !', content: 'Un travail remarquable qui démontre notre expertise. Bravo à toute l\'équipe pour cet excellent résultat.' },
      { id: 'ANN-02', date: new Date('2025-08-15'), title: 'Bienvenue à Pierre Martin !', content: 'Nous sommes ravis de l\'accueillir dans l\'équipe Création. N\'hésitez pas à aller le saluer !' },
  ];
     
     return (
         <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <StatCard icon={List} label="Tâches à faire" value={stats.tasksToDo} color={{bg: 'bg-blue-500', text: 'text-blue-100'}} />
                 <StatCard icon={Clock} label="Tâches en cours" value={stats.tasksInProgress} color={{bg: 'bg-yellow-500', text: 'text-yellow-100'}} />
                 <StatCard icon={AlertTriangle} label="Tâches en retard" value={stats.lateTasks} color={{bg: 'bg-red-500', text: 'text-red-100'}} />
             </div>
 
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-2">
                     <Card title="Production de la semaine" titleIcon={BarChart2}>
                         <div className="h-64 flex items-end justify-center p-4">
                             <svg viewBox="0 0 400 150" className="w-full h-full">
                                 <path d="M 20 130 L 70 80 L 120 100 L 170 50 L 220 70 L 270 40 L 320 60 L 370 30" fill="none" stroke="#ef4444" strokeWidth="2" />
                                 <circle cx="70" cy="80" r="3" fill="#ef4444" /><circle cx="120" cy="100" r="3" fill="#ef4444" /><circle cx="170" cy="50" r="3" fill="#ef4444" /><circle cx="220" cy="70" r="3" fill="#ef4444" /><circle cx="270" cy="40" r="3" fill="#ef4444" /><circle cx="320" cy="60" r="3" fill="#ef4444" /><circle cx="370" cy="30" r="3" fill="#ef4444" />
                                 <text x="20" y="145" fontSize="12" className="fill-current text-slate-500">Lun</text><text x="70" y="145" fontSize="12" className="fill-current text-slate-500">Mar</text><text x="120" y="145" fontSize="12" className="fill-current text-slate-500">Mer</text><text x="170" y="145" fontSize="12" className="fill-current text-slate-500">Jeu</text><text x="220" y="145" fontSize="12" className="fill-current text-slate-500">Ven</text><text x="270" y="145" fontSize="12" className="fill-current text-slate-500">Sam</text><text x="320" y="145" fontSize="12" className="fill-current text-slate-500">Dim</text>
                             </svg>
                         </div>
                     </Card>
                 </div>
                 <div className="lg:col-span-1">
                     <Card title="Actualités Récentes" titleIcon={Bell}>
                         <div className="space-y-4">
                             {announcements.map(ann => (
                                 <div key={ann.id} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                     <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{ann.title}</h3>
                                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{ann.content}</p>
                                 </div>
                             ))}
                         </div>
                     </Card>
                 </div>
             </div>
         </div>
     );
}