"use server"

import { cookies } from "next/headers";


export async function ReadSection(){
    
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/section`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "client-id" : `${header}`, "Authorization" : `Bearer ${token}` },
        });

        const sections = await response.json();
        return {
            sections : sections.sections,
        };

    } catch(error) {
        console.log(error)
        throw new Error(" Erreur lors de l'inscription des sections :", error! )
    }
}