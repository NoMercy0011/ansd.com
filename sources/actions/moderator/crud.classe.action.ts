"use server"

import { classeType } from "@/sources/types/type";
import { cookies } from "next/headers";

export async function ReadClasse() {

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    
    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/classe`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });
        const classe = await response.json();
          return {
            data : classe.classes,
        }

    }catch (error) {
        throw new Error(" Erreur lors de la récupération des classes" , error!)
    }
}

export async function CreateClasse(data: classeType) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    console.log(data);
    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/classe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const classe = await response.json();
        if(classe.status){
            return{
                message: "La classe éxiste déjà",
                status:401
            }
        }
          return {
            message : classe.message,
            status:201
        }

    }catch(error){
        console.error(error)
        return {
            erreur: 'Erreur lors de la création de la classe ',
            content: error
        }
    }
}

export async function UpdateClasse() {

}

export async function DeleteClasse() {

}