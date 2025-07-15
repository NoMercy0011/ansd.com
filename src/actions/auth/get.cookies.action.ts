"use server"

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export default async function getCookiesAction() {
  const token = (await cookies()).get('token')?.value;
  try{
    if(!token) {
        return {
        success : false,
      } }
    const { payload }  = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
         );

    const { role } = payload;

    let redirectTo : string = '/'; 

    if (role === 'User') { 
      redirectTo = '/user';
    } else if (role === 'Moderator') {
      redirectTo = '/moderator';
    }

    return {
      success : true,
      redirectTo,
    }     
}catch (error) {
    throw new Error(" Erreur lors de la recuperation du token" , error!)
  }
}