"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Monitor } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartItemsType, devisData } from '@/types/type';
import OptionOverview from '../OptionOverview/OptionOverview';
import { GetClientID } from '@/sources/actions/admin/client.action';
import CatalogSkeleton from '../skeleton/skeleton';
import { useChevalet } from '@/hooks/use-fetch-item';
import ChevaletTable from './ChevaletTable';
import RollUpStandard from './RollUpStandard';
import RollUpDeluxe from './RollUpDeluxe';
import XBanner from './XBanner';
import StopTrottoir from './StopTrottoir';
import PorteFlyers from './PorteFlyers';
import PorteAffiches from './PorteAffiches';
import Oriflamme from './Oriflamme';

type CatalogueProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

export default function Packaging({ userRole, param, handleAddCart }: CatalogueProps) {
    const { chevalet_de_table, porte_affiche, porte_flyers, roll_up_deluxe, 
            roll_up_standard, oriflamme, stop_trottoir, x_banner, chevaletLoading } = useChevalet();

    const [selectedPackagingType, setSelectedPackagingType] = useState<string>('');
    
    // L'état activeTab est géré ici, mais utilisé pour scroller dans les enfants
    const [activeTab, setActiveTab] = useState('type'); 
    
    const [devisPackaging, setDevisPackaging] = useState<devisData>();
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    });

    // Callbacks pour remonter les données des enfants
    const getDevis = (devis: devisData) => {
        setDevisPackaging(devis);
    }
    const getPrix = (prixTotal: number, prixUnitaire: number) => {
        setPrix({ ...prix, prixTotal: prixTotal, prixUnitaire: prixUnitaire });
    }

    const itemData = {
        types: [
            { id: 1, type: 'chevalet_de_table', nom: 'Chevalet de Table' },
            { id: 2, type: 'roll_up_standard', nom: 'Roll up standard' },
            { id: 3, type: 'roll_up_deluxe', nom: 'Roll up deluxe' },
            { id: 4, type: 'x_banner', nom: 'X Banner' },
            { id: 5, type: 'stop_trottoir', nom: 'Stop trottoir' },
            { id: 6, type: 'porte_flyers', nom: 'Porte flyers' },
            { id: 7, type: 'porte_affiche', nom: 'Porte affiches' },
            { id: 8, type: 'oriflamme', nom: 'Oriflamme' },
        ]
    };

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setDevisPackaging(prev => ({ ...prev, client_id: Number(clientData?.id_client) } as devisData));
                });
        }
    }, [param]);

    const handleAddToCart = () => {
        // Construction de la description détaillée pour le panier
        const detailsDevis = `
            Type: ${devisPackaging?.type}
            Dimension: ${devisPackaging?.dimension || 'Non spécifié'}
            Matériau: ${devisPackaging?.materiau || 'Non spécifié'}
            Couleur: ${devisPackaging?.couleur || 'Non spécifié'}
            Face: ${devisPackaging?.recto || 'Non spécifié'}
            Impression: ${devisPackaging?.imprimante || 'Non spécifié'}
            Finition: ${devisPackaging?.finition || 'Aucune'}
            Découpe: ${devisPackaging?.decoupe || 'Standard'}
            Emplacement: ${devisPackaging?.emplacement || 'Standard'}
            Particularité: ${devisPackaging?.particularite || 'Aucune'}
        `;

        const packagingItem: CartItemsType = {
            id: Date.now(),
            designation: `Packaging - ${devisPackaging?.type}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prix.prixUnitaire,
            quantite: Number(devisPackaging?.quantite),
            remise: 0.00,
            service: 'Packaging',
        };

        if (handleAddCart && devisPackaging) {
            handleAddCart(packagingItem, { ...devisPackaging, montant: String(prix.prixTotal) });
        }
        
        // Reset (Optionnel)
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
        setSelectedPackagingType('');
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                { chevaletLoading ? ( <CardTitle className="flex text-slate-700 animate-pulse items-center gap-2 text-lg font-semibold">
                    <Monitor className="h-6 w-6 text-red-500" />
                    Préparation...
                </CardTitle> ) :    
                (<CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Monitor className="h-6 w-6 text-red-500" />
                    { x_banner.catalogue?.catalogue }
                </CardTitle>)
                }
            </CardHeader>

            <CardContent>

                {/* Barre de Navigation Sticky */}
                <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 pt-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap h-auto w-full justify-start gap-1 bg-transparent p-0">
                            <TabsTrigger value="type" className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                <Layers className="h-3 w-3 mr-1" /> Type
                            </TabsTrigger>
                            <TabsTrigger value="dimension" className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Dimension
                            </TabsTrigger>
                            <TabsTrigger value="materiau" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Matériau
                            </TabsTrigger>
                            <TabsTrigger value="couleur" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Couleur
                            </TabsTrigger>
                            <TabsTrigger value="face" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Face
                            </TabsTrigger>
                            <TabsTrigger value="imprimante" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Impression
                            </TabsTrigger>
                            <TabsTrigger value="decoupe" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Découpe
                            </TabsTrigger>
                            <TabsTrigger value="emplacement" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Emplacement
                            </TabsTrigger>
                            {/* <TabsTrigger value="finition" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Finition
                            </TabsTrigger> */}
                            <TabsTrigger value="quantite" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Quantité
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-1">
                        {chevaletLoading ? <CatalogSkeleton /> : (
                            <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2 scroll-smooth">
                                
                                {/* Section Choix du Type (Toujours visible) */}
                                <div id="type-section" className="scroll-mt-24">
                                    <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="w-5 h-5 mr-2" />
                                        Type de Produit
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ">
                                        {itemData.types.map(type => (
                                            <Button
                                                key={type.id}
                                                title={type.nom}
                                                onClick={() => {
                                                    setSelectedPackagingType(type.type);
                                                    setActiveTab('dimension'); // Auto-switch tab
                                                }}
                                                variant={selectedPackagingType === type.type ? "default" : "outline"}
                                                className={`h-auto py-3 px-4 justify-start ${selectedPackagingType === type.type ? 'bg-red-600 hover:bg-red-700 border-red-600 dark:text-white' : 'hover:border-red-500 dark:bg-slate-600'}`}
                                            >
                                                {type.nom}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rendu Conditionnel des Enfants avec passage de activeTab */}
                                {selectedPackagingType === 'chevalet_de_table' && (
                                    <ChevaletTable 
                                        item={chevalet_de_table} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab} // On passe la section active pour le scroll
                                    />
                                )}
                                {selectedPackagingType === 'roll_up_standard' && (
                                    <RollUpStandard item={roll_up_standard} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'roll_up_deluxe' && (
                                    <RollUpDeluxe item={roll_up_deluxe} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'x_banner' && (
                                    <XBanner item={x_banner} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'stop_trottoir' && (
                                    <StopTrottoir item={stop_trottoir} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'porte_flyers' && (
                                    <PorteFlyers item={porte_flyers} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'porte_affiche' && (
                                    <PorteAffiches item={porte_affiche} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'oriflamme' && (
                                    <Oriflamme item={oriflamme} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Overview Panel (Fixe à droite sur grand écran) */}
                    <OptionOverview
                        userRole={userRole}
                        prixUnitaireReel={prix.prixUnitaire}
                        prixTotalReel={prix.prixTotal}
                        handleAddToCart={handleAddToCart}
                        // On cast ici car OptionOverview attend un type générique ou spécifique
                        devisPackaging={devisPackaging as devisData} 
                    />
                </div>
            </CardContent>
        </Card>
    );
}