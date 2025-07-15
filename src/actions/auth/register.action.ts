"use server";

import { PrismaClient } from '@prisma/client';
import { userRegisterType } from '../../types/type';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export async function registerAction( userRegister : userRegisterType) {

  try {
    const [existingUser] = await prisma.user.findMany(
      {
        where : {
          email : userRegister.email
        }
      }
    );
    
    if (existingUser) {
      return {
        success : false,
        error : 'Un utilisateur existe déjà avec cet email .'
      }
    }

    if (userRegister.password !== userRegister.passwordConfirm){
      return{
        success : false,
        error : 'Votre mot de passe ne correspond pas'
      }
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(userRegister.password, salt);

    const userCreated = await prisma.user.create({
      data : {
        email: userRegister.email,
        password : hashedPassword,
        nom : userRegister.nom,
        prenom : userRegister.prenom,
        sexe: userRegister.sexe,
        role: 'Moderator',
      },
    });
    console.log(userCreated);

    const etablissementCreated = await prisma.etablissement.create({
      data : {
        etablissement: userRegister.etablissement,
        id_user: userCreated.id_user,
        contact: userRegister.contact,
        email: userRegister.schoolEmail,
        cisco: userRegister.cisco!,
        dren: userRegister.dren!,
      },
    });
    console.log(etablissementCreated);
    return {
      success : true,
      message : 'Utilisateur inscrit avec succès',
    }

  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    throw new Error('Erreur lors de l\'inscription');
  }
}