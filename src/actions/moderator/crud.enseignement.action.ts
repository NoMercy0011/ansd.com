import { PrismaClient } from "@prisma/client";
import { ModeratorDescriptionAction } from "./moderator.description.action";

const prisma = new PrismaClient();

export async function ReadEnseignement() {
    try {
        const etablissement = await ModeratorDescriptionAction();

        const enseignement = await prisma.enseignement.findMany({
            where : {
                chef_etablissement : etablissement.data.chef_etablissement,
            }
        })

        if(!enseignement[0]){
            return {
                message : 'Aucune matière attribuée à cette classe',
                data: [],
            }
        }

        console.log(enseignement)
        
        return {
            message : 'Liste des matiere attribuées à cette classe',
            data: enseignement,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la lecture de l'enseignement :" , error!);
    }
}

export async function CreateEnseignement() {

}

export async function UpdateEnseignement() {

}

export async function DeleteEnseignement() {

}