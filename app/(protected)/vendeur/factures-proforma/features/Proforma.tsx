"use client"

import { useDocument } from '@/hooks/useModerator';
import { Button, Input } from '@/sources/components/ui';
import SectionTitle from '@/sources/components/ui/sectionTitle';
import { Copy, Edit, Eye, Search } from 'lucide-react';
import React, {  useState } from 'react'

export default function Proforma() {
    const { proformas, documentLoading } = useDocument();
    //const [proforma, setProforma] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    /*useEffect(() => {
        if(documentLoading) {
            const filter =  proformas.filter(p => 
            (p.document?.numero_document && p.document?.numero_document.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (p.client && p.client.nom_societe && p.client.nom_societe.toLowerCase().includes(searchTerm.toLowerCase())));
            setData(filter);
        }
    }, [proformas, searchTerm, documentLoading]);*/

    // const handleItemChange = () => {
        
    // };
    // const updateProformaItems = () => {
        
    // };
    // const handleFieldChange = () => { };

    // const proformaEditor = (
    //     <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    //             <div>
    //                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Client
    //                 </label>
    //                 <Select value={proforma?.clientId || ''} onChange={e => handleFieldChange('clientId', e.target.value)} disabled>
    //                     <option value="">-- Client --</option>
    //                     {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
    //                 </Select>
    //             </div>
    //             <div>
    //                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Délai d'exécution (jours)
    //                 </label>
    //                 <Input type="number" value={proforma?.delai || 7} onChange={e => handleFieldChange('delai', parseInt(e.target.value))}/>
    //             </div>
    //             <div>
    //                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">N° Proforma
    //                 </label>
    //                 <Input value={proforma?.proformaNumber || ''} disabled />
    //             </div>
    //         </div>
    //         <div className="overflow-x-auto mb-4 -mx-4 px-4">
    //             <table className="w-full">
    //                 <thead>
    //                     <tr>
    //                         <th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 w-2/5">Désignation</th>
    //                         <th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Qté</th>
    //                         <th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">P.U. (Ar)</th>
    //                         <th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Remise (%)</th>
    //                         <th className="p-2 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">Total (Ar)</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {proforma?.items.map(item => (
    //                         <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700">
    //                             <td className="p-2"><Input value={item.designation} onChange={e => handleItemChange(item.id, 'designation', e.target.value)} /></td>
    //                             <td className="p-2"><Input type="number" value={item.quantite} onChange={e => handleItemChange(item.id, 'quantite', e.target.value)} className="w-20" /></td>
    //                             <td className="p-2"><Input type="number" step="0.01" value={item.prixUnitaire} onChange={e => handleItemChange(item.id, 'prixUnitaire', e.target.value)} className="w-28" /></td>
    //                             <td className="p-2"><Input type="number" value={item.remise || 0} onChange={e => handleItemChange(item.id, 'remise', e.target.value)} className="w-20" /></td>
    //                             <td className="p-2 text-slate-800 dark:text-slate-200 font-medium">{(item.quantite * item.prixUnitaire * (1 - (item.remise || 0)/100)).toLocaleString('fr-FR')}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    //         <Button variant="ghost" icon={<PlusCircle/>} onClick={() => onAddItemToProforma(proforma)} className="text-sm">Ajouter un nouvel article</Button>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
    //             <div>
    //                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
    //                     Remarques
    //                 </label>
    //                 <Textarea value={proforma?.remarques || ''} onChange={e => handleFieldChange('remarques', e.target.value)} />
    //             </div>
    //             <div className="space-y-2 text-right bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
    //                 <div className="flex justify-between items-center">
    //                     <span className="text-slate-600 dark:text-slate-300">Total HT :</span>
    //                     <span className="font-bold text-slate-800 dark:text-slate-200">{proforma?.subTotal.toLocaleString('fr-FR') || '0'} Ar</span>
    //                 </div>
    //             <div className="flex justify-between items-center"><span className="text-slate-600 dark:text-slate-300">TVA (20%) :</span>
    //             <span className="font-bold text-slate-800 dark:text-slate-200">{(proforma?.totalPrice - proforma?.subTotal).toLocaleString('fr-FR') || '0'} Ar</span>
    //         </div>
    //         <hr className="my-2 border-slate-200 dark:border-slate-700"/>
    //         <div className="flex justify-between items-center text-xl">
    //             <span className="font-bold text-slate-800 dark:text-slate-100">Total TTC :</span>
    //             <span className="font-extrabold text-red-600">{proforma?.totalPrice.toLocaleString('fr-FR') || '0'} Ar</span>
    //         </div>
    //     </div>
    // </div>
    // <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
    //     <Button variant="secondary" onClick={onBack}>Retourner au Point de Vente</Button>
    //     <div className="flex gap-3">
    //         <Button variant="success" icon={Save} onClick={() => onSaveProforma(proforma)} disabled={!proforma}>Enregistrer</Button>
    //         <Button variant="primary" icon={FileSignature} onClick={() => onInitiatePayment('facture', proforma)} disabled={!proforma || !proforma.id}>Facturer</Button>
    //         <Button variant="primary" icon={Ticket} onClick={() => onInitiatePayment('ticket', proforma)} disabled={!proforma || !proforma.id}>Créer un Ticket</Button>
    //     </div>
    // </div>
    // </div>
    // );
  
    return (
        <div className="animate-fade-in space-y-8">
            <SectionTitle title="Factures Proforma" subtitle="Créez, sauvegardez et gérez vos propositions commerciales." />
            <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border dark:border-slate-700"><p className="text-slate-500 dark:text-slate-400">Convertissez une commande ou sélectionnez une proforma enregistrée pour commencer.</p></div>
            <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Proformas Enregistrées</h3>
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border dark:border-slate-700 mb-6">
                    <div className="relative">
                        <Input type="text" placeholder="Rechercher par N° ou nom client..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10"/>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"><table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">N° Proforma</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Date</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Client</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Total TTC</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Statut</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {documentLoading ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500 animate-pulse dark:text-slate-400">chargement des données...</td>
                            </tr>) : 
                        (proformas?.length > 0 ? proformas?.map(p => {
                        //const isOverdue = new Date() - p.document?.date_echeance.toISOString() > 3 * 24 * 60 * 60 * 1000 && p.document?.status !== 'Convertie';
                        return (
                        <tr key={p.document?.id_document} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 text-sm text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">#{p.document?.numero_document} </td>
                            <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{new Date(String(p.document?.date_emission)).toLocaleDateString('fr-Fr')}</td>
                            <td className="p-4 text-sm font-medium text-slate-900 dark:text-slate-200">{p.client?.nom_societe}</td>
                            <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">{p.document?.total_ttc.toLocaleString('fr-Fr')} Ar</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${p.document?.status === 'Convertie' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'}`}>{p.document?.status.toString()}</span>
                            </td>
                            <td className="p-4 flex items-center gap-1"><Button variant="ghost" icon={<Copy/>} className="p-2 h-auto" title="Dupliquer" />
                                <Button variant="ghost" icon={<Edit/>}  className="p-2 h-auto" title="Modifier" />
                                <Button variant="ghost" icon={<Eye/>} className="p-2 h-auto" title="Visualiser" />
                            </td>
                        </tr>
                    )}) : 
                    (<tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 dark:text-slate-400">Aucune proforma enregistrée.</td>
                    </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}
