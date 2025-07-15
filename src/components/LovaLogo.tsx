import logo from "@/public/logo.png"
import Image from "next/image"


export default function LovaLogo(props : {
    position : "m-auto" | "m-0";
    background: "bg-white" | "bg-gray-300";
}){
    return(
        <div className={`${props.background} py-2 px-10 h-30`}>
            <Image src={logo} alt="Logo" className={`${props.position} w-35`} />
        </div>
    )
}