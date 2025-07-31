import { Button } from "@/src/components/ui";
import StudentCard from "@/src/features/moderator/etudiant/EtudiantCard";
import Link from "next/link";


// Mock data pour la démo
const mockStudent = {
  id: "ET2023-001",
  nom: "Bamba",
  prenom: "Aïcha",
  classe: "Terminale A",
  moyenne: 16.5,
  sexe: "F",
  dateNaissance: "2005-03-15",
  lieuNaissance: "Abidjan",
  adresse: "123 Rue des Écoles, Abidjan",
  telephone: "+225 07 12 34 56 78",
  email: "aicha.bamba@ecole.com",
  tuteur: "M. Bamba Karim",
  contactTuteur: "+225 05 43 21 98 76"
};

export default function StudentDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fiche Étudiante</h1>
        <div className="flex gap-2">
          <Link href={`/moderator/etudiant/editer/${mockStudent.id}`}>
          <Button variant="secondary" >
            Modifier
          </Button>
          </Link>
          <Button variant="danger">Archiver</Button>
        </div>
      </div>

      <StudentCard student={mockStudent} />
    </div>
  );
}