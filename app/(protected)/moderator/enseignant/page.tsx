
import { ReadEnseignantAction } from "@/src/actions/moderator/crud.enseignant.action";
import AddEnseignantButton from "@/src/components/moderator/enseignant/AddEnseignantButton";
import EnseignantList from "@/src/features/moderator/enseignant/EnseignantList";
import { EnseignantListProps } from "@/src/types/type";

export default async function Enseignant() {
  let enseignants : EnseignantListProps = {
  success : false,
  message: '',
  data: [{
    user_enseignant_enseignantTouser: {
      id_user: 0,
      email: '',
      nom: '',
      prenom: '',
      sexe: '' ,
      date_naissance: null,
      lieu_naissance: '',
      telephone:'',
  }
  }]
}

  try {
     enseignants = await ReadEnseignantAction();

  }catch (error){
    console.error('Erreur lors de la recupération de données : ', error!)
  }

  return (
    <>
    <div className="p-1 ml-20 ">
      <div className="p-4 rounded-lg dark:border-gray-700">

    <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold text-gray-800">Liste des Enseignants</h2>
    <AddEnseignantButton />
    </div>
    <div>
      <EnseignantList  data={enseignants.data} success={enseignants.success} message={enseignants.message} />
    </div>
      </div>
    </div>
    </>
  );
}
