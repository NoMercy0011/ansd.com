"use server"

import { PrismaClient } from "@prisma/client"
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function ModeratorDescriptionAction(){
    const token = (await cookies()).get('token')?.value;
    
        if(!token){
            throw new Error("Le token n'existe pas");
        }
        try{
    
            const { payload }  = await jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET)
                 );
            const { id } = payload;
    
            const [etablissement] = await prisma.etablissement.findMany({
                where: {
                    chef_etablissement:  Number(id),
                }
            })
            
            return {
                success: true,
                data : etablissement,
            }
    
        }catch (error){
            console.error(error)
            throw new Error('Erreur lors de la recupération des enseignants ', error!)
        }
}