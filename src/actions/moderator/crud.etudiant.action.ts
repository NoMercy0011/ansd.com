
import { PrismaClient } from "@prisma/client";
import { ModeratorDescriptionAction } from "./moderator.description.action";

const prisma = new PrismaClient();

export async function ReadEtudiant() {
    const etablissement = await ModeratorDescriptionAction();
    try{
        const annee = await prisma.annee_scolaire.findUnique({
            where : {
                etablissement : etablissement.data.id_etablissement,
                status : 'active',
            }
        })
        const etudiants = await prisma.inscription.findMany({
            where : {
                etablissement : etablissement.data.id_etablissement,
                annee_scolaire: annee?.id_annee_scolaire,
            }
        }) 

        if( !etudiants[0] ) {
            return {
                message : "Aucun étudiant inscrit pour l'instant",
                data : [],
            }
        }

        return {
            message : " Liste d'étudiants ",
            data : etudiants,
        }


    } catch(error) {
        console.error(" Erreur lors de la recuperation des étudiants :" , error);
        throw new Error( " Erreur lors de la recuperation des étudiants :", error!);
    }    

}

export async function CreateEtudiant() {


}

export async function DeleteEtudiant() {


}

export async function UpdateEtudiant() {


}