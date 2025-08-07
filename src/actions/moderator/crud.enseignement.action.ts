"use server"

import { EnseignementData } from "@/src/types/type";
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
            message : 'Liste des emploi du temps',
            data: enseignement.enseignements,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la lecture de l'enseignement :" , error!);
    }
    
}

export async function CreateEnseignement( data : EnseignementData) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {
        
        await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignement`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        return {
            message : 'Emploi du temps ajouté avec succès',
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la lecture de l'enseignement :" , error!);
    }
}

export async function UpdateEnseignement( data : EnseignementData) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {
        
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignement`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const notification = await response.json();

        return {
            message : notification.message,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la modification :" , error!);
    }
}

export async function DeleteEnseignement(id : number) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {
        
        const data = {
            id_enseignement : Number(id),
        }
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignement`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const enseignement = await response.json();

        return {
            message : enseignement.messsage,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la lecture de l'enseignement :" , error!);
    }
}

export async function ReadCreneau(){
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {
        

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/classe-enseignement`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });

        const enseignement = await response.json();

        return {
            message : 'Liste des créneaux par classe',
            data: enseignement.creneaux,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la lecture de l'enseignement :" , error!);
    }
}