"use client";

import { GetClientID } from '@/sources/actions/admin/client.action'
import { Button } from '@/components/ui/button'
import { CartItemsType, clientType, devisData } from '@/types/type'
import { Layers, Maximize2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from '../OptionOverview/OptionOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGrandFormat } from '@/hooks/use-fetch-item'
import Vinyl from './Vinyl'
import DosBleu from './DosBleu'
import Bache from './Bache'
import TissusDrapeau from './TissusDrapeau'
import OneWayVision from './OneWayVision'
import FilmReflechissant from './FilmReflechissant'
import PVC from './PVC'
import Plexi from './Plexi'
import CatalogSkeleton from '../skeleton/skeleton'

type CatalogueProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

export default function GrandFormat({ param, userRole, handleAddCart }: CatalogueProps) {
    
    const { bache, dos_bleu, drapeau, film_reflechissant, onewayvision, plexi, pvc, vinyl, grandFormatLoading } = useGrandFormat();

    // ========== ÉTAT DU COMPOSANT ==========
    const [selectedGrandFormatType, setSelectedGrandFormatType] = useState<string>('');
    const [activeTab, setActiveTab] = useState('type');
    const [client, setClient] = useState<clientType>();
    const [devisGrandFormat, setDevisGrandFormat] = useState<devisData>({
        client_id: 0,
        type: '',
        grand_format_id: 0,
        laize: '',
        laize_id: 0,
        face: '',
        face_id: 0,
        finition: '',
        finition_id: 0,
        particularite: '',
        particularite_id: 0,
        epaisseur: '',
        epaisseur_id: 0,
        couleur: '',
        couleur_id: 0,
        montant: '',
        quantite: 1,
        finitionPrix: 0,
        optionPrix: ''
    });
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    });

    // ========== DONNÉES STATIQUES ==========
    const itemData = {
        types: [
            { id: 1, type: 'vinyl', nom: 'Vinyl' },
            { id: 2, type: 'dos_bleu', nom: 'Dos bleu' },
            { id: 3, type: 'bache', nom: 'Bâche' },
            { id: 4, type: 'drapeau', nom: 'Tissus drapeau' },
            { id: 5, type: 'onewayvision', nom: 'Onewayvision' },
            { id: 6, type: 'film_reflechissant', nom: 'Film réfléchissant' },
            { id: 7, type: 'pvc', nom: 'PVC' },
            { id: 8, type: 'plexi', nom: 'Plexi' }
        ]
    };

    // ========== CALLBACKS POUR LES ENFANTS ==========
    const getDevis = (devis: devisData) => {
        setDevisGrandFormat(devis);
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
                    setClient(clientData);
                    setDevisGrandFormat(prev => ({ 
                        ...prev, 
                        client_id: Number(clientData?.id_client) 
                    }));
                })
                .catch(error => {
                    console.error('Erreur lors du chargement du client:', error);
                });
        }
    }, [param]);

    // ========== GESTION DE L'AJOUT AU PANIER ==========
    const handleAddToCart = () => {
        if (!devisGrandFormat.type || prix.prixTotal === 0) {
            alert('Veuillez configurer complètement le produit');
            return;
        }

        const grandFormatType = itemData.types.find(t => t.type === selectedGrandFormatType);
        
        const detailsDevis = `
            Type: ${grandFormatType?.nom || 'Non spécifié'}
            Laize: ${devisGrandFormat.laize || 'Sur mesure'}
            Face: ${devisGrandFormat.face || 'Non spécifié'}
            Finition: ${devisGrandFormat.finition || 'Non spécifié'}
            Particularité: ${devisGrandFormat.particularite || 'Aucune'}
            Épaisseur: ${devisGrandFormat.epaisseur || 'N/A'}
            Couleur: ${devisGrandFormat.couleur || 'N/A'}
            Quantité: ${devisGrandFormat.quantite}
            Montant: ${prix.prixTotal.toLocaleString()} Ar`;

        const grandFormatItem: CartItemsType = {
            id: Date.now(),
            designation: `Grand Format - ${grandFormatType?.nom || devisGrandFormat.type}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prix.prixUnitaire,
            quantite: Number(devisGrandFormat.quantite) || 1,
            remise: 0.00,
            service: 'Grand Format',
        };

        handleAddCart(grandFormatItem, {
            ...devisGrandFormat,
            montant: String(prix.prixTotal)
        });

        // Réinitialisation
        resetForm();
    };

    // ========== RÉINITIALISATION DU FORMULAIRE ==========
    const resetForm = () => {
        setSelectedGrandFormatType('');
        setActiveTab('type');
        setDevisGrandFormat({
            client_id: client?.id_client ? Number(client.id_client) : 0,
            type: '',
            grand_format_id: 0,
            laize: '',
            laize_id: 0,
            face: '',
            face_id: 0,
            finition: '',
            finition_id: 0,
            particularite: '',
            particularite_id: 0,
            epaisseur: '',
            epaisseur_id: 0,
            couleur: '',
            couleur_id: 0,
            montant: '',
            quantite: 1,
            finitionPrix: 0,
            optionPrix: ''
        });
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
    };

    // ========== RENDU ==========
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                {grandFormatLoading ? (
                    <CardTitle className="flex text-slate-700 animate-pulse items-center gap-2 text-lg font-semibold">
                        <Maximize2 className="h-6 w-6 text-red-500" />
                        Préparation...
                    </CardTitle>
                ) : (
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <Maximize2 className="h-6 w-6 text-red-500" />
                        Grand Format & PVC
                    </CardTitle>
                )}
            </CardHeader>

            <CardContent>
                {/* Barre de Navigation Sticky */}
                <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 pt-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap h-auto w-full justify-start gap-1 bg-transparent p-0">
                            <TabsTrigger 
                                value="type" 
                                className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto"
                            >
                                <Layers className="h-3 w-3 mr-1" /> Type
                            </TabsTrigger>
                            <TabsTrigger value="longueur" className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Longueur
                            </TabsTrigger>
                            <TabsTrigger value="laize" disabled={!selectedGrandFormatType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Laize
                            </TabsTrigger>
                            <TabsTrigger value="face" disabled={!selectedGrandFormatType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Face
                            </TabsTrigger>
                            <TabsTrigger value="finition" disabled={!selectedGrandFormatType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Finition
                            </TabsTrigger>
                            <TabsTrigger value="particularite" disabled={!selectedGrandFormatType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900  border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto">
                                Particularité
                            </TabsTrigger>
                            <TabsTrigger 
                                value="quantite" 
                                disabled={!selectedGrandFormatType}
                                className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50"
                            >
                                Quantité
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-1">
                        {grandFormatLoading ? (
                            <CatalogSkeleton />
                        ) : (
                            <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2 scroll-smooth">
                                
                                {/* Section Choix du Type (Toujours visible) */}
                                <div id="type-section" className="scroll-mt-24">
                                    <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="w-5 h-5 mr-2" />
                                        Type de Produit
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {itemData.types.map(type => (
                                            <Button
                                                key={type.id}
                                                title={type.nom}
                                                onClick={() => {
                                                    setSelectedGrandFormatType(type.type);
                                                    setActiveTab('configuration');
                                                }}
                                                variant={selectedGrandFormatType === type.type ? "default" : "outline"}
                                                className={`h-auto py-3 px-4 justify-center transition-all ${
                                                    selectedGrandFormatType === type.type 
                                                        ? 'bg-red-600 hover:bg-red-700 border-red-600 text-white' 
                                                        : 'hover:border-red-500 dark:bg-slate-600 dark:text-white'
                                                }`}
                                            >
                                                {type.nom}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rendu Conditionnel des Sous-composants */}
                                {selectedGrandFormatType === 'vinyl' && (
                                    <Vinyl 
                                        item={vinyl} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'dos_bleu' && (
                                    <DosBleu 
                                        item={dos_bleu} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'bache' && (
                                    <Bache 
                                        item={bache} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'drapeau' && (
                                    <TissusDrapeau 
                                        item={drapeau} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'onewayvision' && (
                                    <OneWayVision 
                                        item={onewayvision} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'film_reflechissant' && (
                                    <FilmReflechissant 
                                        item={film_reflechissant} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'pvc' && (
                                    <PVC 
                                        item={pvc} 
                                        userRole={String(userRole)} 
                                        getDevis={getDevis} 
                                        getPrix={getPrix}
                                        activeSection={activeTab}
                                    />
                                )}
                                {selectedGrandFormatType === 'plexi' && (
                                    <Plexi 
                                        item={plexi} 
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
                        devisGrandFormat={devisGrandFormat}
                    />
                </div>
            </CardContent>
        </Card>
    );
}