import Accordion from '@/sources/components/ui/accordion'
import { BrainCircuit } from 'lucide-react'
import React from 'react'

export default function OtherService() {
    
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
    ]};

  return (
    <Accordion title="Ajouter un autre service" icon={<BrainCircuit />} defaultOpen={false}>
        <div className='mt-4'>
        </div>
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
  )
}
