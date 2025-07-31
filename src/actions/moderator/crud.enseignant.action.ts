"use server"

import { CreateEnseignantType, EnseignantType } from "@/src/types/type";
import { cookies } from "next/headers";


export async function CreateEnseignant(Enseignant : CreateEnseignantType){
    console.log(Enseignant)
    
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "client-id" : `${header}`, "Authorization" : `Bearer ${token}` },
        body: JSON.stringify(Enseignant),
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.log(error)
        throw new Error(" Erreur lors de l'inscription de l'enseignant :", error! )
    }

    
}

export async function UpdateEnseignantAction(data : EnseignantType){
    console.log(data)
}

export async function ReadEnseignant(){

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
        try{
    
            const active = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignants`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });

            const quitte = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignants-quitte`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });

            // const onLine = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/enseignants-enLigne`, {
            // method: "GET",
            // headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            // });

            const enseignantsQuitte = await quitte.json();
            const enseignantsActive = await  active.json();
            //const enseignantsOnLine = await  onLine.json();

            return {
                enseignantsQuitte : enseignantsQuitte,
                enseignantsActive : enseignantsActive,
                enseignantsOnLine : enseignantsActive,
            }
    
        }catch (error){
            console.error(error)
            throw new Error('Erreur lors de la recupération des enseignants ', error!)
        }
}

export async function DeleteEnseignantAction( id : number){
    console.log(id);
}

