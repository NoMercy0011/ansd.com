"use client"
import { useState } from "react";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const creneaux = ["8h-10h", "10h-12h", "12h-14h", "14h-16h", "16h-18h"];

export default function EdtGrid({ classeId }: { classeId: string }) {
  // Mock data - À remplacer par appel API
  const [edtData, setEdtData] = useState([
    { jour: "Lundi", creneau: "8h-10h", matiere: "Maths", enseignant: "P. Diallo", salle: "B12" },
    // ... autres créneaux
  ]);

  const handleCellClick = (jour: string, creneau: string) => {
    // Logique pour ajouter/modifier un cours
    setEdtData({...edtData});
    console.log(`Créneau ${creneau} du ${jour} cliqué`);
    console.log(classeId);
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2">Heures</th>
            {jours.map(jour => (
              <th key={jour} className="border p-2">{jour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {creneaux.map(creneau => (
            <tr key={creneau}>
              <td className="border p-2 font-medium">{creneau}</td>
              {jours.map(jour => {
                const cours = edtData.find(c => c.jour === jour && c.creneau === creneau);
                return (
                  <td 
                    key={`${jour}-${creneau}`} 
                    className="border p-2 h-24 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleCellClick(jour, creneau)}
                  >
                    {cours ? (
                      <div className="bg-blue-50 p-2 rounded border border-blue-100 h-full">
                        <p className="font-medium">{cours.matiere}</p>
                        <p className="text-sm">{cours.enseignant}</p>
                        <p className="text-xs text-gray-500">{cours.salle}</p>
                      </div>
                    ) : (
                      <div className="h-full w-full"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}