"use client"

import { Button } from "@/sources/components/ui"
import Link from "next/link"

export default function Error(){

    return (
        <>
        <h1 className="m-auto text-red-600 top-[50%] left-[50%] absolute text-lg"> Page Invalide </h1>
        <Link href={"/vendeur"} >
            <Button variant="primary">
                Vers le point de vente
            </Button>
        </Link>
        </>
    )
}