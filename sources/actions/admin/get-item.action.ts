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
    
            const item = await response.json();
            //console.log(packaging.packaging[0]);
            return {
                message : 'Les données sur le packaging',
                data: item.packaging as itemType[],
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de données :" , error!);
        }
}

export async function GetChevalet() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    
        try {
    
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/chevalet`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
    
            const item = await response.json();
            //console.log(item.chevalet[0]);
            return {
                message : 'Les données sur le chevalet',
                data: item.chevalet as itemType[],
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de données :" , error!);
        }
}

export async function GetCalendar() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    
        try {
    
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/calendar`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
    
            const item = await response.json();
            //console.log(item.chevalet[0]);
            return {
                message : 'Les données sur le calendrier',
                data: item.calendar as itemType[],
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de données :" , error!);
        }
}


export async function GetCarterie() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    
        try {
    
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/carterie`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
    
            const item = await response.json();
            //console.log(item.chevalet[0]);
            return {
                message : 'Les données sur la carterie',
                data: item.carterie as itemType[],
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de données :" , error!);
        }
}


