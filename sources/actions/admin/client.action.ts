"use server"

import { clientType } from "@/sources/types/type";
import { cookies } from "next/headers";


export async function GetClients() {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/client`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });

        const clients = await response.json();
        //console.log(clients);
        return {
            message : 'Liste des commerciaux',
            data: clients.clients,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la reccuperation des agents commerciaux :" , error!);
    }
    
}

export async function GetClientID(id : number) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/client-id?id_client=${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
        });

        const client = await response.json();
        //console.log(client);
        return {
            data: client.client as clientType,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la reccuperation des agents commerciaux :" , error!);
    }
    
}

export async function CreateClient(data: clientType) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    console.log(data);

    try{
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/client`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const client = await response.json();
        console.log(client);
          return {
            message : client.message,
            status:201
        }

    }catch(error){
        console.error(error)
        return {
            erreur: "Une Erreur s'est produit",
            content: error
        }
    }
}


export async function UpdateClient( data : clientType) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;
    console.log(JSON.stringify(data));

    try {
        
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/client`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
            body: JSON.stringify(data),
        });

        const client = await response.json();
        console.log(client);
        return {
            message : client.message,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la modification :" , error!);
    }
}

export async function DeleteClient(id : number) {
    const header = (await cookies()).get('header')?.value;
    const token = (await cookies()).get('token')?.value;

    try {
        
        const data = {
            id_enseignement : Number(id),
        }
        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}/client?id_client=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" , "client-id" : `${header}`, /*"Authorization" : `Bearer ${token}`*/ },
            body: JSON.stringify(data),
        });

        const client = await response.json();
        console.log(client.messsage);
        return {
            message : client.messsage,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur lors de la lecture de l'enseignement :" , error!);
    }
}


export async function Hello() {
    const token = (await cookies()).get('token')?.value;
    
    /*(await cookies()).set('header', 'client_1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 12 * 60 * 60, // 12 hours
        path: '/',
    });*/

    try {

        const response = await fetch (`${process.env.NEXT_PUBLIC_API_URI}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" ,"client-id" : 'client_1', "Authorization" : `Bearer ${token}`}, // 
        });

        const client = await response.json();
        console.log(client);
        return {
            data: client.message,
        }

    }catch(error) {
        console.error('Erreur : ' , error);
        throw new Error ("Erreur de connexion au serveur" , error!);
    }
    
}