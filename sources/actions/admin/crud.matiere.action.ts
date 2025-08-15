"use server"

import { MatiereData } from "@/sources/types/type";
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

export async function GetMatiereID( id : number) {
    
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/matiere-id?id_matiere=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });

        const matiere = await response.json();
        
        return {
            message : "matiere reçu",
            data: matiere.matiere as MatiereData,
        }
    }catch (error) {
        console.error("Erreur lors de la récupération des matieres :" , error);
        throw new Error("Erreur lors de la récupération des matieres :" , error!)
    }
}

export async function CreateMatiere( data : MatiereData) {
    
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/matiere`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const matiere = await response.json();
        
        return {
            message : matiere.message,
            status : matiere.status,
            error: matiere.error,
           
        }
    }catch (error) {
        console.error("Erreur lors de la récupération des matieres :" , error);
        throw new Error("Erreur lors de la récupération des matieres :" , error!)
    }
}

export async function UpdateMatiere( data : MatiereData) {

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/matiere`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const matiere = await response.json();
        
        return {
            message : matiere.message,
            status: matiere.status,
            error: matiere.error,
        }
    }catch (error) {
        console.error("Erreur lors de la récupération des matieres :" , error);
        throw new Error("Erreur lors de la récupération des matieres :" , error!)
    }
}

export async function DeleteMatiere( data : MatiereData) {

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/matiere`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const matiere = await response.json();
        
        return {
            message : matiere.message,
            status: matiere.status,
        }
    }catch (error) {
        console.error("Erreur lors de la récupération des matieres :" , error);
        throw new Error("Erreur lors de la récupération des matieres :" , error!)
    }
}