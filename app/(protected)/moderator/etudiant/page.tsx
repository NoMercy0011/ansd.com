import AddEtudiantButton from "@/src/features/moderator/etudiant/AddEtudiantButton";
import EtudiantList from "@/src/features/moderator/etudiant/EtudiantList";

export default async function Etudiant() {
  const etudiants = await ReadEtudiant();
  
  return (
    <>
      <div className="p-1 ml-20 ">
        <div className="p-4 rounded-lg dark:border-gray-700">
    
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Liste des Enseignants</h2>
            <AddEtudiantButton />
          </div>

          <div>
              <EtudiantList  data={enseignants.data} success={enseignants.success} message={enseignants.message} />
          </div>
        </div>
      </div>
    </>
  );
}