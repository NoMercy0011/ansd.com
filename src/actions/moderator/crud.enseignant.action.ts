"use server"

import { EnseignantType } from "@/src/types/type";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs";
import { ModeratorDescriptionAction } from "./moderator.description.action";


const prisma = new PrismaClient();


export async function CreateEnseignantAction(data : EnseignantType){
    console.log(data)
    try{
        const [existingUser] = await prisma.user.findMany(
            {
              where : {
                email : data.email
              }
            }
          );
          if (existingUser) {
            return {
              success : false,
              message : 'Un utilisateur existe déjà avec cet email.'
            }
          }

          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hash(String(data.password), salt);
          console.log(hashedPassword)

          const userCreated = await prisma.user.create({
            data : {
              email: data.email,
              password : hashedPassword,
              nom : data.nom,
              prenom : data.prenom,
              date_naissance: data.date_naissance?.toString(),
              lieu_naissance: data.lieu_naissance,
              sexe: data.sexe,
              role: 'User',
              telephone: data.telephone,
            },
          });

          console.log(userCreated)

          const etablissement = await ModeratorDescriptionAction();

          if(!etablissement.success){
            return {
                success : false,
                message : "Erreur s'est produite lors de l'ajout de l'enseignant"
            }
          }

           await prisma.enseignant.create({
            data : {

                enseignant: userCreated.id_user,
                id_etablissement: etablissement.data.id_etablissement,
                chef_etablissement: etablissement.data.chef_etablissement,
            }
          })

          return {
            success : true,
            message: "Inscription reussie "
          }
    } catch(error) {
        console.log(error)
        throw new Error(" Erreur lors de l'inscription de l'enseignant :", error! )
    }
}

export async function UpdateEnseignantAction(data : EnseignantType){
    console.log(data)
}

export async function ReadEnseignantAction(){

        try{
    
            const etablissement =  await ModeratorDescriptionAction();
    
            const enseignants = await prisma.enseignant.findMany(
            {
                where : {
                        id_etablissement : Number(etablissement?.data.id_etablissement),
                },
                include : {
                  user_enseignant_enseignantTouser : {
                        select : {
                            id_user: true,
                            nom: true,
                            prenom: true,
                            email: true,
                            sexe: true,
                            date_naissance: true,
                            lieu_naissance: true,
                            telephone: true,
                        }
                    }
                }
            })
    
            if(!enseignants[0]) {
                console.log("Vous avez aucun enseignant inscrit pour l'instant")
                return{
                    success: false,
                    message : "Vous avez aucun enseignant inscrit pour l'instant",
                    data: [],
                }
            }
            return {
                success: true,
                message: '',
                data : enseignants,
            }
    
        }catch (error){
            console.error(error)
            throw new Error('Erreur lors de la recupération des enseignants ', error!)
        }
}

export async function DeleteEnseignantAction( id : number){
    console.log(id);
}

