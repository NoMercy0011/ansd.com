"use client"
import { useEffect, useState } from "react";


export default function Legendes(){
    const [charge, setCharge] = useState<number>(0);

    const legende : string[] =[
        ' " Ny fianarana no Lova tsara indrindra " ',
        ` " Mankasitraka amin' ny Adidy masina izay hiantsorohanao " `,
        ` " Mikolokolo, Manabe, Mitaiza ho reharehan'ny Firenena "`, 
        ' " Tsiaro Mandrakizay ny Lova navelanao " '
      ]
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCharge((prevIndex) => (prevIndex + 1) % legende.length);
        }, 5000); 
        return () => clearInterval(interval);
      }, []);

    return(
        <div className='text-md font-sans text-blue-500 h-10'>
          {legende[charge]}
      </div>
    )
}
