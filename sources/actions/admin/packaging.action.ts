"use server"

import { itemType } from "@/types/packaging/packagingType";
import { cookies } from "next/headers";

export async function GetPackaging() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    
        try {
    
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/packaging`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
    
            const packaging = await response.json();
            //console.log(packaging.packaging[0]);
            return {
                message : 'Les données sur le packaging',
                data: packaging.packaging as itemType[],
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de données :" , error!);
        }
}