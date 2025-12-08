import { devisData } from '@/types/type';
import React from 'react'

type DevisPackagingProps = {
    devisPackaging?: devisData;
}
export default function DevisPackaging( { devisPackaging } : DevisPackagingProps) {
  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">
                Aperçu du devis
            </h4>
            <div className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                    <span>Produit :</span>
                    <span className="font-semibold">
                        {devisPackaging?.type}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Dimension :</span>
                    <span className="font-semibold">
                        {devisPackaging?.dimension}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Materiau :</span>
                    <span className="font-semibold">
                        {devisPackaging?.materiau}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Couleur :</span>
                    <span className="font-semibold">
                        {devisPackaging?.couleur}
                    </span>
                </div>

                <div className={`flex justify-between ${devisPackaging?.recto === 'invalide' ? 'hidden' : '' }`}>
                    <span>Face :</span>
                    <span className="font-semibold">
                        {devisPackaging?.recto }
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Imprimante :</span>
                    <span className="font-semibold">
                        {devisPackaging?.imprimante}
                    </span>
                </div>
                <div className={`flex justify-between ${devisPackaging?.decoupe === 'invalide' ? 'hidden' : '' }`}>
                    <span>Découpage :</span>
                    <span className="font-semibold">
                        {devisPackaging?.decoupe}
                    </span>
                </div>

                <div className={`flex justify-between ${devisPackaging?.emplacement === 'invalide' ? 'hidden' : '' }`}>
                    <span>Emplacement :</span>
                    <span className="font-semibold">
                        {devisPackaging?.emplacement || ''}
                    </span>
                </div>
                <div className={`flex justify-between ${devisPackaging?.finition === 'invalide' ? 'hidden' : ''}`}>
                    <span>Finition :</span>
                    <span className="font-semibold">
                        {devisPackaging?.finition || ''}
                    </span>
                </div>
                <div className={`flex justify-between ${devisPackaging?.particularite === 'invalide' ? 'hidden' : '' }`}>
                    <span>Particularités :</span>
                    <span className="font-semibold">
                        {devisPackaging?.particularite || ''}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Quantités :</span>
                    <span className="font-semibold">
                        {devisPackaging?.quantite || ''}
                    </span>
                </div>
            </div>
    </div>
  )
}
