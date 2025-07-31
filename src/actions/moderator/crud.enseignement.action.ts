"use server"

import { cookies } from "next/headers";


export async function ReadEnseignement() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {
        

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignement`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });

        const enseignement = await response.json();

        return {
            message : 'Liste des matiere attribuées à cette classe',
            data: enseignement.enseignements,
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