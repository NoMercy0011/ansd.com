import { Loader2 } from "lucide-react";


export default function Loading(){
    return(
        <div className="absolute position-absolute top-[50%] left-[50%] ">
            <Loader2 className="w-10 h-10 animate-spin text-red-500"/>
        </div>
    )
}