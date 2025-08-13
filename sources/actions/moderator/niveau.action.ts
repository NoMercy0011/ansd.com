"use server"

import { NiveauType } from "@/sources/types/type";
import { cookies } from "next/headers";


export async function ReadNiveau() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
        
        try{
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/niveau`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
            const niveaux = await response.json();
            //console.log(niveaux.niveaux);

            return {
                niveaux: niveaux.niveaux as NiveauType,
            }
    
        }catch (error) {
            throw new Error(" Erreur lors de la récupération des classes" , error!)
        } 

}