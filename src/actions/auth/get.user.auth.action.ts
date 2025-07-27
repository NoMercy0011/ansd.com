"use server"

import { cookies } from "next/headers";


export default async function getUserAuthAction(){
    const token = (await cookies()).get('token')?.value;
    const header = (await cookies()).get('header')?.value;
    
    // try{
    //     if (!token) {
    //       return {
    //           success : false,
    //           error : "absence du token",
    //       }
    //     }
    //     const response = await fetch( `${process.env.NEXT_PUBLIC_API_URI}/user`, {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" , "client-id" : `${header}`, "Authorization" : `Bearer ${token}`},
    //     })
    //     const data = await response.json();
    //     console.log(data);
    //     return {
    //         success: true,
    //         data: data,
    //     }

    // }catch (error) {
    //     throw new Error("Erreur lors de la recupération de l'utilisateur" , error!)
    // }
}