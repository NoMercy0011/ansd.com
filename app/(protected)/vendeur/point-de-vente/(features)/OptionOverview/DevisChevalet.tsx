import { devisData } from '@/sources/types/type';
import React from 'react'

type DevisProps = {
    devis?: devisData;
}
export default function DevisChevalet( { devis } : DevisProps) {
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

                <div className="flex justify-between">
                    <span>Support :</span>
                    <span className="font-semibold">
                        {devis?.support}
                    </span>
                </div>

                {   devis?.face &&  
                    <div className="flex justify-between">
                    <span>Face :</span>
                    <span className="font-semibold">
                        {devis?.face}
                    </span>
                </div>}

                {   devis?.papier &&
                    <div className="flex justify-between">
                    <span>Papier :</span>
                    <span className="font-semibold">
                        {devis?.papier }
                    </span>
                </div>}

                { devis?.orientation &&
                    <div className="flex justify-between">
                    <span>Orientation :</span>
                    <span className="font-semibold">
                        {devis?.orientation}
                    </span>
                </div>}

                {   devis?.forme_couture &&
                    <div className="flex justify-between">
                    <span>Forme/Couture :</span>
                    <span className="font-semibold">
                        {devis?.forme_couture || ''}
                    </span>
                </div>}

                {   devis?.particularite &&
                    <div className="flex justify-between">
                    <span>Particularités :</span>
                    <span className="font-semibold">
                        {devis?.particularite || ''}
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
