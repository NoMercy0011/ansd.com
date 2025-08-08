// components/emploi-du-temps/Edt1H.tsx
"use client"

import { Card } from "@/src/components/ui";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const creneaux = Array.from({ length: 10 }, (_, i) => {
  const heure = 8 + i;
  return `${heure}h-${heure + 1}h`;
});

export function Edt1H() {
  // Mock data plus détaillée
  const cours = [
    { 
      jour: "Lundi", 
      creneau: "8h-9h", 
      matiere: "Mathématiques", 
      enseignant: "P. Diallo", 
      salle: "B12",
      type: "Cours"
    },
    // ... autres cours
  ];

  return (
    <Card className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2 w-24">Heures</th>
              {jours.map(jour => (
                <th key={jour} className="border p-2 min-w-48">{jour}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {creneaux.map(creneau => (
              <tr key={creneau} className="h-20">
                <td className="border p-2 font-medium">{creneau}</td>
                {jours.map(jour => {
                  const coursActuel = cours.find(c => c.jour === jour && c.creneau === creneau);
                  return (
                    <td 
                      key={`${jour}-${creneau}`}
                      className="border p-1 hover:bg-gray-50"
                    >
                      {coursActuel && (
                        <div className={`p-2 rounded h-full ${
                          coursActuel.type === "Cours" ? 'bg-blue-50 border-l-4 border-blue-400' :
                          coursActuel.type === "TP" ? 'bg-green-50 border-l-4 border-green-400' :
                          'bg-purple-50 border-l-4 border-purple-400'
                        }`}>
                          <p className="font-medium text-sm">{coursActuel.matiere}</p>
                          <p className="text-xs text-gray-600">{coursActuel.enseignant}</p>
                          <p className="text-xs text-gray-500 mt-1">{coursActuel.salle}</p>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Légende avancée */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 bg-blue-100 border-l-4 border-blue-400 mr-2"></span>
          Cours magistral
        </div>
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 bg-green-100 border-l-4 border-green-400 mr-2"></span>
          Travaux pratiques
        </div>
        <div className="flex items-center">
          <span className="inline-block w-4 h-4 bg-purple-100 border-l-4 border-purple-400 mr-2"></span>
          Activité spéciale
        </div>
      </div>
    </Card>
  );
}