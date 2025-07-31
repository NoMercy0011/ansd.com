"use server"

import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export default async function logoutAction(){
    try{
        (await cookies()).delete('header');
        (await cookies()).delete('role');
        (await cookies()).delete('token');
        
        NextResponse.json({
            message : 'Utilisateur deconnecté'
        }, {status : 200})
    }catch (error){
        throw new Error('Erreur lors de la deconnexion', error!)
    }
}