"use client"

import { Button, Input } from '@/sources/components/ui'
import {  devisData} from '@/types/type'
import { DollarSign, ShoppingBasket } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DevisLivreOverview from './DevisLivreOverview'
import DevisPackaging from './DevisPackaging'
import DevisCalendar from './DevisCalendar'
import DevisChevalet from './DevisChevalet'
import DevisFlyers from './DevisFlyers'
import DevisCarterie from './DevisCarterie'
import DevisGrandFormat from './DevisGrandFormat'
import DevisTextile from './DevisTextile'
import DevisGoodies from './DevisGoodies'

type OptionOverviewProps = {
    userRole?: string;
    prixUnitaireReel: number;
    prixTotalReel: number;
    devisLivre?: devisData;
    devisPackaging?: devisData;
    devisCalendar?: devisData;
    devisChevalet?: devisData;
    devisFlyers?: devisData;
    devisCarterie?: devisData;
    devisGrandFormat?: devisData;
    devisTextile?: devisData;
    devisGoodies?: devisData;
    handleAddToCart?: () => void;
}
export default function OptionOverview( OptionProps : OptionOverviewProps) {

    //const [nombreFeuillesPapier, setNombreFeuillesPapier] = useState(0.00);
    //const [prixUnitairePapierManuel, setPrixUnitairePapierManuel] = useState(0.00);
    
    const [prixTotalForceHT ,setPrixTotalForceHT] = useState(OptionProps.prixTotalReel);
    const [prixUnitaireForceHT, setPrixUnitaireForceHT] = useState(OptionProps.prixUnitaireReel);

    useEffect(() => {
        setPrixTotalForceHT(OptionProps.prixTotalReel);
        setPrixUnitaireForceHT(OptionProps.prixUnitaireReel);
    }, [OptionProps.prixTotalReel , OptionProps.prixUnitaireReel]);

    const handleClick = () => {
        OptionProps.handleAddToCart!();
    }

  return (
    <>
    <div className="w-full lg:w-1/4 space-y-4 mt-1">
        {OptionProps.devisLivre && <DevisLivreOverview devisLivre={OptionProps.devisLivre} /> }
        {OptionProps.devisPackaging && <DevisPackaging  devisPackaging={OptionProps.devisPackaging}/> }
        {OptionProps.devisCalendar && <DevisCalendar  devisCalendar={OptionProps.devisCalendar}/> }
        {OptionProps.devisChevalet && <DevisChevalet  devis={OptionProps.devisChevalet}/> }
        {OptionProps.devisFlyers && <DevisFlyers devis={OptionProps.devisFlyers}/> }
        {OptionProps.devisCarterie && <DevisCarterie devis={OptionProps.devisCarterie} /> }
        {OptionProps.devisGrandFormat &&  <DevisGrandFormat devis={OptionProps.devisGrandFormat} /> }
        {OptionProps.devisTextile &&  <DevisTextile devis={OptionProps.devisTextile} /> }
        {OptionProps.devisGoodies && <DevisGoodies  devis={OptionProps.devisGoodies} />}

        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">
                Évaluation en temps réel
            </h4>
            <div className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                    <span>Prix Unitaire HT:</span>
                    <span className="font-semibold">
                        {OptionProps.prixUnitaireReel?.toLocaleString('fr-FR')} Ar
                    </span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Total Article HT:</span>
                    <span className="font-semibold">
                        {OptionProps.prixTotalReel?.toLocaleString('fr-FR')} Ar
                    </span>
                </div>
            </div>
        </div>
    {/* {userRole === 'admin' && (
    <Accordion title="Calcul du Coût de Revient" icon={<BarChartIcon/>} defaultOpen={true}>
        <Accordion title="Coûts Matières & Consommables" icon={<Copy/>} defaultOpen={false}>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">
                        Nb. feuilles papier
                    </label>
                    <Input type="number" value={nombreFeuillesPapier.toLocaleString('fr-FR')} onChange={e => setNombreFeuillesPapier(parseFloat(e.target.value) || 0)} className="p-1 text-sm"/>
                </div>
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">
                        P.U. papier (Ar)
                    </label>
                    <Input type="number" step="0.01" value={prixUnitairePapierManuel.toLocaleString('fr-FR')} onChange={e => setPrixUnitairePapierManuel(parseFloat(e.target.value) || 0)} className="p-1 text-sm"/>
                </div>
            </div>
            <div>
                <label className="text-xs text-slate-500 dark:text-slate-400">
                    Marge de gâche / déchets (%)
                </label>
                <Input type="number" value={simParams.margeDechetsPct} onChange={e => handleSimParamChange('margeDechetsPct', e.target.value)} className="p-1 text-sm"/>
            </div>
            <div>
                <label className="text-xs text-slate-500 dark:text-slate-400">
                    Autres consommables
                </label>{autresConsommables.map((c, i) => 
                    ( 
                    <div key={c.id} className="flex items-center gap-2 mt-1">
                        <Input value={c.nom} onChange={e => handleConsommableChange(i, 'nom', e.target.value)} placeholder="Ex: Encre" className="p-1 text-xs"/>
                        <Input type="number" value={c.cout} onChange={e => handleConsommableChange(i, 'cout', e.target.value)} placeholder="Coût" className="p-1 text-xs w-20"/>
                        <button onClick={() => removeConsommable(c.id)} className="text-red-500"><Trash2 size={14}/>
                        </button>
                    </div> 
                ))}
                <Button onClick={addConsommable} variant="ghost" className="text-xs p-1 mt-1">
                    <Plus size={14}/> Ajouter
                </Button>
            </div>
            <div className="flex justify-between font-bold border-t dark:border-slate-600 pt-1 text-slate-800 dark:text-slate-200">
                <span className="text-slate-600 dark:text-slate-300">
                    Total Matières:
                </span>
                <span>{financials.totalCoutsMatieres?.toLocaleString('fr-FR') || '0'} Ar</span>
            </div>
        </Accordion>
        <Accordion title="Coûts de Production" icon={<Factory/>} defaultOpen={false}>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">
                        Prépa (h)
                    </label>
                    <Input type="number" value={simParams.heuresPrepa} onChange={e => handleSimParamChange('heuresPrepa', e.target.value)} className="p-1 text-sm"/>
                </div>
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">
                        Impr. (h)
                    </label>
                    <Input type="number" value={simParams.heuresImpression} onChange={e => handleSimParamChange('heuresImpression', e.target.value)} className="p-1 text-sm"/>
                </div>
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">
                        Finition (h)
                    </label>
                    <Input type="number" value={simParams.heuresFinition} onChange={e => handleSimParamChange('heuresFinition', e.target.value)} className="p-1 text-sm"/>
                </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
            Temps total x2 (marge) : <strong>{((simParams.heuresPrepa + simParams.heuresImpression + simParams.heuresFinition) * 2)}h</strong>
            </div>
            <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-2">
                    <Users2 size={12} className="mr-1"/>Personnel</label>
                { personnel.map((p, i) => 
                    (
                    <div key={p.id} className="flex items-center gap-2 mt-1">
                        <Input type="number" value={p.salaireMensuel} onChange={e => handlePersonnelChange(p.id, e.target.value)} placeholder="Salaire mensuel" className="p-1 text-xs"/>
                        <button onClick={() => removePersonnel(p.id)} className="text-red-500">
                            <Trash2 size={14}/></button>
                    </div>
                ))}
                <Button onClick={addPersonnel} variant="ghost" className="text-xs p-1 mt-1">
                    <Plus size={14}/> Ajouter personne
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t dark:border-slate-600 mt-2">
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">Électricité (kWh)</label>
                    <Input type="number" value={simParams.consommationKWH} onChange={e => handleSimParamChange('consommationKWH', e.target.value)} className="p-1 text-sm"/>
                </div>
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">Coût (Ar/kWh)</label>
                    <Input type="number" step="0.01" value={simParams.coutParKWH} onChange={e => handleSimParamChange('coutParKWH', e.target.value)} className="p-1 text-sm"/>
                </div>
            </div>
            <div className="flex justify-between font-bold border-t dark:border-slate-600 pt-1 text-slate-800 dark:text-slate-200">
                <span className="text-slate-600 dark:text-slate-300">Total Production:</span>
                <span>{financials.totalCoutsProduction?.toLocaleString('fr-FR') || '0'} Ar</span>
            </div>
        </Accordion>
        <Accordion title="Charges & Frais d'Exploitation" icon={<Building/>} defaultOpen={false}>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">Charges structurelles (prorata):</span>
                <span className="font-semibold">{financials.totalChargesFrais?.toLocaleString('fr-FR') || '0'} Ar</span>
            </div>
            <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <Car size={12} className="mr-1"/>Déplacement
                </label>
                <Input type="number" value={simParams.coutDeplacement} onChange={e => handleSimParamChange('coutDeplacement', e.target.value)} className="p-1 text-sm"/>
            </div>
            <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <Wrench size={12} className="mr-1"/>Maintenance
                </label>
                <Input type="number" value={simParams.coutMaintenance} onChange={e => handleSimParamChange('coutMaintenance', e.target.value)} className="p-1 text-sm"/>
            </div>
        </Accordion>
            <div className="flex justify-between font-bold text-lg p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100">
                <span>Coût de Revient Total:</span>
                <span>{financials.coutDeRevient?.toLocaleString('fr-FR') || '0'} Ar</span>
            </div>
    </Accordion>
    )} */}
    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 border-b border-blue-200 dark:border-blue-800 pb-2 mb-3 flex items-center">
            <DollarSign size={20} className="mr-2"/>Prix de Vente de l&apos;Article
        </h3>
        <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
            <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">P.U. Forcé (HT)</label>
                <Input type="number" value={ prixUnitaireForceHT.toString()} onChange={(e) => setPrixUnitaireForceHT(Number(e.target.value))} className="p-2 text-lg font-bold text-blue-600 dark:text-blue-400"/>
            </div>
            <div>
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Total Forcé (HT)</label>
                <Input type="number" value={prixTotalForceHT.toString()} onChange={(e) => setPrixTotalForceHT(Number(e.target.value))} className="p-2 text-lg font-bold text-blue-600 dark:text-blue-400"/>
            </div>
        </div>
        {/* {userRole === 'admin' && (
            <>
            <div className="flex justify-between items-center">
                <div>
                    <label className="text-xs text-slate-500 dark:text-slate-400">
                            Marge Souhaitée (%)
                    </label>
                    <Input type="number" value={simParams.margeCiblePct} onChange={e => handleSimParamChange('margeCiblePct', e.target.value)} className="p-1 text-sm w-20"/>
                </div>
                <div className="text-right"><div className="text-xs text-slate-500 dark:text-slate-400">
                    Marge Nette Réelle
            </div>
                    <MargeIndicator />
        </div>
    </div>
    <div className={`flex justify-between font-bold p-2 rounded-md ${financials.beneficeNet > 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
        <span>Bénéfice Net:</span>
        <span>{financials.beneficeNet?.toLocaleString('fr-FR') || '0'} Ar</span>
        </div>
        </>)} */}
     </div>
    </div>
        <Button variant="success" icon={<ShoppingBasket/>} onClick={handleClick} disabled={prixTotalForceHT <= 0} className="w-full">Ajouter au Panier</Button>
    </div>
    </>
  )
}
