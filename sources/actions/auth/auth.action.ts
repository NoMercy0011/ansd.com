"use server"

import { userLoginType } from "@/sources/types/type";
import { cookies } from "next/headers";


export async function LoginRequest(login : userLoginType){
    console.log(login);
    
    try {
        (await cookies()).set('header', `${login.header}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 12 * 60 * 60, // 12 hours
        path: '/',
        });
    
        
    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URI}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json","Accept": "application/json" , "client-id" : `${login.header}`}, // `${login.header}`
            body: JSON.stringify(login),
        })
        
        const data = await response.json();
        console.log(data.status);

        if(data.status === 201) {
            (await cookies()).set('token', data.token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 12 * 60 * 60, // 12 hours
              path: '/',
        });
        (await cookies()).set('role', data.user.role, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 12 * 60 * 60, // 12 hours
              path: '/',
        });
        }
        console.log(data);
        return data;

    }catch(error) {
        console.log(error);
        throw new Error('Erreur lors de la connexion', error!)
    }

}


export default async function logoutAction(){
    try{
        
        (await cookies()).delete('header');
        (await cookies()).delete('role');
        (await cookies()).delete('token');
        
        return {
            message : 'Utilisateur deconnecté',
            status : 200
        }

    }catch (error){
        throw new Error('Erreur lors de la deconnexion', error!)
    }
}

// const response  = await fetch( `${process.env.NEXT_PUBLIC_API_URI}/hello`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" , "client-id" : "LPMA"},
//         });
//   const data = await response.json();   