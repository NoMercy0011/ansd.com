import { devisData } from '@/types/type';
import React from 'react'

type DevisProps = {
    devis?: devisData;
}
export default function DevisGrandFormat( { devis } : DevisProps) {
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
                    <span>Laize (largeur) :</span>
                    <span className="font-semibold">
                        {devis?.laize}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Face :</span>
                    <span className="font-semibold">
                        {devis?.face}
                    </span>
                </div>


                <div className="flex justify-between text-right">
                    <span>Finition :</span>
                    <span className="font-semibold">
                        {devis?.finition || ''}
                    </span>
                </div>

                { devis?.epaisseur && <div className="flex justify-between">
                    <span>Epaisseur :</span>
                    <span className="font-semibold">
                        {devis?.epaisseur }
                    </span>
                </div>}

                <div className="flex justify-between">
                    <span>Particularité :</span>
                    <span className="font-semibold">
                        {devis?.particularite}
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
