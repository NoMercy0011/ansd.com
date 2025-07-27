"use server"

import { PrismaClient } from "@prisma/client"
import { ModeratorDescriptionAction } from "./moderator.description.action";
import { classeType } from "@/src/types/type";
import { cookies } from "next/headers";

 const prisma = new PrismaClient();

export async function ReadClasse() {

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    
    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/classe`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });
        const classe = await response.json();
          return {
            success: true,
            message: '',
            data : classe.classes,
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