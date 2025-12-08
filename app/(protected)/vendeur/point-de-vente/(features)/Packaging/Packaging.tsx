"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePackaging } from '@/hooks/useModerator';
import { Layers, PackageOpenIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Hangtag from './Hangtag';
import Etiquette from './Etiquette';
import Boite from './Boite';
import Doypack from './Doypack';
import SacPapier from './SacPapier';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartItemsType, devisData } from '@/types/type';
import OptionOverview from '../OptionOverview/OptionOverview';
import { GetClientID } from '@/sources/actions/admin/client.action';
import CatalogSkeleton from '../skeleton/skeleton';

type CatalogueProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

export default function Packaging({ userRole, param, handleAddCart }: CatalogueProps) {
    const { hangtag, boite, doypack, etiquette, sac_papier, packagingLoading } = usePackaging();

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

    const PackagingData = {
        types: [
            { id: 1, type: 'hangtag', nom: 'Hangtag' },
            { id: 2, type: 'etiquette', nom: 'Étiquette prédécoupée' },
            { id: 3, type: 'boite', nom: 'Boîte' },
            { id: 4, type: 'doypack', nom: 'Doypack' },
            { id: 5, type: 'sac_papier', nom: 'Sac papier' }
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
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <PackageOpenIcon className="h-6 w-6 text-red-500" />
                    Packaging & Boites
                </CardTitle>

                {/* Barre de Navigation Sticky */}
                <div className="sticky top-0 z-10 bg-white dark:bg-slate-950 pt-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap h-auto w-full justify-start gap-1 bg-transparent p-0">
                            <TabsTrigger value="type" className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                <Layers className="h-3 w-3 mr-1" /> Type
                            </TabsTrigger>
                            <TabsTrigger value="dimension" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Dimension
                            </TabsTrigger>
                            <TabsTrigger value="materiau" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Matériau
                            </TabsTrigger>
                            <TabsTrigger value="couleur" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Couleur
                            </TabsTrigger>
                            <TabsTrigger value="face" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Face
                            </TabsTrigger>
                            <TabsTrigger value="imprimante" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Impression
                            </TabsTrigger>
                            <TabsTrigger value="decoupe" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Découpe
                            </TabsTrigger>
                            <TabsTrigger value="emplacement" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Emplacement
                            </TabsTrigger>
                            {/* <TabsTrigger value="finition" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Finition
                            </TabsTrigger> */}
                            <TabsTrigger value="quantite" disabled={!selectedPackagingType} className="data-[state=active]:bg-slate-100 border border-transparent data-[state=active]:border-slate-200 text-xs px-3 py-1.5 h-auto">
                                Quantité
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-1">
                        {packagingLoading ? <CatalogSkeleton /> : (
                            <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2 scroll-smooth">
                                
                                {/* Section Choix du Type (Toujours visible) */}
                                <div id="type-section" className="scroll-mt-24">
                                    <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="w-5 h-5 mr-2" />
                                        Type de Produit
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {PackagingData.types.map(type => (
                                            <Button
                                                key={type.id}
                                                onClick={() => {
                                                    setSelectedPackagingType(type.type);
                                                    setActiveTab('dimension'); // Auto-switch tab
                                                }}
                                                variant={selectedPackagingType === type.type ? "default" : "outline"}
                                                className={`h-auto py-3 justify-start px-4 text-left ${selectedPackagingType === type.type ? 'bg-red-600 hover:bg-red-700 border-red-600' : 'hover:border-red-500'}`}
                                            >
                                                {type.nom}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rendu Conditionnel des Enfants avec passage de activeTab */}
                                {selectedPackagingType === 'hangtag' && (
                                    <Hangtag 
                                        hangtag={hangtag} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab} // On passe la section active pour le scroll
                                    />
                                )}
                                {selectedPackagingType === 'etiquette' && (
                                    <Etiquette etiquette={etiquette} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'boite' && (
                                    <Boite boite={boite} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'doypack' && (
                                    <Doypack doypack={doypack} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
                                )}
                                {selectedPackagingType === 'sac_papier' && (
                                    <SacPapier sac_papier={sac_papier} userRole={String(userRole)} getDevis={getDevis} getPrix={getPrix} activeSection={activeTab} />
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