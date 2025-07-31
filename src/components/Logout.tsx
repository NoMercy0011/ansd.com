"use client"

import { useState } from "react";
import logoutAction from "../actions/auth/logout.action";
import { useRouter } from "next/navigation";
import { Button } from "./ui";
import { LogOutIcon } from "lucide-react";

export default function Logout(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const logout = () => {

        setIsLoading(true);
        logoutAction();
        router.push('/login');
        setIsLoading(false);
    }
    return (
        <>
            <Button onClick={logout} isLoading={isLoading} >
                Deconnexion <LogOutIcon className="ml-3"/>
            </Button>
        </>
    )
}