"use client"
import { UserRoundCogIcon, UserPlus, UserMinus, GraduationCap, Plus, Search } from "lucide-react";
import { Badge, Button, Select } from "@/src/components/ui";
import { useEffect, useState } from "react";
import StudentTable from "@/src/features/moderator/etudiant/StudentTable";
import EnseignantStat from "@/src/features/moderator/enseignant/EnseignantStat";
import EnseignantHeader from "@/src/features/moderator/enseignant/EnseignantHeader";
import Link from "next/link";
import EnseignantTable from "@/src/features/moderator/enseignant/EnseignantTable";
import { EnseignantType } from "@/src/types/type";
import { ReadEnseignant } from "@/src/actions/moderator/crud.enseignant.action";
import EnseignantList from "@/src/features/moderator/enseignant/EnseignantList";

// Données mockées
const topStudents = [
  { id: "ET-001", name: "Aïcha Bamba", class: "Terminale A", average: 18.5, trend: "up" },
  { id: "ET-002", name: "Mohamed Konaté", class: "Terminale A", average: 17.8, trend: "stable" },
  // ...8 autres
];

const progressingStudents = [
  { id: "ET-011", name: "Jean Dupont", class: "1ère A", progress: "+3.2", subjects: ["Maths", "Physique"] },
  // ...9 autres
];

const atRiskStudents = [
  { id: "ET-021", name: "Lucie Petit", class: "3ème A", average: 9.2, warning: "Baisse en Maths" },
  // ...9 autres
];

export default function EnseignantPage() {
  const [enseignantActive, setEnseignantActive] = useState<EnseignantType>();
  const [enseignantQuitte, setEnseignantQuitte] = useState<EnseignantType>();

    useEffect(() => {
      ReadEnseignant().then(res => res.enseignantsQuitte).then(setEnseignantQuitte);
      ReadEnseignant().then(res => res.enseignantsActive).then(setEnseignantActive);
    }, []);

  const [activeSection, setActiveSection] = useState<"top" | "progress" | "risk">("top");

  return (
    <div className="space-y-6">
      <EnseignantStat enseignantActive={enseignantActive} enseignantQuitte={enseignantQuitte}/>
      <EnseignantList enseignantActive={enseignantActive} enseignantQuitte={enseignantQuitte}/>

      {/* <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "top" ? "border-green-600 text-green-600" : "border-transparent hover:text-green-500"}`}
          onClick={() => setActiveSection("top")}
        >
          <div className="flex items-center gap-2">
            <UserRoundCogIcon className="h-4 w-4" /> En ligne
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "progress" ? "border-sky-600 text-sky-600" : "border-transparent hover:text-sky-500"}`}
          onClick={() => setActiveSection("progress")}
        >
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Nouveaux
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "risk" ? "border-red-600 text-red-600" : "border-transparent hover:text-red-500"}`}
          onClick={() => setActiveSection("risk")}
        >
          <div className="flex items-center gap-2">
            <UserMinus className="h-4 w-4" /> Quittés
          </div>
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-4">
          <Select 
            placeholder="Niveau" 
            options={["Tous", "Terminale", "1ère", "2nde", "3ème"]}
            className="w-full sm:w-48"
          />
          <Select 
            placeholder="Classe" 
            options={["Toutes", "A", "B", "C"]}
            className="w-full sm:w-40"
          />
          <Select 
            placeholder="Période" 
            options={["Année", "Trimestre 1", "Trimestre 2"]}
            className="w-full sm:w-48"
          />
          <Button variant="secondary" size="sm" className="ml-auto">
            Appliquer
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {activeSection === "top" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Enseignants connectés</h3>
            <EnseignantTable
              data={topStudents}
              columns={[
                { header: "Nom", accessor: "name" },
                { header: "Prenom", accessor: "class" },
                { 
                  header: "Moyenne", 
                  accessor: "average",
                  render: (value) => (
                    <Badge variant={value > 17 ? "success" : "warning"}>
                      {value}/20
                    </Badge>
                  )
                }
              ]}
            />
          </div>
        )}

        {activeSection === "progress" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Nouveaux enseignants ajoutés</h3>
            <EnseignantTable
              data={progressingStudents}
              columns={[
                { header: "Étudiant", accessor: "name" },
                { header: "Classe", accessor: "class" },
                { 
                  header: "Progression", 
                  accessor: "progress",
                  render: (value) => (
                    <span className="text-emerald-600 font-medium">{value}</span>
                  )
                },
                { 
                  header: "Matières", 
                  accessor: "subjects",
                  render: (value) => value.join(", ")
                }
              ]}
            />
          </div>
        )}

        {activeSection === "risk" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Enseignants Quittés</h3>
            <EnseignantTable
              data={atRiskStudents}
              columns={[
                { header: "Étudiant", accessor: "name" },
                { header: "Classe", accessor: "class" },
                { 
                  header: "Moyenne", 
                  accessor: "average",
                  render: (value) => (
                    <Badge variant="danger">{value}/20</Badge>
                  )
                },
                { header: "Alerte", accessor: "warning" }
              ]}
            />
          </div>
        )}
      </div> */}
    </div>
  );
}