"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileImageIcon, Layers } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartItemsType, devisData } from '@/types/type';
import OptionOverview from '../OptionOverview/OptionOverview';
import { GetClientID } from '@/sources/actions/admin/client.action';
import CatalogSkeleton from '../skeleton/skeleton';
import { useFlyers } from '@/hooks/use-fetch-item';
import { toast } from 'sonner';
import FlyersComponent from './FlyersComponent';

type CatalogueProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

export default function Carterie({ userRole, param, handleAddCart }: CatalogueProps) {
    const { flyers, flyersLoading, flyersError } = useFlyers();

    const [selectedCatalogueType, setSelectedCatalogueType] = useState<string>('');
    
    // L'état activeTab est géré ici, mais utilisé pour scroller dans les enfants
    const [activeTab, setActiveTab] = useState('type'); 
    
    const [devisEncours, setDevisEncours] = useState<devisData>();
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    });

    // Callbacks pour remonter les données des enfants
    const getDevis = (devis: devisData) => {
        setDevisEncours(devis);
    }
    const getPrix = (prixTotal: number, prixUnitaire: number) => {
        setPrix({ ...prix, prixTotal: prixTotal, prixUnitaire: prixUnitaire });
    }

    const itemData = {
        types: [
            { id: 1, type: 'flyers', nom: 'Flyers' },
        ]
    };

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setDevisEncours(prev => ({ ...prev, client_id: Number(clientData?.id_client) } as devisData));
                });
        }
        if(flyersError) {
            toast.error("Erreur s'est produite lors de la récupération des données");
        }
    }, [param]);

    const handleAddToCart = () => {
        // Construction de la description détaillée pour le panier
        const detailsDevis = `
            Type: ${devisEncours?.type}
            Dimension: ${devisEncours?.dimension || 'Non spécifié'}
            Matériau: ${devisEncours?.materiau || 'Non spécifié'}
            Couleur: ${devisEncours?.couleur || 'Non spécifié'}
            Face: ${devisEncours?.recto || 'Non spécifié'}
            Impression: ${devisEncours?.imprimante || 'Non spécifié'}
            Finition: ${devisEncours?.finition || 'Aucune'}
            Découpe: ${devisEncours?.decoupe || 'Standard'}
            Emplacement: ${devisEncours?.emplacement || 'Standard'}
            Particularité: ${devisEncours?.particularite || 'Aucune'}
        `;

        const packagingItem: CartItemsType = {
            id: Date.now(),
            designation: `Packaging - ${devisEncours?.type}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prix.prixUnitaire,
            quantite: Number(devisEncours?.quantite),
            remise: 0.00,
            service: 'Packaging',
        };

        if (handleAddCart && devisEncours) {
            handleAddCart(packagingItem, { ...devisEncours, montant: String(prix.prixTotal) });
        }
        
        // Reset (Optionnel)
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
        setSelectedCatalogueType('');
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                { flyersLoading ? ( <CardTitle className="flex text-slate-700 animate-pulse items-center gap-2 text-lg font-semibold">
                    <FileImageIcon className="h-6 w-6 text-red-500" />
                    Préparation...
                </CardTitle> ) :    
                (<CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <FileImageIcon className="h-6 w-6 text-red-500" />
                     Flyers
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
                            <TabsTrigger value="materiau" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Matériau
                            </TabsTrigger>
                            {/* <TabsTrigger value="couleur" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Couleur
                            </TabsTrigger> */}
                            <TabsTrigger value="face" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Face
                            </TabsTrigger>
                            <TabsTrigger value="imprimante" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Impression
                            </TabsTrigger>
                             <TabsTrigger value="decoupe" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Découpe
                            </TabsTrigger>
                            {/*<TabsTrigger value="emplacement" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Emplacement
                            </TabsTrigger>
                            <TabsTrigger value="finition" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Finition
                            </TabsTrigger> */}
                            <TabsTrigger value="quantite" disabled={!selectedCatalogueType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Quantité
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-1">
                        {flyersLoading ? <CatalogSkeleton /> : (
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
                                                    setSelectedCatalogueType(type.type);
                                                    setActiveTab('dimension'); // Auto-switch tab
                                                }}
                                                variant={selectedCatalogueType === type.type ? "default" : "outline"}
                                                className={`h-auto py-3 px-4 justify-start ${selectedCatalogueType === type.type ? 'bg-red-600 hover:bg-red-700 border-red-600 dark:text-white' : 'hover:border-red-500 dark:bg-slate-600'}`}
                                            >
                                                {type.nom}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rendu Conditionnel des Enfants avec passage de activeTab */}
                                {selectedCatalogueType === 'flyers' && (
                                    <FlyersComponent 
                                        item={flyers} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab} // On passe la section active pour le scroll
                                    />
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
                        devisFlyers={devisEncours as devisData} 
                    />
                </div>
            </CardContent>
        </Card>
    );
}