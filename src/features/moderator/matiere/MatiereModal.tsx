"use client"

import { EnseignementProps } from "@/src/types/type";
import { useEffect, useState } from "react";

export default function MatiereModal(props : EnseignementProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [selectedClasse, setSelectedClasse] = useState<string |undefined>('');
  const [currentMatiereClasse , setCurrentMatiereClasse] = useState()


  useEffect(() => {
    const prev = props.dataClasse?.find(classe => classe.id_classe == props.selectedClasse)  
    setSelectedClasse(prev!.classe!);
  }, [])

  const joursSemaine = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const creneauxHoraires = [
    '07:00-08:00', '08:00-09:00', '09:00-10:00', 
    '11:00-12:00', '13:00-14:00', '14:00-15:00',
    '15:00-16:00', '16:00-17:00', '17:00-18:00'
  ];

  const toggleCreneau = (jour, heure, isEditMode = false, currentEmploi = []) => {
    // En mode édition, vérifier les conflits avec les autres matières
    if (isEditMode) {
      const otherMatieres = matieresClasses.filter(
        mc => mc.classeId == selectedClasse && mc.id !== currentMatiereClasse!.id
      );
      
      const isOccupied = otherMatieres.some(mc => 
        mc.emploiDuTemps.some(edt => edt.jour === jour && edt.heure === heure)
      );

      if (isOccupied) {
        alert("Ce créneau est déjà occupé pour cette classe");
        return;
      }
    } else {
      // En mode ajout, vérifier avec tous les créneaux occupés
      if (occupiedSlots[jour]?.includes(heure)) {
        alert("Ce créneau est déjà occupé pour cette classe");
        return;
      }
    }

    setCurrentMatiereClasse(prev => {
      const existingIndex = prev.emploiDuTemps.findIndex(
        edt => edt.jour === jour && edt.heure === heure
      );

      if (existingIndex >= 0) {
        return {
          ...prev,
          emploiDuTemps: prev.emploiDuTemps.filter((_, index) => index !== existingIndex)
        };
      } else {
        return {
          ...prev,
          emploiDuTemps: [...prev.emploiDuTemps, { jour, heure }]
        };
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4"> Ajouter une matière à la classe {selectedClasse} </h2>
        
        {/* Légende des créneaux */}
        <div className="flex items-center mb-4 space-x-4">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-blue-100 mr-2 border border-blue-300"></div>
            <span className="text-sm">Sélectionné</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-100 mr-2 border border-red-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm">Occupé</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-white mr-2 border border-gray-300"></div>
            <span className="text-sm">Disponible</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matière*</label>
            <select
              //value={currentMatiereClasse.matiereId}
              /*onChange={(e) => setCurrentMatiereClasse({
                ...currentMatiereClasse, 
                matiereId: e.target.value
              })}*/
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Sélectionner --</option>
              {props.dataMatiere?.map(matiere => (
                <option key={matiere.id_matiere} value={String(matiere.id_matiere)}>
                  {matiere.matiere}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enseignant*</label>
            <select
              /*value={currentMatiereClasse.enseignantId}
              onChange={(e) => setCurrentMatiereClasse({
                ...currentMatiereClasse, 
                enseignantId: e.target.value
              })}*/
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Sélectionner --</option>
              {props.dataEnseignant?.map( enseignant => (
                <option key={enseignant.id_enseignant} value={enseignant.id_enseignant}>
                  {enseignant.user_enseignant_enseignantTouser?.prenom} {enseignant.user_enseignant_enseignantTouser?.nom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Coefficient*</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              /*value={currentMatiereClasse.coefficient}
              onChange={(e) => setCurrentMatiereClasse({
                ...currentMatiereClasse, 
                coefficient: parseFloat(e.target.value) || 1
              })}*/
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Emploi du temps</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Heures/Jours</th>
                  {joursSemaine.map(jour => (
                    <th key={jour} className="px-4 py-2 text-center">{jour}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {creneauxHoraires.map(heure => (
                  <tr key={heure}>
                    <td className="px-4 py-2 text-sm font-medium">{heure}</td>
                    {joursSemaine.map(jour => {
                      const horaire = typeof props.dataEnseignement! === 'string' ? JSON.parse(props.dataEnseignement!) : props.dataEnseignement!;

                      const isSelected = horaire.creneaux.some(
                        edt => edt.jour === jour && edt.heure === heure
                      );
                      const isOccupied = isEditMode 
                        ? false
                        : occupiedSlots[jour]?.includes(heure);
                      return (
                        <td 
                          key={`${jour}-${heure}`} 
                          className={`px-4 py-2 text-center border ${
                            isSelected ? 'bg-blue-100' : 
                            isOccupied ? 'bg-red-100 cursor-not-allowed' : 
                            'hover:bg-gray-200 cursor-pointer'
                          }`}
                          onClick={() => toggleCreneau(jour, heure)}
                        >
                          {isSelected ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : isOccupied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto text-red-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Créneaux sélectionnés :</h4>
            {/*renderEmploiDuTemps(currentMatiereClasse.emploiDuTemps)*/}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            //onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            //onClick={onSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
           //{isEditMode ? 'Modifier' : 'Enregistrer'}
          >
            Enregistrer
          </button>
        </div>

      </div>
    </div>
  )
}
