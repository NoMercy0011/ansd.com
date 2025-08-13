"use server"

import { EtudiantClasseData, EtudiantData, InscriptionData } from "@/sources/types/type";
import { cookies } from "next/headers";

export async function ReadEtudiant() {
    const header = (await cookies()).get('header')?.value;
        const token = (await cookies()).get('token')?.value;
            try{
        
                const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/etudiant`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
                });
    
                const etudiants = await response.json();
    
                return {
                    data : etudiants.etudiants as EtudiantData[],
                }
        
            }catch (error){
                console.error(error)
                throw new Error('Erreur lors de la recupération des enseignants ', error!)
            }
}

export async function ReadEtudiantsParClasse() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    try{
        
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/etudiant-classe`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });
    
        const etudiants = await response.json();
    
        return {
            data : etudiants.etudiants as EtudiantClasseData[],
        }
        
    }catch (error){
        console.error(error)
        throw new Error('Erreur lors de la recupération des enseignants ', error!)
    }    
}

export async function ReadClasseId( id : number) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    console.log(id)
    try{
        
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/etudiant-classe-id?id_classe=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });
    
        const etudiant = await response.json();
    
        return {
            data : etudiant.etudiant as EtudiantClasseData,
        }
        
    }catch (error){
        console.error(error)
        throw new Error('Erreur lors de la recupération des enseignants ', error!)
    }    
}

export async function CreateEtudiant( eleve : InscriptionData) {
    console.log(eleve);
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    try{
        
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/etudiant`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(eleve),
        });
    
        const inscription = await response.json();
        console.log(inscription.message);
        console.log(inscription.errors);

        return {
            message : inscription.message as string,
            erreur: inscription.errors,
        }
        
    }catch (error){
        console.error(error)
        throw new Error('Erreur lors de la recupération des enseignants ', error!)
    }

}

export async function DeleteEtudiant() {


}

export async function UpdateEtudiant() {


}