import { GetMatiereID } from "@/src/actions/moderator/crud.matiere.action";
import MatiereForm from "@/src/features/moderator/matiere/MatiereForm";

type PropsMatiereID = {
    params : Promise<{
        id: string;
    }>;
}

export default async function page({params} : PropsMatiereID) {

    const matiere = await GetMatiereID( Number((await params).id))
  return (
    <>
      <MatiereForm  matiere={matiere.data}  isEdit={true} />
    </>
  )
}
