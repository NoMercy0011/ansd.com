"use client"
import { Button, Input } from '@/sources/components/ui';
import { clientType } from '@/sources/types/type';
import { FileClock, FileSignature, Save, ShoppingCart, Trash2 } from 'lucide-react';
import React, { useState } from 'react'

type CartSectionProps = {
    cartItems: cartItemType[];
    client?: clientType,
}

type cartItemType = {
    id: number;
    designation : string;
    detailedDescription : string;
    quantite : string;
    prixUnitaire : string;
    remise : string;
}
export default function CatdSection({ cartItems, client} : CartSectionProps) {

    const [ initialCartData, setInitialCartData] = useState('');
    const tvaAmount = 0.02;
    const handleFinalizeAndReturn = () => {
            setInitialCartData('');
    }
    const onConvertToProforma = () => {

    }
    const onInitiatePayment = () => {

    }

  return (
      <div className="w-full lg:w-1/3">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 sticky top-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-3 mb-4 flex items-center"><ShoppingCart size={20} className="mr-2"/> Panier pour {client?.nom_societe}</h3>
            <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2 -mr-2">
                {cartItems.length! > 0 ? cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="text-sm p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold text-slate-800 dark:text-slate-200 flex-1 pr-2">
                            {item.designation}
                            </p>
                            <Button variant="ghost" className="p-1 h-auto text-red-500" /*onClick={() => handleRemoveFromCart(item.id)}*/>
                                <Trash2 size={16}/>
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.detailedDescription}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 dark:text-slate-400">
                                    Qté
                                </label>
                                <Input type="number" /*value={item.quantite} onChange={e => handleUpdateCartItem(item.id, 'quantite', e.target.value)}*/ className="p-1 text-sm w-full"/>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 dark:text-slate-400">
                                    P.U. HT
                                </label>
                                <Input type="number" step="0.01" /* value={item.prixUnitaire} onChange={e => handleUpdateCartItem(item.id, 'prixUnitaire', e.target.value)}*/ className="p-1 text-sm w-full"/>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 dark:text-slate-400">
                                    Remise %
                                </label>
                                <Input type="number" /*value={item.remise} onChange={e => handleUpdateCartItem(item.id, 'remise', e.target.value)}*/ className="p-1 text-sm w-full"/>
                            </div>
                        </div>
                    </div>
                )) : (<p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">Le panier est vide.</p>)}
            </div>
            {cartItems.length! > 0 && (
                <>
                 <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span >
                            Sous-total HT :
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {/*cartSubTotal.toLocaleString('fr-FR')*/} 1 200 Ar
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span >Total HT après remise :</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {/*subTotalAfterDiscount.toLocaleString('fr-FR')*/} 1 200 Ar
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span >TVA ({tvaAmount*100}%) :</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {tvaAmount.toLocaleString('fr-FR')} Ar
                        </span>
                    </div>
                    <hr className="my-2 border-slate-200 dark:border-slate-700"/>
                    <div className="flex justify-between items-center text-xl">
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                            Total TTC :
                        </span>
                        <span className="font-extrabold text-red-600">
                            {/*cartTotalTTC.toLocaleString('fr-FR')*/} 12 000 Ar
                        </span>
                    </div>
                </div>
                
                </>
            )}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                {initialCartData ? ( 
                    <Button variant="success" icon={<Save/>} onClick={handleFinalizeAndReturn} disabled={cartItems?.length === 0} className="w-full">
                        Mettre à jour la Proforma
                    </Button> ) : 
                    ( <>
                        <Button variant="secondary" icon={<FileClock/>} onClick={onConvertToProforma} disabled={cartItems?.length === 0} className="w-full">
                            Créer la Proforma
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="primary" icon={<FileSignature/>} onClick={onInitiatePayment} disabled={cartItems?.length === 0} className="w-full">
                                Facturer
                            </Button>
                        </div>
                    </>
                )}
            </div>
            </div>
        </div>
  )
}


