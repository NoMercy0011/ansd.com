"use client"

import { classeType, EnseignantType, EnseignementProps, EnseignementType, MatiereType } from "@/src/types/type"
import { useEffect, useState } from "react"
import MatiereModal from "./MatiereModal";
import MatiereList from "./MatiereList";

export default function AddMatiere( props : EnseignementProps) {
    const [classes, setClasses] = useState<classeType[]>([]);
    const [selectedClasse, setSelectedClasse] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [enseignement, setEnseignement] = useState<EnseignementType[]> ([])
    
      const [matieres, setMatieres] =  useState<MatiereType[]>([]) ;
      const [enseignants, setEnseignants] = useState<EnseignantType[]>([]);

    useEffect(() => {
        setClasses([...props.dataClasse!]);
        setEnseignement([...props.dataEnseignement!]);
        setMatieres([...props.dataMatiere!]);
        setEnseignants([...props.dataEnseignant!]);

    }, [])

    const initAddForm = () => {
        setShowModal(true)
    }
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex  justify-between md:w-200">
        <div className="w-full md:w-1/3 mx-2">
          <select
            value={selectedClasse}
            onChange={(e) => setSelectedClasse(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Tous les Classes --</option>
            {classes.map(classe => (
              <option key={classe.id_classe} value={classe.id_classe}>{classe.classe}</option>
            ))}
          </select>
        </div>

        <button
          onClick={initAddForm}
          disabled={!selectedClasse}
          className={`flex items-center mx-2 align-bottom px-4 py-2 rounded-lg transition-colors ${!selectedClasse ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className="ml-2">Ajouter une matière</span>
        </button>
        </div>
        {
            showModal && <MatiereModal 
              dataEnseignement={enseignement} 
              dataClasse={classes} 
              dataEnseignant={enseignants} 
              dataMatiere={matieres} 
              selectedClasse={selectedClasse} />
          }
      </div>
          {
            selectedClasse && <MatiereList dataEnseignement={enseignement} classeSelected={selectedClasse}/>
          }
    </div>
  )
}
