"use client"

import { useClient } from '@/hooks/useModerator';
import { Button, Select } from '@/sources/components/ui';
import { UserPlus } from 'lucide-react';
import React, { useState } from 'react'
import Link from 'next/link';

export default function StartPage() {
    const { Clients, ClientsLoading} = useClient();
    const [selectedClientId, setSelectedClientId] = useState<string>()
    const [ orderSource, setOrderSource] = useState<string>();
    const [ isLoading, setIsLoading ] = useState(false);


  return (
    <>
            <div className="animate-fade-in max-w-lg mx-auto mt-10">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 text-center">
                <UserPlus size={48} className="mx-auto text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Démarrer une nouvelle vente</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Veuillez sélectionner un client et la source de la demande pour commencer.</p>
            <div className="space-y-4 text-left">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client</label>
                    <Select value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)}>
                        {ClientsLoading ? (<option value="">-- Chargement --</option>) :
                    ( <>
                        <option value="">-- Sélectionner un client --</option>
                        {!ClientsLoading && Clients.map(c => <option key={c.id_client} value={c.id_client}>{c.nom_societe} {/*c.soldeClient > 0 ? '💰' : ''*/}</option>)}
                        </>
                    )}
                    </Select>
                </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Source de la commande</label>
                <Select value={orderSource} onChange={e => setOrderSource(e.target.value)}>
                    <option>Facebook</option>
                    <option>WhatsApp</option>
                    <option>Appel Direct</option>
                    <option>Email</option>
                    <option>Visite</option>
                    <option>Salon</option>
                </Select>
            </div>
                </div>
                <Link href={`/vendeur/point-de-vente/${selectedClientId}`} onClick={() => setIsLoading(true)} >
                <Button isLoading={isLoading} disabled={!selectedClientId} className="w-full mt-6">
                    Commencer la configuration
                </Button>
                </Link>
            </div>
        </div>
    </>
    );
}


