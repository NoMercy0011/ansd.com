
import { devisData } from '@/types/type'
import React from 'react'

type DevisLivreOverviewProps = {
    devisLivre?: devisData;
}
export default function DevisLivreOverview( {devisLivre} : DevisLivreOverviewProps ) {
  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 dark:text-red-400 mb-2">
                Aperçu du devis
            </h4>
            <div className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                    <span>Type :</span>
                    <span className="font-semibold">
                        {devisLivre?.type}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Dimension :</span>
                    <span className="font-semibold">
                        {devisLivre?.dimension}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Couleur :</span>
                    <span className="font-semibold">
                        {devisLivre?.couleur === 'false' && "N & B"}
                        {devisLivre?.couleur === 'true' && "Couleur"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Papier :</span>
                    <span className="font-semibold">
                        {devisLivre?.papier}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Pages :</span>
                    <span className="font-semibold">
                        {devisLivre?.pages || ''}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Recto/Verso :</span>
                    <span className="font-semibold">
                        {devisLivre?.recto === "1" && "Recto" }
                        {devisLivre?.recto === "2" && "Recto/Verso"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Couverture :</span>
                    <span className="font-semibold">
                        {devisLivre?.couverture}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Imprimante :</span>
                    <span className="font-semibold">
                        {devisLivre?.imprimante}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Reliure :</span>
                    <span className="font-semibold">
                        {devisLivre?.reliure}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Finition :</span>
                    <span className="font-semibold">
                        {devisLivre?.finition}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Quantités :</span>
                    <span className="font-semibold">
                        {devisLivre?.quantite || ''}
                    </span>
                </div>
            </div>
    </div>
  )
}
