import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { GiftIcon, Search } from 'lucide-react'
import React from 'react'

export default function Goodies() {

    const stockItems = [
        { id: 101, name: "Stylo Bille Bleu", price: 1500, stock: 250, seuilAlerte: 50, type: "vente-directe" },
        { id: 102, name: "Cahier A5 96p", price: 5400, stock: 120, seuilAlerte: 30, type: "vente-directe" },
        { id: 103, name: "Ramette Papier A4", price: 16500, stock: 15, seuilAlerte: 20, type: "vente-directe" },
        { id: 104, name: "Carnet de notes", price: 6600, stock: 150, seuilAlerte: 40, type: "vente-directe" },
    ];
  return (
    <Accordion title="Goodies" icon={<GiftIcon />} defaultOpen={false}>
                        
    <div className="relative mt-4 mb-4"><Input type="text" placeholder="Rechercher un article en stock..." className="pl-10"/>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
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
  )
}
