import { devisData } from '@/types/type';
import React from 'react'

type DevisProps = {
    devis?: devisData;
}
export default function DevisCarterie( { devis } : DevisProps) {
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
                    <span>Dimension :</span>
                    <span className="font-semibold">
                        {devis?.dimension}
                    </span>
                </div>

                <div className={`${devis?.materiau === 'invalide' ? 'hidden' : 'flex justify-between'}`}>
                    <span>Matériau:</span>
                    <span className="font-semibold truncate ml-2.5">
                        {devis?.materiau ? devis.materiau : devis?.categorie}
                    </span>
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
                    <span>Découpe :</span>
                    <span className="font-semibold">
                        {devis?.decoupe}
                    </span>
                </div>

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
