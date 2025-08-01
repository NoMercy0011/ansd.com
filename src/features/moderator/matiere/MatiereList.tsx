// "use client"

// import { EditIcon, TrashIcon } from "@/src/components/ui/icon";
// import { EnseignementType, MatiereProps } from "@/src/types/type";
// import { useEffect, useState } from "react";

// export default function MatiereList( props : MatiereProps) {
//   const [selectedClasse, setSelectedClasse] = useState<EnseignementType[]>([]);

//   useEffect(() => {
//     const filter = props.dataEnseignement.filter( classe => classe.classe == props.classeSelected )
//     setSelectedClasse(filter);
//     console.log(selectedClasse);

//   }, [props.classeSelected]);

//   /*const groupCreneaux = (emploiDuTemps) => {
//     const grouped = {};
    
//     emploiDuTemps.forEach(({ jour, heure }) => {
//       if (!grouped[jour]) grouped[jour] = [];
//       grouped[jour].push(heure);
//     });*/

//   const renderEmploiDuTemps = (emploiDuTemps) => {
//     console.log("data SQL :" ,emploiDuTemps);
//     const horaire = typeof emploiDuTemps === 'string' ? JSON.parse(emploiDuTemps) : emploiDuTemps;
//     console.log( "object :", horaire.creneaux);
//     console.log( "jour :", horaire.creneaux[0].jour);
    
//     if (horaire.creneaux.length === 0) {
//       return <p className="text-gray-500 text-sm">Aucun créneau sélectionné</p>;
//     }


//     return (
//       <div className="space-y-2 text-start ">
//         {(horaire.creneaux).map( creneau => (
//           <div key={creneau.jour && creneau.heure} className="flex text-start items-start"> <li className="list-disc text-start"> </li>
//             <span className="font-semibold w-18">{creneau.jour}:</span> 
//             <span className="flex flex-wrap gap-2">
//             {creneau.heure.replace('-' , ' à ')}
//             </span> 
//           </div>
//         ))}
//       </div>
//     );
//   };

//   console.log(props.classeSelected);

//   const handleOpenEditModal = (arg) => {

//   }
//   const handleDeleteMatiereClasse = (arg) => {

//   }

//   return (
//     <div className="min-h-screenp-4 md:p-8">
//       <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-xl font-bold text-center text-gray-800 mb-6">Gestion des Matières par Classe</h1>


//       {/* Liste des matières */}
//       {selectedClasse && (
//         <div className="overflow-x-auto bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200 ">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matière</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coefficient</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enseignant</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emploi du temps</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className=" bg-white divide-y divide-gray-200 ">
//               {
//                 selectedClasse.map(enseignement => (
//                     <tr key={enseignement.id_enseignement} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-left text-sm font-medium text-gray-900">{enseignement.matiere}</div>
//                         <div className="text-left text-sm text-gray-500">{enseignement.matiere} Code </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
//                         {enseignement.coefficient}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-left text-sm text-gray-500">
//                         {enseignement.enseignant}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500">
//                         {renderEmploiDuTemps(enseignement.horaire)} 
//                       </td>
//                       <td className="px-6 py-4 space-x-3 whitespace-nowrap text-sm text-gray-500 justify-center text-center inline-grid grid-cols-2 ">
//                             <EditIcon />
//                             <TrashIcon />
//                       </td>
//                     </tr>
//                   ))
//                 }
//             </tbody>
//           </table>
//               { !selectedClasse.length && 
//                 <div className="px-6 py-4 text-center text-sm text-gray-500">
//                   Aucune matière attribuée à cette classe pour l&apos; instant
//                 </div>}
//         </div>
//       )}
//       </div>
//     </div>
//   )
// }
