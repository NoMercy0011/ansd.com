"use server"

import { cookies } from "next/headers";

export default async function getCookiesAction() {
  const role = (await cookies()).get('role')?.value;
  try{
    if(!role) {
    let redirectTo : string = '/'; 

    if (role === 'user') { 
      redirectTo = '/user';
    } else if (role === 'admin') {
      redirectTo = '/moderator';
    }

    return {
      success : true,
      redirectTo,
    }}     
}catch (error) {
    throw new Error(" Erreur lors de la recuperation du token" , error!)
  }
}