"use server";

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { userLoginType, userSchema } from '../../types/type';

const prisma = new PrismaClient();



export async function loginAction( payload : userLoginType) {
  const { pseudo, password } = payload;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email : pseudo,
      }
    }) as userSchema;
    
    if (user === null ) {
      console.log('Aucun utilisateur trouvé avec cet email.')
      return {
        success: false,
        error: 'Aucun utilisateur trouvé avec cet email.',
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return {
        success: false,
        error: 'Mot de passe incorrect.',
      };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      id: user.id_user,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      sexe : user.sexe,
      photo: user.photo,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('12h')
      .sign(secret);

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 12 * 60 * 60, // 12 hours
      path: '/',
    });

    let redirectTo : string = '/';

    if (user.role === 'User') {
      redirectTo = '/user';
    } else if (user.role === 'Moderator') {
      redirectTo = '/moderator';
    }
    
    return {
      success : true,
      message: 'Connexion réussie.',
      redirectTo,
    }

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw new Error('Erreur lors de la connexion :', error!);
  }
}