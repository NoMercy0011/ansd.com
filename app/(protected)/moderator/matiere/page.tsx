"use client"
import { Card, Button, Select } from "@/src/components/ui";
import { Plus, CalendarDays, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

// Mock data réaliste
const mockClasses = [
  { id: "CLA-1", niveau: "Terminale", nom: "A" },
  { id: "CLA-2", niveau: "Terminale", nom: "B" },
  { id: "CLA-3", niveau: "1ère", nom: "A" }
];

const mockEdtStats = {
  totalCours: 124,
  couverture: "92%",
  conflicts: 3
};

export default function EmploiDuTempsPage() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  return (
    <>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarDays className="text-orange-600" /> Emplois du temps
        </h1>
        <Button href="/moderator/matiere/gestion" icon={<Plus size={18} />}>
          Créer un créneau
        </Button>
      </div>

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

      {/* Sélection de classe */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Select
            items={mockClasses.map(c => ({ 
              value: c.id, 
              label: `${c.niveau} ${c.nom}` 
            }))}
            selected={selectedClass}
            onSelect={setSelectedClass}
            placeholder="Sélectionnez une classe"
            className="flex-1"
          />
          {selectedClass && (
            <Button 
              href={`/moderator/matiere/${selectedClass}`}
              variant="primary"
            >
              "Voir l'emploi du temps"
            </Button>
          )}
        </div>
      </Card>

      {/* Liste des classes avec aperçu */}
      <Card>
        <h3 className="text-lg font-semibold p-4 border-b">Toutes les classes</h3>
        <div className="divide-y divide-gray-200">
          {mockClasses.map(classe => (
            <div 
              key={classe.id} 
              className="p-4 hover:bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{classe.niveau} {classe.nom}</h4>
                <p className="text-sm text-gray-500 mt-1">18 créneaux cette semaine</p>
              </div>
              <Button 
                variant="ghost" 
                href={`/moderator/matiere/${classe.id}`}
                icon={<ChevronRight className="h-4 w-4" />}
              >
                Voir
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
    </>
  )
}