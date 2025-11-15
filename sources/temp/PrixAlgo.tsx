// "use client"

// import { Button, Input, StatCard, Textarea } from '@/sources/components/ui';
// import Accordion from '@/sources/components/ui/accordion';
// import { clientType, devisLivreData } from '@/sources/types/type';
// import { AlertTriangle, Book, BrainCircuit, ChevronsLeftRightEllipsisIcon, FileClock, Layers, Loader2, PencilRuler, Search, ShoppingBasket, Tag, Truck, Wallet, Weight, Wrench } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import CatdSection from './CatdSection';
// import { GetClientID } from '@/sources/actions/admin/client.action';
// import { useLivre } from '@/hooks/useModerator';

// // ... (Types, données statiques restent les mêmes)

// export default function PointDeVentePage({ param }: PointDeVenteProps) {
//     const { livre, livreLoading } = useLivre();
//     const [categorieSelected, setCategorieSelected] = useState(/* ... */);
//     const [selectedReliureType, setSelectedReliureType] = useState<string>('');
//     const [filteredReliures, setFilteredReliures] = useState<ReliureOption[]>([]);
//     const [client, setClient] = useState<clientType>();
//     const [devisLivre, setDevisLivre] = useState<devisLivreData>({
//         client_id: 0, couleur_id: 0, couverture_id: 0, couverture: '', dimension_id: 0, finition_id: 0, livre_id: 0,
//         montant: '', pages: '', papier_id: 0, papier: '', quantite: '', recto_verso_id: 0, reliure_id: 0, user_id: 0,
//     });

//     // ✨ NOUVEAU: État pour stocker le prix calculé
//     const [prixCalcule, setPrixCalcule] = useState<number>(0);

//     // ... (useEffect pour GetClientID et pour le filtrage des reliures restent les mêmes)

//     // ✨ NOUVEAU: useEffect pour calculer le prix en temps réel
//     useEffect(() => {
//         // S'assurer que les données de l'API sont chargées
//         if (!livre || livreLoading) return;

//         // --- Récupération des objets sélectionnés ---
//         const selectedDimension = livre.dimensions.find(d => d.id_dimension === devisLivre.dimension_id);
//         const selectedPapier = livre.papiers
//             .flatMap(p => p.accessoire)
//             .find(acc => acc.id_papier === devisLivre.papier_id);
        
//         // La couverture utilise la même structure de données que le papier
//         const selectedCouverture = livre.papiers
//             .flatMap(p => p.accessoire)
//             .find(acc => acc.id_papier === devisLivre.couverture_id);

//         const selectedReliure = filteredReliures
//             .flatMap(r => r.reliures)
//             .find(rel => rel.id_reliure === devisLivre.reliure_id);
            
//         const selectedFinition = livre.finition.find(f => f.id_finition === devisLivre.finition_id);

//         // --- Calcul des coûts individuels ---
//         const nbrPages = Number(devisLivre.pages) || 0;
//         const quantite = Number(devisLivre.quantite) || 1; // On part sur une quantité de 1 si non définie

//         // Le nombre de poses est crucial
//         const nbrPoses = selectedDimension?.nbre_pose || 1; 

//         // Coût du papier pour les pages intérieures
//         const coutPapierInterne = selectedPapier ? (Number(selectedPapier.prix) * nbrPages / nbrPoses) : 0;
        
//         // Coût du papier pour la couverture
//         const coutCouverture = selectedCouverture ? (Number(selectedCouverture.prix) / nbrPoses) : 0;

//         // Coût de la reliure et de la finition
//         const coutReliure = selectedReliure ? Number(selectedReliure.prix) : 0;
//         const coutFinition = selectedFinition ? Number(selectedFinition.prix) : 0;

//         // --- Calcul du Total ---
//         const totalUnitaire = coutPapierInterne + coutCouverture + coutReliure + coutFinition;
//         const totalFinal = totalUnitaire * quantite;
        
//         setPrixCalcule(totalFinal);
        
//     }, [
//         devisLivre.dimension_id, 
//         devisLivre.papier_id,
//         devisLivre.couverture_id, 
//         devisLivre.reliure_id, 
//         devisLivre.finition_id,
//         devisLivre.pages,
//         devisLivre.quantite,
//         livre,
//         livreLoading,
//         filteredReliures
//     ]);


//     const handleSelect = (value: number | string, name: string, papier?: string) => {
//         setDevisLivre(prevState => ({
//             ...prevState,
//             [name]: value,
//             ...(papier !== undefined && { papier: papier }),
//         }));
//     };

//     return (
//       <div className="animate-fade-in space-y-8">
//         {/* ... */}
//         <div className="flex flex-col lg:flex-row gap-8">
//             {/* Colonne de gauche pour les options */}
//             <div className="w-full lg:w-2/3 space-y-6">
//                 {/* ... (Tous les accordéons d'options) ... */}
//             </div>

//             {/* Colonne de droite pour le panier et le résumé */}
//             <div className="w-full lg:w-1/3">
//                 <div className="sticky top-24 space-y-6">
//                     {/* ✨ NOUVEAU: Affichage du prix calculé */}
//                     <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm">
//                         <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
//                             Estimation du Prix
//                         </h3>
//                         <div className="text-center my-4">
//                             <span className="text-4xl font-extrabold text-red-600">
//                                 {prixCalcule.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
//                             </span>
//                             <span className="text-lg text-slate-500 dark:text-slate-400 ml-2">
//                                 Ar
//                             </span>
//                         </div>
//                         <p className="text-xs text-center text-slate-400">
//                             Le prix est calculé en temps réel en fonction de vos sélections.
//                         </p>
//                     </div>

//                     <CatdSection cartItems={cartItems} client={client} />
//                 </div>
//             </div>
//         </div>
//       </div>
//     );
// }

// // Définir le type ReliureOption ici si ce n'est pas déjà fait
// type ReliureOption = {
//     id_stock_reliure: number; type: string; reference: string; stock: number; seuil: number;
//     reliures: { id_reliure: number; min: number; max: number; papier: string; prix: number; }[];
// };