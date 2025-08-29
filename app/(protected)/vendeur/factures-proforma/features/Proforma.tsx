"use client"

import { useDocument } from '@/hooks/useModerator';
import { Button, Input } from '@/sources/components/ui';
import SectionTitle from '@/sources/components/ui/sectionTitle';
import { Copy, Edit, Eye, Search } from 'lucide-react';
import React, {  useState } from 'react'
import PrintableDocumentModal from '../../(features)/PrintableDocumentModal';
import { DocumentType } from '@/sources/types/type';

export default function Proforma() {
        const { proformas, documentLoading } = useDocument();
        const [searchTerm, setSearchTerm] = useState('');
        const [printableDoc, setPrintableDoc] = useState<DocumentType> ();
        const [openModal, setOpenModale] = useState(false);
    
        const handlePrepareAndPrintDocument = (doc ?: DocumentType) => {
            if (!doc) return;
            setPrintableDoc(doc);
            setOpenModale(true);
        };
    
        const onClose = () => {
            setOpenModale(false);
        }
        
    
    return (
    <>
    { openModal && <PrintableDocumentModal onClose={onClose} doc={printableDoc}/> }
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
                                <Button variant="ghost" icon={<Eye/>} onClick={() => handlePrepareAndPrintDocument(p)} className="p-2 h-auto" title="Visualiser" />
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
    </>
    );
}
