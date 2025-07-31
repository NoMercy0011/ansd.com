// "use client"

// import { Card, Button, Badge, Select } from "@/src/components/ui";
// import { SearchInput } from "@/src/components/ui/etudiant/SearchInput";
// import { Plus, Users, BookOpen, ChevronRight } from "lucide-react";

// const mockClasses = [
//   { 
//     id: "CLA-2023-1", 
//     niveau: "Terminale", 
//     nom: "A", 
//     effectif: 32,
//     responsable: { id: "ENS-001", nom: "Prof. Diallo" },
//     matieres: ["Maths", "Physique"],
//     salle: "B12"
//   },
//   // ... autres classes
// ];

// export default function GestionClassesPage() {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <BookOpen className="text-orange-600" /> Gestion des Classes
//         </h1>
//         <Button href="/moderator/classe/gestion/ajouter" icon={<Plus size={18} />}>
//           Créer une classe
//         </Button>
//       </div>

//       <div className="flex gap-4">
//         <SearchInput placeholder="Rechercher une classe..." />
//         <Select 
//           items={["Tous niveaux", "Terminale", "1ère", "2nde"]} 
//           selected="Tous niveaux"
//           onSelect={() => {}}
//         />
//       </div>

//       <Card>
//         <div className="divide-y divide-gray-200">
//           {mockClasses.map((classe) => (
//             <div key={classe.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium">{classe.niveau} {classe.nom}</h3>
//                 <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                   <span>Salle: {classe.salle}</span>
//                   <span>Responsable: {classe.responsable.nom}</span>
//                   <span>{classe.effectif} élèves</span>
//                 </div>
//               </div>
//               <Button variant="ghost" href={`/moderator/classe/gestion/${classe.id}`}>
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// }