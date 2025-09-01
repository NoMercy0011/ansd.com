"use client"
import { CreateFacture, CreateProforma } from '@/sources/actions/admin/document.action';
import { Button, Input } from '@/sources/components/ui';
import { CartItemsType, clientType, devisLivreData, DocumentType } from '@/sources/types/type';
import { FileClock, FileSignature, Save, ShoppingCart, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

type CartSectionProps = {
    cartItems: CartItemsType[];
    client?: clientType;
    devisLivre: devisLivreData[];
    RemoveFromCart: (id : number) => void;
    cartItemsInit: () => void;
}

export default function CartSection({ cartItems, client, devisLivre, RemoveFromCart, cartItemsInit} : CartSectionProps) {

    const [ initialCartData, setInitialCartData] = useState('');
    const [ isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState<CartItemsType[]>(cartItems);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [tvaAmount, setTvaAmount] = useState(0);
    const [cartTotalTTC, setCartTotalTTC] = useState(0);
    const [remise, setCartRemise] = useState(0);
    const tvaRate = 0.20; 

    
    useEffect(() => {
        setCartData([...cartItems]);
        const cartSubTotal = cartItems.reduce((acc, item) => acc + (item.quantite * item.prix_unitaire_ht * (1 - (item.remise || 0) / 100)), 0);
        const tvaAmount = cartSubTotal * tvaRate;
        const cartTotalTTC = cartSubTotal + tvaAmount; 
        setCartSubTotal(cartSubTotal);
        setTvaAmount(tvaAmount);
        setCartTotalTTC(cartTotalTTC);
    }, [cartItems]);

    useEffect(() => {
        const cartSubTotal = cartData.reduce((acc, item) => acc + (item.quantite * item.prix_unitaire_ht * (1 - (item.remise || 0) / 100)), 0);
        const tvaAmount = cartSubTotal * tvaRate;
        const cartTotalTTC = cartSubTotal + tvaAmount; 
        const remise = cartItems.reduce((acc, item) => acc + (item.quantite * item.prix_unitaire_ht), 0) - cartSubTotal;
        setCartRemise(remise);
        setCartSubTotal(cartSubTotal);
        setTvaAmount(tvaAmount);
        setCartTotalTTC(cartTotalTTC);
    }, [cartData]);

    const handleFinalizeAndReturn = () => {
            setInitialCartData('');
    }

    const submitToProforma = async () => {
        setIsLoading(true);
        try{
            const data: DocumentType = {
                document : {
                    client_id: Number(client?.id_client),
                    type_document: 'proforma',
                    sous_total_ht: cartSubTotal,
                    remise: remise,
                    montant_tax: tvaAmount,
                    total_ttc: cartTotalTTC,
                    status: 'au panier',
                },
                ligne_document : cartData,
                devis_livre : devisLivre,
            } 
            await CreateProforma(data);
        }catch {
            console.log("erreur inattendu lors de la creation du proforma");
        }finally{
            setIsLoading(false)
            setCartData([]);
            cartItemsInit();
        }
    }
    const submitToInvoice = async() => {
        setIsLoading(true);
        try{
            const data: DocumentType = {
                document : {
                    client_id: Number(client?.id_client),
                    type_document: 'facture',
                    sous_total_ht: cartSubTotal,
                    remise: remise,
                    montant_tax: tvaAmount,
                    total_ttc: cartTotalTTC,
                    status: 'non payer',
                },
                ligne_document : cartData,
                devis_livre : devisLivre,
            } 

            await CreateFacture(data);
        }catch {
            console.log("erreur inattendu lors de la creation du facture");
        }finally{
            setIsLoading(false);
            setCartData([]);
            cartItemsInit();
        }
    }
    const handleRemoveFromCart = (id: number) => {
       RemoveFromCart(id);
    }
    const handleUpdateCartItem = (itemId : number, field: string, value: string) => {

        setCartData(prev => prev.map(item => { 
          if (item.id === itemId) { 
            const val = (field === 'quantite' || field === 'prixUnitaire' || field === 'remise') ? parseFloat(value) || 0 : value; 
            return { ...item, [field]: val }; 
          } 
          return item; }));
    };

  return (
      <div className="w-full lg:w-1/3">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 sticky top-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-3 mb-4 flex items-center"><ShoppingCart size={20} className="mr-2"/> Panier pour {client?.nom_societe}</h3>
            <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2 -mr-2">
                {cartData.length! > 0 ? cartData.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="text-sm p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start">
                            <p className="font-semibold text-slate-800 dark:text-slate-200 flex-1 pr-2">
                            {item.designation}
                            </p>
                            <Button variant="ghost" className="p-1 h-auto text-red-500" onClick={() => handleRemoveFromCart(item.id)}>
                                <Trash2 size={16}/>
                            </Button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.detail_description}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 dark:text-slate-400">
                                    Qté
                                </label>
                                <Input type="number" name='quantite' value={item.quantite.toString()} onChange={(e) => handleUpdateCartItem(item.id, 'quantite', e.target.value)} className="p-1 text-sm w-full"/>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 dark:text-slate-400">
                                    P.U. HT
                                </label>
                                <Input type="number" name='prixUnitaire' step="0.01" value={item.prix_unitaire_ht.toString()} onChange={e => handleUpdateCartItem(item.id, 'prixUnitaire', e.target.value)} className="p-1 text-sm w-full"/>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-500 dark:text-slate-400">
                                    Remise %
                                </label>
                                <Input type="number" name='remise' value={item.remise.toString()} onChange={e => handleUpdateCartItem(item.id, 'remise', e.target.value)}  className="p-1 text-sm w-full"/>
                            </div>
                        </div>
                    </div>
                )) : (<p className="text-sm text-slate-500 dark:text-slate-400 text-center py-8">Le panier est vide.</p>)}
            </div>
            {cartData.length! > 0 && (
                <>
                 <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 space-y-2">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span >
                            Montant Remise :
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {remise.toLocaleString('fr-FR')} Ar
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span >
                            Sous-total HT :
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {cartSubTotal.toLocaleString('fr-FR')} Ar
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span >TVA ({tvaRate*100}%) :</span>
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
                            {cartTotalTTC.toLocaleString('fr-FR')} Ar
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
                        <Button variant="secondary" isLoading={isLoading} icon={<FileClock/>} onClick={submitToProforma} disabled={cartData?.length === 0 || isLoading } className="w-full">
                            Créer la Proforma
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="primary" isLoading={isLoading} icon={<FileSignature/>} onClick={submitToInvoice} disabled={cartData?.length === 0 || isLoading } className="w-full">
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


