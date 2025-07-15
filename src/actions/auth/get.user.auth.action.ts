"use server"

import { jwtVerify } from "jose";
import { cookies } from "next/headers";


export default async function getUserAuthAction(){
    const token = (await cookies()).get('token')?.value;
    
    try{
        if (!token) {
          return {
              success : false,
              error : "absence du token",
          }
        }
        const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
                 );
        const { id, email, nom, prenom, sexe, photo } = payload;

        return {
            success : true,
            user : {
                id,
                email,
                nom,
                prenom,
                sexe, 
                photo,
            },
        };
    }catch (error) {
        throw new Error("Erreur lors de la recupération de l'utilisateur" , error!)
    }
}