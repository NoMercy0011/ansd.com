import { ReadClasse } from "@/src/actions/moderator/crud.classe.action";
import { ReadEnseignantAction } from "@/src/actions/moderator/crud.enseignant.action";
import { ReadEnseignement } from "@/src/actions/moderator/crud.enseignement.action";
import { ReadMatiere } from "@/src/actions/moderator/crud.matiere.action";
import AddMatiere from "@/src/features/moderator/matiere/AddMatiere";

export default async function Matiere() { 
  
  const classes = await ReadClasse();
  const enseignement = await ReadEnseignement()
  const Matieres  = await ReadMatiere();
  const Enseignant = await ReadEnseignantAction();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Emploi du temps par Classe</h1>
      <AddMatiere 
        dataClasse={classes.data } 
        dataEnseignement={ enseignement.data }  
        dataEnseignant={ Enseignant.data } 
        dataMatiere={ Matieres.data } 
      />
    </div>
  );
}