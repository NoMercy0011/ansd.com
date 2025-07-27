"use client"

import { CreateEtudiant, DeleteEtudiant, UpdateEtudiant } from "@/src/actions/moderator/crud.etudiant.action";
import { WarningIcon } from "@/src/components/ui/icon";
import { EtudiantData, EtudiantModalProps } from "@/src/types/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"


export default function EtudiantModal(props : EtudiantModalProps ) {
    const route = useRouter()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentEtudiant, setCurrentEtudiant] = useState<EtudiantData> ({
      classe: null,
      nom: '',
      prenom: '',
      date_naissance: null,
      lieu_naissance: '',
      sexe: '',
      status: '',
      domicile : '',
      matricule : '',
      ecole_precedente: '',
      date_entree: null,
      nom_pere: '',
      nom_mere: '',
      telephone_parent: '',
      nom_tuteur: '',
      telephone_tuteur: '',
      telephone_urgence: '',
    })

    const init = () => {
      setCurrentEtudiant({
        ...currentEtudiant,
        classe: null,
        nom: '',
        prenom: '',
        date_naissance: null,
        lieu_naissance: '',
        sexe: '',
        status: '',
        domicile : '',
        matricule : '',
        ecole_precedente: '',
        date_entree: null,
        nom_pere: '',
        nom_mere: '',
        telephone_parent: '',
        nom_tuteur: '',
        telephone_tuteur: '',
        telephone_urgence: '',
    })
    }

    const reset = () => {
      setCurrentEtudiant({
        ...currentEtudiant,
        classe: null,
        nom: '',
        prenom: '',
        date_naissance: null,
        lieu_naissance: '',
        sexe: '',
        status: '',
        domicile : '',
        matricule : '',
        ecole_precedente: '',
        date_entree: null,
        nom_pere: '',
        nom_mere: '',
        telephone_parent: '',
        nom_tuteur: '',
        telephone_tuteur: '',
        telephone_urgence: '', 
    })
    }

    useEffect(() => {
      if( props.isEditing ){ 
        init();
      }

    }, []);

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setCurrentEtudiant({ ...currentEtudiant,
         [e.target.name] : e.target.value,
        });
    }
    const handleSaveEtudiant = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
          const data : EtudiantData = {
              classe: currentEtudiant.classe,
              nom: currentEtudiant.nom,
              prenom: currentEtudiant.prenom,
              date_naissance: new Date (currentEtudiant.date_naissance!).toISOString(), 
              lieu_naissance: currentEtudiant.lieu_naissance,
              sexe: currentEtudiant.sexe,
              status: currentEtudiant.status,
              domicile : currentEtudiant.domicile,
              matricule : currentEtudiant.matricule,
              ecole_precedente: currentEtudiant.ecole_precedente,
              date_entree: new Date (currentEtudiant.date_entree!).toISOString(),
              nom_pere: currentEtudiant.nom_pere,
              nom_mere: currentEtudiant.nom_mere,
              telephone_parent: currentEtudiant.telephone_parent,
              nom_tuteur: currentEtudiant.nom_tuteur,
              telephone_tuteur: currentEtudiant.telephone_tuteur,
              telephone_urgence: currentEtudiant.telephone_urgence,
          }

          if( props.isEditing ) {
            console.log(data.date_naissance);
            await UpdateEtudiant(data);
          }
          if( props.isNew) {
              const res = await CreateEtudiant(data);

              if(!res?.success){
                setError(res!.message);
              } 
              else if( res.success ){
                setSuccess(res.message);
                setError('');
                const interval = setInterval(() => {
                  //props.onClose();
                  reset();
                  props.onClose();
                  route.refresh();
                }, 1000); 
                return () => clearInterval(interval);

              }
            }
          }

    const handleDelete = async () => {
      await DeleteEtudiant(props.id_etudiant!);
      console.log(props.id_etudiant);
      props.onClose();
    }

  return (
    <>
    {props.isDelete ? (
      <div className="fixed inset-0 text-md backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-amber-100 rounded-lg shadow-xl max-w-2xl w-full p-7 text-center">
           <div className="w-20 h-20 m-auto text-red-500">
              <WarningIcon />
            </div>
          <div> Voulez vous vraiment supprimer de votre etablissement ? </div>
          <div className="text-md font-bold m-2"> &apos;&apos; { props.etudiant?.etudiants?.nom} { props.etudiant?.etudiants?.prenom } &apos;&apos; </div>
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
          <form onSubmit={handleSaveEtudiant}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ajouter un élève </h3>
            { error && <p> { error } </p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4 my-0">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Classe</label>
                  <select
                    required
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.classe}
                    onChange = {(e) => setCurrentEtudiant({...currentEtudiant, classe: Number(e.target.value)})}
                  >
                    <option value="">Sélectionnez une classe</option>
                    {props?.dataClasse?.data!.map((classe) => (
                      <option key={classe.id_classe} value={classe.id_classe}>{classe.classe}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Nom</label>
                  <input
                    required
                    name="nom"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.nom}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Prénom</label>
                  <input
                    required
                    name="prenom"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.prenom}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Date de naissance</label>
                  <input
                    required
                    name="date_naissance"
                    type="date"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.dateNaissance}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Lieu de naissance</label>
                  <input
                    required
                    name="lieu_naissance"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.lieuNaissance}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Sexe</label>
                  <select
                    required
                    name="sexe"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.sexe}
                    onChange = {(e) => setCurrentEtudiant({...currentEtudiant, sexe: e.target.value})}
                  >
                    <option value="">-- Sélectionnez --</option>
                    <option value= "Masculin">Masculin</option>
                    <option value= "Féminin">Féminin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Statut</label>
                  <select
                    required
                    name="status"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.statut}
                    onChange = {(e) => setCurrentEtudiant({...currentEtudiant, status: e.target.value})}
                  >
                        <option  value="" >-- Sélectionnez --</option>
                        <option  value="passant" >passant</option>
                        <option  value="redoublant" >redoublant</option>
                        <option  value="triplant" >autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Domicile</label>
                  <input
                    required
                    name="domicile"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.domicile}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Contact en cas d&apos; urgence</label>
                  <input
                    required
                    name="telephone_urgence"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.contactTuteur}
                    onChange={handleChange}
                  />
                </div>
              </div>
                    
              <div className="my-0 space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Matricule</label>
                  <input
                    required
                    name="matricule"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.ecolePrecedente}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* École précédente</label>
                  <input
                    required
                    name="ecole_precedente"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.ecolePrecedente}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">* Date d&apos; entrée</label>
                  <input
                    required
                    name="date_entree"
                    type="date"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.dateEntree}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du père</label>
                  <input
                    name="nom_pere"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.nomPere}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la mère</label>
                  <input
                    name="nom_mere"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.nomMere}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact des parents</label>
                  <input
                    required
                    name="telephone_parent"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.contactParents}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Tuteur</label>
                  <input
                    name="nom_tuteur"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.nomTuteur}
                    onChange={handleChange}
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact du tuteur</label>
                  <input
                    name="telephone_tuteur"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    //value={newEleve.contactTuteur}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                onClick={props.onClose}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Enregistrer
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    )}

    </>
  )
}

/*
{showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ajouter un élève</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Classe*</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.classe}
                      onChange={(e) => setNewEleve({...newEleve, classe: e.target.value})}
                    >
                      <option value="">Sélectionnez une classe</option>
                      {classeOptions.map((classe) => (
                        <option key={classe} value={classe}>{classe}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.nom}
                      onChange={(e) => setNewEleve({...newEleve, nom: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.prenom}
                      onChange={(e) => setNewEleve({...newEleve, prenom: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance*</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.dateNaissance}
                      onChange={(e) => setNewEleve({...newEleve, dateNaissance: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.lieuNaissance}
                      onChange={(e) => setNewEleve({...newEleve, lieuNaissance: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sexe*</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.sexe}
                      onChange={(e) => setNewEleve({...newEleve, sexe: e.target.value})}
                    >
                      <option value="">Sélectionnez</option>
                      {sexeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut*</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.statut}
                      onChange={(e) => setNewEleve({...newEleve, statut: e.target.value})}
                    >
                      {statutOptions
                        .filter(option => option.value !== 'quittee')
                        .map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Domicile</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.domicile}
                      onChange={(e) => setNewEleve({...newEleve, domicile: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">École précédente</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.ecolePrecedente}
                      onChange={(e) => setNewEleve({...newEleve, ecolePrecedente: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'entrée*</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.dateEntree}
                      onChange={(e) => setNewEleve({...newEleve, dateEntree: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du père</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.nomPere}
                      onChange={(e) => setNewEleve({...newEleve, nomPere: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la mère</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.nomMere}
                      onChange={(e) => setNewEleve({...newEleve, nomMere: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact des parents*</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.contactParents}
                      onChange={(e) => setNewEleve({...newEleve, contactParents: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Tuteur</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.nomTuteur}
                      onChange={(e) => setNewEleve({...newEleve, nomTuteur: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact du tuteur</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newEleve.contactTuteur}
                      onChange={(e) => setNewEleve({...newEleve, contactTuteur: e.target.value})}
                    />
                  </div>

                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={() => setShowAddModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={handleAdd}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

*/
