"use client"
import { CreateClasse } from '@/src/actions/moderator/crud.classe.action';
import { ReadEnseignantAction } from '@/src/actions/moderator/crud.enseignant.action';
import GetNiveau from '@/src/actions/moderator/niveau.action';
import { WarningIcon } from '@/src/components/ui/icon';
import { classeType, EnseignantType } from '@/src/types/type';
import { useEffect, useState } from 'react';


type ClasseModalProps = {
    isEditing?: boolean;
    isNew?: boolean;
    isDelete?: boolean;
    id_classe?: number;
    classe?: {
        id_classe: number;
        nom: string;
        niveau: number;
        prof_responsable: number;
    };
    onClose: () => void;
}

/*type ClasseType = {
  classe: string;
  niveau: string;
  responsable: string;
  etablissement: string;
}*/
type NiveauType = {
  id_niveau: number;
  niveau: string;
}

type EnseignantResponsableType = {
  id_enseignant : number | null;
  id_user : number | null;
  id_etablissement :number | null;
  chef_etablissement:number | null;
  date_creation : Date | null;
  date_modification: Date |null;
  modificateur:number|null;
  date_suppression:Date | null;
  suppresseur:number|null;
  status:string | null;
  annee_scolaire : number| null;
  user_enseignant_enseignantTouser: {
    id_user: number | null;
    nom:string | null;
    prenom:string | null;
    email:string | null;
    sexe:string | null;
    date_naissance: Date | null;
    lieu_naissance :string | null;
    telephone: string | null;
    }
}

export default function ClasseModal(props : ClasseModalProps) {

    const [niveau, setNiveau] = useState<NiveauType[] > ([]);
    const [enseignants, setEnseignants] = useState<EnseignantResponsableType[] >([]);

    const [classeData, setClasseData] = useState<classeType>()

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setClasseData({
        ...classeData,
        [e.target.name] : e.target.value,
      })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      CreateClasse(classeData!);
      setClasseData({
        ...classeData,
        classe: '',
        niveau: undefined,
        responsable: undefined,
      });
    }
    useEffect(() => {
       GetNiveau().then((res) => res.niveau).then(setNiveau);
       ReadEnseignantAction().then((res) => res.data!).then(setEnseignants);
    }, [])

    const handleDelete = () => {

    }

  return (
    <>
    { props.isDelete ? (
      <div className="fixed inset-0 text-md backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-amber-100 rounded-lg shadow-xl max-w-2xl w-full p-7 text-center">
                 <div className="w-20 h-20 m-auto text-red-500">
                    <WarningIcon />
                  </div>
                <div> Voulez vous vraiment supprimer de votre etablissement ? </div>
                <div className="text-md font-bold m-2"> &apos;&apos; { props.classe?.nom} &apos;&apos; </div>
                <div className="mt-6 flex justify-center space-x-3">
                    <button
                      onClick={props.onClose}
                      className="px-4 py-2 shadow bg-gray-300 border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button type="button"
                      onClick ={ handleDelete }
                      className="px-4 py-2 shadow bg-red-500 text-gray-50 rounded-md text-sm font-medium hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
              </div>
            </div>
    ) : (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {props.isEditing ? 'Modifier la Classe' : 'Nouvelle Classe'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      defaultValue={props.classe}
                      onChange={(e) => setClasseData({...classeData, classe: e.target.value})}
                      name='classe'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ex: 6ème A"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <select
                      value={props.niveau}
                      onChange={handleSelect}
                      name='niveau'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionner un niveau</option>
                      {niveau.map((niveau) => (
                        <option key={niveau.id_niveau} value={niveau.id_niveau}>
                          {niveau.niveau}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professeur Principal</label>
                    <select
                      value={props.responsable}
                      onChange={handleSelect}
                      name='responsable'
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Sélectionner un professeur</option>
                      {enseignants.map((enseignant) => (
                        <option key={enseignant.user_enseignant_enseignantTouser.id_user} value={enseignant.id_enseignant!}>
                          {enseignant.user_enseignant_enseignantTouser.nom} {enseignant.user_enseignant_enseignantTouser.prenom} 
                        </option>
                        
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={props.onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    //onClick={handleAddClasse}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    {props.isEditing ? 'Mettre à jour' : 'Enregistrer'}
                  </button>
                </div>
              </div>
        </div>
        </form>
      </div>
    )

    }
    </>
  )
}
