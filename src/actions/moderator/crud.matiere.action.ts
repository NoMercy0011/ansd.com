import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ReadMatiere() {
    try{
        const matieres = await prisma.matiere.findMany();

        if( !matieres[0]) {
            return {
                message : " Aucune matiere disponible pour l'instant",
                data : [] ,
            }
        }
        return {
            message : " Liste des matieres",
            data: matieres,
        }
    }catch (error) {
        console.error("Erreur lors de la récupération des matieres :" , error);
        throw new Error("Erreur lors de la récupération des matieres :" , error!)
    }
}