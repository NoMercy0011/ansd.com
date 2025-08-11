
import { ReadClasseId } from "@/src/actions/moderator/crud.etudiant.action";
import EtudiantGestionHeader from "@/src/features/moderator/etudiant/EtudiantGestionHeader";
import StudentList from "@/src/features/moderator/etudiant/EtudiantList";


type PropsEnseingantID = {
    params : Promise<{
        id: string;
    }>;
}

export default async function page( { params }: PropsEnseingantID) {
  const classe = {
    id: (await params).id,
  };

  const classeData = await ReadClasseId(Number(classe.id));

  return (
    <div className="space-y-6">
      <EtudiantGestionHeader classeData={classeData.data}/>
    </div>
  );
}