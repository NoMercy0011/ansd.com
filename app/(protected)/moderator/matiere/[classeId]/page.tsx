import { Card, Button } from "@/src/components/ui";
import EdtGrid from "@/src/features/moderator/matiere/EdtGrid";
import { ChevronLeft, Printer } from "lucide-react";
import Link from "next/link";

type PropsEnseingantID = {
    params : Promise<{
        classeId: string;
    }>;
}

export default async  function EdtClassePage({ params }: PropsEnseingantID) {
  // Ici, vous récupéreriez les données de la classe depuis une API
  const classe = {
    id: (await params).classeId,
    nom: "Terminale A",
    niveau: "Terminale"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/moderator/matiere">
        <Button variant="ghost"  icon={<ChevronLeft size={18} />}>
          Retour
        </Button>
        </Link>
        <h1 className="text-2xl font-bold text-center">
          Emploi du temps - {classe.niveau} {classe.nom}
        </h1>
        <Button variant="secondary" icon={<Printer size={18} />}>
          Imprimer
        </Button>
      </div>

      <Card>
        <div className="p-4">
          <EdtGrid classeId={(await params).classeId} />
        </div>
      </Card>

      <div className="flex justify-end">
        <Link href="/moderator/matiere/gestion">
        <Button  variant="primary">
          Modifier l&apos; emploi du temps
        </Button>
        </Link>
      </div>
    </div>
  );
}