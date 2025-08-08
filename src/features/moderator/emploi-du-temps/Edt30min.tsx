"use client"
import { useState } from "react";
import { Card, Button } from "@/src/components/ui";
import { ChevronDown, ChevronUp, Edit, Printer } from "lucide-react";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

// Structure des périodes de la journée
const periodes = [
  { 
    nom: "Matin", 
    creneaux: ["8h-9h", "9h-10h", "10h-11h"],
    defaultOpen: true
  },
  { 
    nom: "Récréation", 
    creneaux: ["11h-12h"],
    isBreak: true,
    defaultOpen: false
  },
  { 
    nom: "Après-midi", 
    creneaux: ["14h-15h", "15h-16h", "16h-17h", "17h-18h"],
    defaultOpen: true
  }
];

// Mock data - À remplacer par vos données réelles
const mockCours = [
  { jour: "Lundi", creneau: "8h-9h", matiere: "Maths", enseignant: "P. Diallo", salle: "B12" },
  { jour: "Lundi", creneau: "9h-10h", matiere: "Physique", enseignant: "K. Traoré", salle: "Lab1" },
  // ... autres cours
];

export function EdtClassePersonnalise({ classe }: { classe: string }) {
  const [openPeriodes, setOpenPeriodes] = useState<Record<string, boolean>>(
    periodes.reduce((acc, p) => ({ ...acc, [p.nom]: p.defaultOpen }), {})
  );

  const togglePeriode = (nom: string) => {
    setOpenPeriodes(prev => ({ ...prev, [nom]: !prev[nom] }));
  };

  return (
    <Card>
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold">Emploi du temps - {classe}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" icon={<Printer size={16} />}>
            Imprimer
          </Button>
          <Button variant="ghost" size="sm" icon={<Edit size={16} />}>
            Modifier
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-32"></th>
              {jours.map(jour => (
                <th key={jour} className="p-3 text-center font-medium border-b">
                  {jour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periodes.map(periode => (
              <>
                {/* Ligne d'en-tête de période */}
                <tr 
                  key={`header-${periode.nom}`} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => togglePeriode(periode.nom)}
                >
                  <td className="p-2 font-medium border-b">
                    <div className="flex items-center justify-between">
                      <span>{periode.nom}</span>
                      {openPeriodes[periode.nom] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </td>
                  {jours.map(jour => (
                    <td key={`${periode.nom}-${jour}`} className="border-b">
                      {periode.isBreak && (
                        <div className="bg-yellow-50 text-yellow-700 text-center p-2 text-sm">
                          Pause
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Créneaux de la période (masquables) */}
                {openPeriodes[periode.nom] && !periode.isBreak && periode.creneaux.map(creneau => (
                  <tr key={`${periode.nom}-${creneau}`} className="hover:bg-gray-50">
                    <td className="p-2 text-sm text-gray-500 text-right pr-4">
                      {creneau}
                    </td>
                    {jours.map(jour => {
                      const cours = mockCours.find(c => c.jour === jour && c.creneau === creneau);
                      return (
                        <td key={`${jour}-${creneau}`} className="p-2 border">
                          {cours ? (
                            <div className="bg-blue-50 rounded p-2 border border-blue-100">
                              <p className="font-medium text-sm">{cours.matiere}</p>
                              <p className="text-xs text-gray-600">{cours.enseignant}</p>
                              <p className="text-xs text-gray-500 mt-1">{cours.salle}</p>
                            </div>
                          ) : (
                            <div className="h-12"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Légende */}
      <div className="p-4 border-t flex flex-wrap gap-4 text-sm">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-100 border border-blue-300 mr-2 rounded-sm"></span>
          Cours normal
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-yellow-100 border border-yellow-300 mr-2 rounded-sm"></span>
          Pause/Récréation
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-gray-100 border border-gray-300 mr-2 rounded-sm"></span>
          Créneau disponible
        </div>
      </div>
    </Card>
  );
}