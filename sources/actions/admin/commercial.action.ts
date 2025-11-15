"use server"

import { cookies } from "next/headers";


export async function GetCommerciaux() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/commercial`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });

        const commerciaux = await response.json();
        console.log(commerciaux.commerciaux);
        return {
            message : 'Liste des commerciaux',
            data: commerciaux.commerciaux,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la reccuperation des agents commerciaux :" , error!);
    }
    
}