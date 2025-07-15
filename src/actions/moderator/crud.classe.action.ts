"use server"

import { PrismaClient } from "@prisma/client"
import { ModeratorDescriptionAction } from "./moderator.description.action";
import { classeType } from "@/src/types/type";

 const prisma = new PrismaClient();

export async function ReadClasse() {
    const etablissement = await ModeratorDescriptionAction();
    try{

        const classe = await prisma.classe.findMany({
            where : {
                etablissement: etablissement.data.id_etablissement,
            }
        })

        if(!classe[0]) {
            console.log("Vous avez aucune classe inscrit pour l'instant")
            return{
                success: false,
                message : "Vous avez aucune classe inscrit pour l'instant",
                data: [],
            }
        }
        console.log(classe)

        return {
            success: true,
            message: '',
            data : classe,
        }

    }catch (error) {
        throw new Error(" Erreur lors de la récupération des classes" , error!)
    }
}

export async function CreateClasse(data: classeType) {
    console.log(data)
    try{

        const etablissement = await ModeratorDescriptionAction();
        //const niveau = await GetNiveau();
        //const enseignant = await ReadEnseignantAction();
        console.log(etablissement)

        const [existingClasse] = await prisma.classe.findMany({
            where : {
                classe : String(data.classe),
            }
        })
        
        console.log(existingClasse);

        const [existingResponsable] = await prisma.classe.findMany({
            where: {
                responsable: Number(data.responsable),
            }
        })
        console.log(existingResponsable);

        if(existingClasse) {
            return {
                success : false,
                message: " Une classe de même nom existe déjà, veuillez utiliser un autre nom",
                classe: existingClasse,
            }
        }

        if(existingResponsable) {
            return {
                success : false,
                message: " Cet enseignant est déjà responsable d'une classe",
                enseignant: existingResponsable,
            }
        }

        const success = await prisma.classe.create({
            data: {
                classe: String(data.classe),
                niveau: Number(data.niveau),
                responsable: Number(data.responsable),
                etablissement: Number(etablissement.data.id_etablissement),
                chef_etablissement: Number(etablissement.data.chef_etablissement),
                annee_scolaire: Number(data.annee_scolaire),
            }
        })

            console.log(success)
    }catch(error){
        console.error(error)
        throw new Error('Erreur lors de la création de la classe ', error!)
    }
}

export async function UpdateClasse() {

}

export async function DeleteClasse() {

}