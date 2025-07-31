"use server"

import { userLoginType, userRegisterType } from "@/src/types/type";
import { cookies } from "next/headers";


export async function LoginRequest(login : userLoginType){
    console.log(login);
    
        (await cookies()).set('header', login.header, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 12 * 60 * 60, // 12 hours
              path: '/',
        });
        
    const response = await fetch( `${process.env.NEXT_PUBLIC_API_URI}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" , "client-id" : `${login.header}`},
            body: JSON.stringify(login),
        })
        
        const data = await response.json();
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
        return data;

}


export async function RegisterRequest(register : userRegisterType){
    
    const response = await fetch(process.env.API_URI + 'register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
    });
    const data = await response.json();

    return data;
}


// const response  = await fetch( `${process.env.NEXT_PUBLIC_API_URI}/hello`, {
//             method: "GET",
//             headers: { "Content-Type": "application/json" , "client-id" : "LPMA"},
//         });
//   const data = await response.json();   