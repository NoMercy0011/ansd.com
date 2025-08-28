"use server"

import { LivreType } from "@/sources/types/type";
import { cookies } from "next/headers";

export async function GetLivre() {
    const header = (await cookies()).get('header')?.value;
        const token = (await cookies()).get('token')?.value;
    
        try {
    
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/livre`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
    
            const livre = await response.json();
            //console.log(livre);
            return {
                message : 'Liste des commerciaux',
                data: livre.livre as LivreType,
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de la reccuperation des agents commerciaux :" , error!);
        }
}