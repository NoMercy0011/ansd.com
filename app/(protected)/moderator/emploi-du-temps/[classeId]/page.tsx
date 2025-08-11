import EdtForm from "@/src/features/moderator/emploi-du-temps/EdtFrom";

type PropsEnseingantID = {
    params : Promise<{
        classeId: string;
    }>;
}

export default async  function EdtClassePage({ params }: PropsEnseingantID) {
  
  const classe = {
    id: (await params).classeId,
  };
  return (
    <>
    <EdtForm params={Number( classe.id)} />
    </>
  );
}