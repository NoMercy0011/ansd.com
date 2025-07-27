"use client"

import { Card, Button } from "@/src/components/ui";
import { Plus } from "lucide-react";
import { SearchInput } from "@/src/components/ui/etudiant/SearchInput";
import { Select } from "@/src/components/ui/etudiant/select";
import StudentList from "@/src/features/moderator/etudiant/gestion/EtudiantList";
import Link from "next/link";
import { useState } from "react";

// Mock data réaliste
const mockStudents = [
  { id: "ET2023-001", nom: "Bamba", prenom: "Aïcha", classe: "Terminale A", moyenne: 16.5, sexe: "F" },
  { id: "ET2023-002", nom: "Konaté", prenom: "Mohamed", classe: "Terminale A", moyenne: 15.8, sexe: "M" },
  { id: "ET2023-003", nom: "Ndiaye", prenom: "Fatou", classe: "Terminale B", moyenne: 14.2, sexe: "F" },
  { id: "ET2023-004", nom: "Diallo", prenom: "Ibrahim", classe: "1ère A", moyenne: 12.7, sexe: "M" },
  { id: "ET2023-005", nom: "Sow", prenom: "Aminata", classe: "1ère B", moyenne: 13.9, sexe: "F" },
];

export default function EtudiantPage() {
    const [selectedLevel, setSelectedLevel] = useState("Tous niveaux");
    const [selectedClass, setSelectedClass] = useState("Toutes classes");
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold">Gestion des Étudiants</h1>
        <div className="flex gap-3">
          <SearchInput placeholder="Rechercher..." />
          <Button href='/moderator/etudiant/gestion/ajouter' icon={<Plus size={16} />}>
            Nouvel étudiant
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3">
        <Select 
          items={["Tous niveaux", "Terminale", "1ère", "2nde"]} 
          selected={selectedLevel}
          onSelect={setSelectedLevel}
        />
        <Select 
          items={["Toutes classes", "A", "B", "C"]} 
          selected={selectedClass}
          onSelect={setSelectedClass}
        />
      </div>

      {/* Liste */}
      <Card>
        <StudentList students={mockStudents} />
      </Card>
    </div>
  );
}