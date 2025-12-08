"use client"

import { Button } from '@/sources/components/ui';
import Logo from '@/sources/components/ui/logo';
import { DocumentType } from '@/types/type';
import { Printer } from 'lucide-react';
import React from 'react'

type PrintableDocProps = {
    doc?: DocumentType;
    onClose?: () => void;
}

export default function PrintableDocumentModal({ doc, onClose } : PrintableDocProps) {

const businessConfig = {
    nomEntreprise: "A.N.S. Orion",
    adresseEntreprise: "Lot ABC 123, Antananarivo, Madagascar",
    contactEntreprise: "contact@ans-orion.mg | +261 34 00 000 00",
    nif: "1234567890",
    stat: "0987654321",
    loyerMensuel: 3600000, taxeAnnuelle: 3000000, internetMensuel: 180000,
    heuresTravailMois: 192, joursTravailAn: 365,
    margeCiblePct: 25,
};

    if (!doc) return null;
    const handlePrint = () => {
        const printContents = document.getElementById('printable-area')?.innerHTML;
        const originalContents = document.body.innerHTML;
        const tailwind = '<script src="https://cdn.tailwindcss.com"></script>';
        document.body.innerHTML = `<html><head><title>Print</title>${tailwind}</head><body>${printContents}</body></html>`;
        setTimeout(() => {
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }, 500);
    };

  return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className='max-h-screen overflow-y-auto pr-4 space-y-4'>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-4 sm:p-6 lg:p-8 m-4 transform animate-slide-up flex flex-col" onClick={e => e.stopPropagation()}>
                <div id="printable-area" className="p-8 text-slate-800 bg-white flex-grow">
                    <header className="flex justify-between items-start border-b pb-4 mb-8">
                        <h1 className="text-2xl font-bold text-red-600"><Logo /></h1>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold uppercase">{doc.document?.type_document}</h2>
                            <p>#{doc.document?.numero_document}</p>
                            <p>Date: {new Date(String(doc.document?.date_emission)).toLocaleDateString('fr-FR')}</p>
                        </div>
                    </header>
                    <section className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 border-b">Client</h3>
                            <div className="text-sm ">
                                <p className="font-bold">{doc.client?.nom_societe || 'N/A'}</p>
                                <p>{doc.client?.rue || ''}, {doc.client?.ville || ''}</p>
                                <p>Contact: {doc.client?.nom_contact || ''} ({doc.client?.email || ''})</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 border-b">Société</h3>
                            <div className="text-sm">
                                <p>{businessConfig.adresseEntreprise}</p>
                                <p>{businessConfig.contactEntreprise}</p>
                                <p>NIF: {businessConfig.nif} / STAT: {businessConfig.stat}</p>
                            </div>
                        </div>
                    </section>
                    <section>
                        <table className="w-full text-sm">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-2 text-left font-semibold w-3/5">Désignation</th>
                                    <th className="p-2 text-right font-semibold">Qté</th>
                                    <th className="p-2 text-right font-semibold">P.U. HT</th>
                                    <th className="p-2 text-right font-semibold">Remise %</th>
                                    <th className="p-2 text-right font-semibold">Total HT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doc.ligne_document?.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-2 align-top">
                                        <p className="font-semibold">{item.designation}</p>
                                        {/* <p className="text-xs text-blue-600 font-semibold pl-2">Type: {item.detail_description}</p> */}
                                        <p className="text-xs text-slate-500 pl-2">{item.detail_description}</p>
                                    </td>
                                    <td className="p-2 text-right">{item.quantite}</td>
                                    <td className="p-2 text-right">{item.prix_unitaire_ht.toLocaleString('fr-FR')} Ar</td>
                                    <td className="p-2 text-right">{item.remise || 0}%</td>
                                    <td className="p-2 text-right font-medium">{(item.quantite * item.prix_unitaire_ht * (1 - (item.remise || 0) / 100)).toLocaleString('fr-FR')} Ar</td>
                                </tr>))}
                            </tbody>
                        </table>
                    </section>
                    <section className="flex justify-end mt-8">
                        <div className="w-full max-w-xs space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Total HT:</span>
                                <span>{doc.document?.sous_total_ht.toLocaleString('fr-FR')} Ar</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">TVA (20%):</span>
                                <span>{doc.document?.montant_tax.toLocaleString('fr-FR')} Ar</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-2">
                                <span >Total TTC:</span>
                                <span>{doc.document?.total_ttc.toLocaleString('fr-FR')} Ar</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold">Acompte versé:</span>
                                <span>{/*doc.acompte.toLocaleString('fr-FR')*/} 0 Ar</span>
                            </div>
                            <div className="flex justify-between font-bold text-red-600">
                                <span >Reste à payer:</span>
                                <span>{doc.document?.total_ttc.toLocaleString('fr-FR')} Ar</span>
                            </div>
                        </div>
                    </section>
                    <footer className="text-center text-xs text-slate-500 border-t mt-12 pt-4">
                        <p>Arrêtée la présente facture à la somme de : {doc.document?.total_ttc.toLocaleString('fr-FR')} Ariary.</p>
                        <p>Merci de votre confiance.</p>
                    </footer>
                </div>
                <div className="flex justify-end gap-3 p-4 bg-slate-50 border-t rounded-b-xl">
                    <Button variant="secondary" onClick={onClose}>Fermer</Button>
                    <Button variant="primary" icon={<Printer/>} onClick={handlePrint}>Imprimer</Button>
                </div>
            </div>
            </div>
        </div>
    );
}

