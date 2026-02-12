"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Shirt } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartItemsType, devisData } from '@/types/type';
import OptionOverview from '../OptionOverview/OptionOverview';
import { GetClientID } from '@/sources/actions/admin/client.action';
import CatalogSkeleton from '../skeleton/skeleton';
import { useTextiles } from '@/hooks/use-textile';

// Importez les composants spécifiques si nécessaire
import TextileProductComponent from './TextileProductComponent';

type CatalogueProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

export default function Textiles({ userRole, param, handleAddCart }: CatalogueProps) {
    // ========== HOOKS PERSONNALISÉS ==========
    const { tshirt, polo, sweat, gilet, casquette, nappe, bob, maillot, combinaison, totebag, trousse, textilesLoading } = useTextiles();

    // ========== ÉTAT DU COMPOSANT ==========
    const [selectedTextileType, setSelectedTextileType] = useState<string>('');
    const [activeTab, setActiveTab] = useState('type');
    const [devisEncours, setDevisEncours] = useState<devisData>();
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    });

    // ========== DONNÉES STATIQUES ==========
    const itemData = {
        types: [
            { id: 1, type: 'tshirt', nom: 'T-shirt' },
            { id: 2, type: 'polo', nom: 'Polo' },
            { id: 3, type: 'sweat', nom: 'Sweat' },
            { id: 4, type: 'gilet', nom: 'Gilet' },
            { id: 5, type: 'casquette', nom: 'Casquette' },
            { id: 6, type: 'nappe', nom: 'Nappe' },
            { id: 7, type: 'bob', nom: 'Bob' },
            { id: 8, type: 'maillot', nom: 'Maillot' },
            { id: 9, type: 'combinaison', nom: 'Combinaison' },
            { id: 10, type: 'totebag', nom: 'Totebag' },
            { id: 11, type: 'trousse', nom: 'Trousse' }
        ]
    };

    // ========== CALLBACKS POUR LES ENFANTS ==========
    const getDevis = (devis: devisData) => {
        setDevisEncours(devis);
    };

    const getPrix = (prixTotal: number, prixUnitaire: number) => {
        setPrix({ prixTotal, prixUnitaire });
    };

    // ========== CHARGEMENT DU CLIENT ==========
    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setDevisEncours(prev => ({ 
                        ...prev, 
                        client_id: Number(clientData?.id_client) 
                    } as devisData));
                })
                .catch(error => {
                    console.error('Erreur lors du chargement du client:', error);
                });
        }
    }, [param]);

    // ========== GESTION DE L'AJOUT AU PANIER ==========
    const handleAddToCart = () => {
        if (!devisEncours?.type || prix.prixTotal === 0) {
            alert('Veuillez configurer complètement le produit');
            return;
        }

        const textileType = itemData.types.find(t => t.type === selectedTextileType);

        const detailsDevis = `
            Type: ${textileType?.nom || 'Non spécifié'}
            Taille: ${devisEncours?.taille || 'Non spécifié'}
            Grammage: ${devisEncours?.grammage || 'Non spécifié'}
            Dimension d'impression: ${devisEncours?.dimension || 'Non spécifié'}
            Emplacement: ${devisEncours?.emplacement || 'Non spécifié'}
            Technologie: ${devisEncours?.technologie || 'Non spécifié'}
            Couleur: ${devisEncours?.couleur || 'Non spécifié'}
            Quantité: ${devisEncours?.quantite}
            Montant: ${prix.prixTotal.toLocaleString()} Ar`;

        const textileItem: CartItemsType = {
            id: Date.now(),
            designation: `Textile - ${textileType?.nom || devisEncours?.type}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prix.prixUnitaire,
            quantite: Number(devisEncours?.quantite) || 1,
            remise: 0.00,
            service: 'Textiles',
        };

        handleAddCart(textileItem, {
            ...devisEncours,
            montant: String(prix.prixTotal)
        });

        // Réinitialisation
        resetForm();
    };

    // ========== RÉINITIALISATION ==========
    const resetForm = () => {
        setSelectedTextileType('');
        setActiveTab('type');
        setDevisEncours({
            client_id: devisEncours?.client_id || 0,
            type: '',
            taille: '',
            taille_id: 0,
            grammage: '',
            grammage_id: 0,
            dimension: '',
            dimension_id: 0,
            emplacement: '',
            emplacement_id: 0,
            technologie: '',
            technologie_id: 0,
            couleur: '',
            couleur_id: 0,
            montant: '',
            quantite: 1,
            particularite: '',
        } as devisData);
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
    };

    // ========== MAPPING DES PRODUITS ==========
    const textileProducts: Record<string, typeof tshirt> = {
        tshirt,
        polo,
        sweat,
        gilet,
        casquette,
        nappe,
        bob,
        maillot,
        combinaison,
        totebag,
        trousse
    };

    // ========== RENDU ==========
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                {textilesLoading ? (
                    <CardTitle className="flex text-slate-700 animate-pulse items-center gap-2 text-lg font-semibold">
                        <Shirt className="h-6 w-6 text-red-500" />
                        Préparation...
                    </CardTitle>
                ) : (
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Shirt className="h-6 w-6 text-red-500" />
                        Textiles
                    </CardTitle>
                )}
            </CardHeader>

            <CardContent>
                {/* Barre de Navigation Sticky */}
                <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 pt-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap h-auto w-full justify-start gap-1 bg-transparent p-0">
                            <TabsTrigger value="type" className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                <Layers className="h-3 w-3 mr-1" /> Type
                            </TabsTrigger>
                            <TabsTrigger value="taille" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Taille
                            </TabsTrigger>
                            <TabsTrigger value="grammage" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Grammage
                            </TabsTrigger>
                            <TabsTrigger value="dimension" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Dimension Imp.
                            </TabsTrigger>
                            <TabsTrigger value="emplacement" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Emplacement
                            </TabsTrigger>
                            <TabsTrigger value="technologie" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Technologie
                            </TabsTrigger>
                            <TabsTrigger value="couleur" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Couleur
                            </TabsTrigger>
                            <TabsTrigger value="quantite" disabled={!selectedTextileType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Quantité
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-1">
                        {textilesLoading ? (
                            <CatalogSkeleton />
                        ) : (
                            <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2 scroll-smooth">
                                
                                {/* Section Choix du Type (Toujours visible) */}
                                <div id="type-section" className="scroll-mt-24">
                                    <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="w-5 h-5 mr-2" />
                                        Type de Produit
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {itemData.types.map(type => (
                                            <Button
                                                key={type.id}
                                                title={type.nom}
                                                onClick={() => {
                                                    setSelectedTextileType(type.type);
                                                    setActiveTab('taille');
                                                }}
                                                variant={selectedTextileType === type.type ? "default" : "outline"}
                                                className={`h-auto py-3 px-4 justify-center transition-all ${
                                                    selectedTextileType === type.type 
                                                        ? 'bg-red-600 hover:bg-red-700 border-red-600 text-white' 
                                                        : 'hover:border-red-500 dark:bg-slate-600 dark:text-white'
                                                }`}
                                            >
                                                {type.nom}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rendu du composant enfant réutilisable */}
                                {selectedTextileType && textileProducts[selectedTextileType] && (
                                    <TextileProductComponent
                                        item={textileProducts[selectedTextileType]}
                                        userRole={String(userRole)}
                                        getDevis={getDevis}
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Panel OptionOverview (Fixe à droite) */}
                    <OptionOverview
                        userRole={userRole}
                        prixUnitaireReel={prix.prixUnitaire}
                        prixTotalReel={prix.prixTotal}
                        handleAddToCart={handleAddToCart}
                        devisTextile={devisEncours as devisData}
                    />
                </div>
            </CardContent>
        </Card>
    );
}