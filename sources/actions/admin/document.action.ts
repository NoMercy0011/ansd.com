"use server"

import { DocumentType } from "@/types/type";
import { cookies } from "next/headers";


export async function CreateFacture(data : DocumentType) {
    console.log(JSON.stringify(data, null,2));

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/document-facture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "Accept": "application/json", "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const document = await response.json();
        console.log(document.message);
        return {
            message : 'Création du facture réussi',
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la création du facture :" , error!);
    }
    
}

export async function CreateProforma(data : DocumentType) {
    console.log(JSON.stringify(data, null,2));

    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/document-proforma`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "Accept": "application/json", "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const document = await response.json();
        console.log(document.message);
        return {
            message : 'Création du proforma réussi',
            data: document.document,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la création du proforma:" , error!);
    }
    
}

export async function GetDocument() {
    const header = (await cookies()).get('header')?.value;
        const token = (await cookies()).get('token')?.value;
    
        try {
    
            const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/document`, {
                method: "GET",
                headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            });
    
            const documents = await response.json() ;
            
            console.log(documents.proformas);
            console.log(documents.factures);
            return {
                message : 'Liste des documents',
                proformas: documents.proformas as DocumentType[],
                factures: documents.factures as DocumentType[],
            }
    
        }catch(error) {
            console.error('Erreur : ' , error);
            throw new Error ("Erreur lors de la reccuperation des document:" , error!);
        }
}