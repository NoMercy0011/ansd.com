"use server"

import { cookies } from "next/headers";

export async function ReadMatiere() {
    
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/matiere`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });
        const matieres = await response.json();
        
        return {
            message : " Liste des matieres",
            data: matieres.matieres,
        }
    }catch (error) {
        console.error("Erreur lors de la récupération des matieres :" , error);
        throw new Error("Erreur lors de la récupération des matieres :" , error!)
    }
}