import { devisData } from '@/types/type';
import React from 'react'

type DevisProps = {
    devis?: devisData;
}
export default function DevisFlyers( { devis } : DevisProps) {
  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">
                Aperçu du devis
            </h4>
            <div className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                    <span>Dimension :</span>
                    <span className="font-semibold">
                        {devis?.dimension}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Matériaux :</span>
                    { !devis?.materiau ? (
                        <span  className="font-semibold"> 
                            {devis?.categorie}
                        </span>
                    ) :
                    (<span className="font-semibold">
                        {devis?.materiau}
                    </span>)}
                </div>

                <div className="flex justify-between">
                    <span>Face :</span>
                    <span className="font-semibold">
                        {devis?.recto }
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Imprimante :</span>
                    <span className="font-semibold">
                        {devis?.imprimante}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Nombre de volet :</span>
                    <span className="font-semibold">
                        {devis?.particularite}
                    </span>
                </div>

            </div>
    </div>
  )
}
