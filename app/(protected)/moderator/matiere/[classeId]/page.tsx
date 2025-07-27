import { Card, Button } from "@/src/components/ui";
import EdtGrid from "@/src/features/moderator/matiere/EdtGrid";
import { ChevronLeft, Printer } from "lucide-react";

export default function EdtClassePage({ params }: { params: { classeId: string } }) {
  // Ici, vous récupéreriez les données de la classe depuis une API
  const classe = {
    id: params.classeId,
    nom: "Terminale A",
    niveau: "Terminale"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" href="/moderator/matiere" icon={<ChevronLeft size={18} />}>
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-center">
          Emploi du temps - {classe.niveau} {classe.nom}
        </h1>
        <Button variant="secondary" icon={<Printer size={18} />}>
          Imprimer
        </Button>
      </div>

      <Card>
        <div className="p-4">
          <EdtGrid classeId={params.classeId} />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button href="/moderator/matiere/gestion" variant="primary">
          Modifier l'emploi du temps
        </Button>
      </div>
    </div>
  );
}