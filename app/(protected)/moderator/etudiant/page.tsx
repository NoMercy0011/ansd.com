
import React from 'react'

export default function page() {
  return (
    <div>
      Module Etudiant en Developpement...
    </div>
  )
}

// "use client"
// import { Medal, TrendingUp, AlertTriangle, Users, Search, Plus } from "lucide-react";
// import { Card, Badge, Button, Select } from "@/src/components/ui";
// import { useState } from "react";
// import StudentTable from "@/src/features/moderator/etudiant/StudentTable";

// // Données mockées
// const topStudents = [
//   { id: "ET-001", name: "Aïcha Bamba", class: "Terminale A", average: 18.5, trend: "up" },
//   { id: "ET-002", name: "Mohamed Konaté", class: "Terminale A", average: 17.8, trend: "stable" },
//   // ...8 autres
// ];

// const progressingStudents = [
//   { id: "ET-011", name: "Jean Dupont", class: "1ère A", progress: "+3.2", subjects: ["Maths", "Physique"] },
//   // ...9 autres
// ];

// const atRiskStudents = [
//   { id: "ET-021", name: "Lucie Petit", class: "3ème A", average: 9.2, warning: "Baisse en Maths" },
//   // ...9 autres
// ];

// export default function EtudiantPage() {
//   const [activeSection, setActiveSection] = useState<"top" | "progress" | "risk">("top");

//   return (
//     <div className="space-y-6">
//       {/* Header avec actions */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
//           <Users className="text-orange-600" /> Gestion des Étudiants
//         </h1>
//         <div className="flex gap-3 w-full sm:w-auto">
//           <div className="relative flex-1 sm:w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Rechercher un étudiant..."
//               className="pl-10 w-full pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             />
//           </div>
//           <Button variant="primary" icon={<Plus size={18} />} className="shrink-0">
//             Ajouter
//           </Button>
//         </div>
//       </div>

//       {/* Cartes statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="hover:shadow-2xl transition-shadow p-4 bg-gradient-to-b from-yellow-500 to-yellow-500 border-amber-800">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-100">Top Performants</p>
//               <h3 className="text-3xl font-bold mt-1 ">10</h3>
//               <p className="text-xs text-gray-100 mt-2">Moyenne &gt; 16/20</p>
//             </div>
//             <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
//               <Medal className="h-5 w-5" />
//             </div>
//           </div>
//         </Card>

//         <Card className="hover:shadow-2xl transition-shadow p-4 bg-gradient-to-b from-emerald-400 to-emerald-500">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-100">Progression Remarquable</p>
//               <h3 className="text-2xl font-bold mt-1">8</h3>
//               <p className="text-xs text-gray-100 mt-2">+2 points vs. trimestre</p>
//             </div>
//             <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
//               <TrendingUp className="h-5 w-5" />
//             </div>
//           </div>
//         </Card>

//         <Card className="hover:shadow-2xl transition-shadow p-4 bg-gradient-to-b from-red-400 to-red-500">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-100">À Suivre</p>
//               <h3 className="text-2xl font-bold mt-1">5</h3>
//               <p className="text-xs text-gray-100 mt-2">Moyenne `{"<"}` 10/20</p>
//             </div>
//             <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
//               <AlertTriangle className="h-5 w-5" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Navigation entre sections */}
//       <div className="flex border-b border-gray-200">
//         <button
//           className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "top" ? "border-orange-600 text-orange-600" : "border-transparent hover:text-orange-500"}`}
//           onClick={() => setActiveSection("top")}
//         >
//           <div className="flex items-center gap-2">
//             <Medal className="h-4 w-4" /> Top 10
//           </div>
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "progress" ? "border-orange-600 text-orange-600" : "border-transparent hover:text-orange-500"}`}
//           onClick={() => setActiveSection("progress")}
//         >
//           <div className="flex items-center gap-2">
//             <TrendingUp className="h-4 w-4" /> Progression
//           </div>
//         </button>
//         <button
//           className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "risk" ? "border-orange-600 text-orange-600" : "border-transparent hover:text-orange-500"}`}
//           onClick={() => setActiveSection("risk")}
//         >
//           <div className="flex items-center gap-2">
//             <AlertTriangle className="h-4 w-4" /> À Suivre
//           </div>
//         </button>
//       </div>

//       {/* Filtres */}
//       <div className="bg-gray-50 p-4 rounded-lg">
//         <div className="flex flex-wrap items-center gap-4">
//           <Select 
//             placeholder="Niveau" 
//             options={["Tous", "Terminale", "1ère", "2nde", "3ème"]}
//             className="w-full sm:w-48"
//           />
//           <Select 
//             placeholder="Classe" 
//             options={["Toutes", "A", "B", "C"]}
//             className="w-full sm:w-40"
//           />
//           <Select 
//             placeholder="Période" 
//             options={["Année", "Trimestre 1", "Trimestre 2"]}
//             className="w-full sm:w-48"
//           />
//           <Button variant="secondary" size="sm" className="ml-auto">
//             Appliquer
//           </Button>
//         </div>
//       </div>

//       {/* Contenu des sections */}
//       <div className="space-y-6">
//         {activeSection === "top" && (
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Top 10 des étudiants</h3>
//             <StudentTable
//               data={topStudents}
//               columns={[
//                 { header: "Étudiant", accessor: "name" },
//                 { header: "Classe", accessor: "class" },
//                 { 
//                   header: "Moyenne", 
//                   accessor: "average",
//                   render: (value) => (
//                     <Badge variant={value > 17 ? "success" : "warning"}>
//                       {value}/20
//                     </Badge>
//                   )
//                 }
//               ]}
//             />
//           </div>
//         )}

//         {activeSection === "progress" && (
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Top 10 des progressions</h3>
//             <StudentTable
//               data={progressingStudents}
//               columns={[
//                 { header: "Étudiant", accessor: "name" },
//                 { header: "Classe", accessor: "class" },
//                 { 
//                   header: "Progression", 
//                   accessor: "progress",
//                   render: (value) => (
//                     <span className="text-emerald-600 font-medium">{value}</span>
//                   )
//                 },
//                 { 
//                   header: "Matières", 
//                   accessor: "subjects",
//                   render: (value) => value.join(", ")
//                 }
//               ]}
//             />
//           </div>
//         )}

//         {activeSection === "risk" && (
//           <div>
//             <h3 className="text-lg font-semibold mb-4">10 étudiants à suivre</h3>
//             <StudentTable
//               data={atRiskStudents}
//               columns={[
//                 { header: "Étudiant", accessor: "name" },
//                 { header: "Classe", accessor: "class" },
//                 { 
//                   header: "Moyenne", 
//                   accessor: "average",
//                   render: (value) => (
//                     <Badge variant="danger">{value}/20</Badge>
//                   )
//                 },
//                 { header: "Alerte", accessor: "warning" }
//               ]}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }