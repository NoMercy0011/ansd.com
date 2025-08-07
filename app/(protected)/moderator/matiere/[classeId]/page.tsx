import EdtForm from "@/src/features/moderator/matiere/EdtFrom";

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
    <>
    <EdtForm params={Number(classe.id)} />
    </>
  );
}