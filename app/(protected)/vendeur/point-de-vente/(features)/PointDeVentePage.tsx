"use client"

import { Button, Input, StatCard, Textarea } from '@/sources/components/ui';
import Accordion from '@/sources/components/ui/accordion';
import { clientType } from '@/sources/types/type';
import { AlertTriangle, BrainCircuit, FileClock, PencilRuler, Search, ShoppingBasket, Tag, Truck, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import CatdSection from './CatdSection';
import { GetClientID } from '@/sources/actions/admin/client.action';

type PointDeVenteProps = {
    
    param ?: string;
}

const cartItems = [{
    id: 0,
    designation : '',
    detailedDescription : '',
    quantite : '',
    prixUnitaire : '',
    remise : '',
}]

export default function PointDeVentePage( { param } : PointDeVenteProps) {

    const stockItems = [
      { id: 101, name: "Stylo Bille Bleu", price: 1500, stock: 250, seuilAlerte: 50, type: "vente-directe" },
      { id: 102, name: "Cahier A5 96p", price: 5400, stock: 120, seuilAlerte: 30, type: "vente-directe" },
      { id: 103, name: "Ramette Papier A4", price: 16500, stock: 15, seuilAlerte: 20, type: "vente-directe" },
      { id: 104, name: "Carnet de notes", price: 6600, stock: 150, seuilAlerte: 40, type: "vente-directe" },
    ];
    const [ client, setClient] = useState<clientType> ();

    useEffect(() => {

        GetClientID(Number(param)).then(res => res.data).then(setClient);

    }, [param]);

    const commercialKpis = {
        proformasEnAttente: 0,
        facturesARecouvrer: 0,
        totalResteAPayer: 0.00,
    }
    const handleAddToCart = () => {
    };

    const   otherServices = {
    "Conception & Retouche": [
        { id: 201, name: "Livre/Magazine (Simple)", price: 5000, unit: "/page" },
        { id: 202, name: "Livre/Magazine (Complexe)", price: 10000, unit: "/page" },
    ],
    "Supports de Communication": [
        { id: 205, name: "Carte de Visite (Simple)", price: 30000 },
        { id: 206, name: "Carte de Visite (Complexe)", price: 50000 },
    ],
    "Identité Visuelle": [
        { id: 221, name: "Logo (Simple)", price: 100000 },
        { id: 222, name: "Logo (Complexe)", price: 600000 },
    ]
    };

    const handleChange = (/*e : React.ChangeEvent*/) => {

    }

      return (
          <div className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard title="Proformas en attente" value={commercialKpis.proformasEnAttente} icon={<FileClock size={24} className="text-white"/>} color={{bg: "bg-yellow-500"}} trend={{direction: 'up', value: '+2'}}/>
                  <StatCard title="Factures à recouvrer" value={commercialKpis.facturesARecouvrer} icon={<AlertTriangle size={24} className="text-white"/>} color={{bg:"bg-orange-500"}} />
                  <StatCard title="Total Reste à Payer" value={`${commercialKpis.totalResteAPayer.toLocaleString('fr-FR')} Ar`} icon={<Wallet size={24} className="text-white"/>} color={{bg: "bg-red-500"}} />
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-6"> 

                <Accordion title="Ajouter un article en stock (Vente Directe)" icon={<Tag />} defaultOpen={true} >
                    
                    <div className="relative mb-4"><Input type="text" placeholder="Rechercher un article en stock..." value={'searchTerm'} onChange={handleChange} className="pl-10"/><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-60 overflow-y-auto pr-2">
                {stockItems.map(item => (
                    <button key={item.id} className="p-4 border dark:border-slate-700 rounded-lg text-center hover:border-red-500 dark:hover:border-red-500 hover:shadow-sm transition-all disabled:opacity-50 bg-white dark:bg-slate-800" disabled={item.stock <= 0}>
                        <span className="font-semibold block text-slate-800 dark:text-slate-200">{item.name}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 block">{item.price.toLocaleString('fr-FR')} Ar</span>
                        <span className={`text-xs ${item.stock > item.seuilAlerte ? 'text-emerald-600' : 'text-red-600'}`}>Stock: {item.stock}</span>
                    </button>))}
                </div>
                </Accordion>

                <Accordion title="Ajouter un autre service" icon={<BrainCircuit/>} defaultOpen={true}>
                            {Object.entries(otherServices).map(([category, serviceList]) => (
                                <Accordion key={category} title={category} defaultOpen={false}>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {serviceList.map(service => (
                                            <button key={service.id} 
                                                //onClick={() => onAddToCart({ id: Date.now(), serviceId: service.id, designation: service.name, quantite: 1, prixUnitaire: service.price, remise: 0, typeDeVente: 'Service', detailedDescription: `Prestation de service - ${service.name}` })} 
                                                className="p-4 border dark:border-slate-700 rounded-lg text-center hover:border-red-500 dark:hover:border-red-500 hover:shadow-sm transition-all bg-white dark:bg-slate-800"><span className="font-semibold block text-slate-800 dark:text-slate-200">{service.name}</span><span className="text-sm text-slate-500 dark:text-slate-400 block">
                                                {service.price.toLocaleString('fr-FR')} Ar {"service?.unit"}
                                            </span>
                                        </button>))}
                                    </div>
                                </Accordion>
                            ))}
                </Accordion>

                <Accordion title="Ajouter un service de Livraison" icon={<Truck/>} defaultOpen={false}>
                    <div className="space-y-3">
                        <Input placeholder={`Nom du service (Livraison)`} value={"item.designation"} /*onChange={e => handleChange('designation', e.target.value)}*/ />
                        <Textarea placeholder="Description détaillée..." value={"item.detailedDescription"} /*onChange={e => handleChange('detailedDescription', e.target.value)}*/ />
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="number" placeholder="Quantité" value={"item.quantite"} /*onChange={e => handleChange('quantite', e.target.value)} />
                            <Input type="number" placeholder="Prix Unitaire HT (Ar)" value={"item.prixUnitaire"} /*onChange={e => handleChange('prixUnitaire', e.target.value)}*/ />
                        </div>
                        <Button variant="success" icon={<ShoppingBasket/>} onClick={handleAddToCart} className="w-full">
                            Ajouter au Panier
                        </Button>
                    </div>
                </Accordion>

                <Accordion title="Ajouter un article manuel personnalisé" icon={<PencilRuler/>} defaultOpen={false}>
                    <div className="space-y-3">
                        <Input placeholder={`Nom du service (Manuel)`} value={"item.designation"} /*onChange={e => handleChange('designation', e.target.value)}*/ />
                        <Textarea placeholder="Description détaillée..." value={"item.detailedDescription"} /*onChange={e => handleChange('detailedDescription', e.target.value)}*/ />
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="number" placeholder="Quantité" value={"item.quantite"} /*onChange={e => handleChange('quantite', e.target.value)}*/ />
                            <Input type="number" placeholder="Prix Unitaire HT (Ar)" value={"item.prixUnitaire"} /*onChange={e => handleChange('prixUnitaire', e.target.value)}*/ />
                        </div>
                        <Button variant="success" icon={<ShoppingBasket/>} onClick={handleAddToCart} className="w-full">Ajouter au Panier</Button>
                    </div>
                </Accordion>

            </div>
                <CatdSection cartItems={cartItems} client={client}/>
        </div>
    </div>
    );
}