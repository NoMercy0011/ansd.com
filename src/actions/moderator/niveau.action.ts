"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function GetNiveau() {
    const niveau = prisma.niveau.findMany();
     
    return {
        niveau: niveau,
    }
}