import { devisData } from '@/sources/types/type';
import React from 'react'

type DevisProps = {
    devis?: devisData;
}
export default function DevisTextile( { devis } : DevisProps) {
  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">
                Aperçu du devis
            </h4>
            <div className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                    <span>Produit :</span>
                    <span className="font-semibold">
                        {devis?.type}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Taille :</span>
                    <span className="font-semibold">
                        {devis?.taille}
                    </span>
                </div>

                { devis?.grammage && <div className="flex justify-between">
                    <span>Gramme Tissu :</span>
                    <span className="font-semibold">
                        {devis?.grammage}
                    </span>
                </div>}

                <div className="flex justify-between">
                    <span>Dimension :</span>
                    <span className="font-semibold">
                        {devis?.dimension}
                    </span>
                </div>


                <div className="flex justify-between text-right">
                    <span>Emplacement :</span>
                    <span className="font-semibold">
                        {devis?.emplacement || ''}
                    </span>
                </div>


                <div className="flex justify-between">
                    <span>Imprimante :</span>
                    <span className="font-semibold">
                        {devis?.technologie}
                    </span>
                </div>
                
                {devis?.couleur && <div className="flex justify-between">
                    <span>Couleur :</span>
                    <span className="font-semibold">
                        {devis?.couleur }
                    </span>
                </div>}

                <div className="flex justify-between">
                    <span>Quantités :</span>
                    <span className="font-semibold">
                        {devis?.quantite || ''}
                    </span>
                </div>
            </div>
    </div>
  )
}
