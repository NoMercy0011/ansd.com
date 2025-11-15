import { devisData } from '@/sources/types/type';
import React from 'react'

type DevisPackagingProps = {
    devisCalendar?: devisData;
}
export default function DevisCalendar( { devisCalendar } : DevisPackagingProps) {
  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">
                Aperçu du devis
            </h4>
            <div className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                    <span>Produit :</span>
                    <span className="font-semibold">
                        {devisCalendar?.type}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Dimension :</span>
                    <span className="font-semibold">
                        {devisCalendar?.dimension}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Materiau :</span>
                    <span className="font-semibold">
                        {devisCalendar?.materiau}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Face :</span>
                    <span className="font-semibold">
                        {devisCalendar?.recto }
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Imprimante :</span>
                    <span className="font-semibold">
                        {devisCalendar?.imprimante}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Socle :</span>
                    <span className="font-semibold">
                        {devisCalendar?.socle || ''}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Particularités :</span>
                    <span className="font-semibold">
                        {devisCalendar?.particularite || ''}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Quantités :</span>
                    <span className="font-semibold">
                        {devisCalendar?.quantite || ''}
                    </span>
                </div>
            </div>
    </div>
  )
}
