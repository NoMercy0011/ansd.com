"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileTextIcon, Layers } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CartItemsType, devisData } from '@/types/type';
import OptionOverview from '../OptionOverview/OptionOverview';
import { GetClientID } from '@/sources/actions/admin/client.action';
import CatalogSkeleton from '../skeleton/skeleton';
import AdministratifProduct from './AdministratifProduct';
import { useAdmins } from '@/hooks/use-administratif';

// Importez les composants spécifiques si nécessaire

type CatalogueProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

export default function Administratif({ userRole, param, handleAddCart }: CatalogueProps) {
    // ========== HOOKS PERSONNALISÉS ==========
    const { carnet_facture_autocopiant, en_tete, recu, adminsLoading } = useAdmins();

    // ========== ÉTAT DU COMPOSANT ==========
    const [selectedType, setSelectedType] = useState<string>('');
    const [activeTab, setActiveTab] = useState('type');
    const [devisEncours, setDevisEncours] = useState<devisData>();
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    });

    // ========== DONNÉES STATIQUES ==========
    const itemData = {
        types: [
            { id: 1, type: 'carnet_facture_autocopiant', nom: 'Carnet-Facture Autocopiant' },
            { id: 2, type: 'en_tete', nom: 'En-Tête' },
            { id: 3, type: 'recu', nom: 'Reçu' },
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

        const textileType = itemData.types.find(t => t.type === selectedType);

        const detailsDevis = `
            Type: ${textileType?.nom || 'Non spécifié'}
            Taille: ${devisEncours?.taille || 'Non spécifié'}
            Nombres de souches: ${devisEncours?.souches || 'Non spécifié'}
            Couleur: ${devisEncours?.couleur || 'Non spécifié'}
            Pages: ${devisEncours?.pages || 'Non spécifié'}
            Couverture: ${devisEncours?.couverture || 'Non spécifié'}
            Finition: ${devisEncours?.finition || 'Non spécifié'}
            Technologie: ${devisEncours?.technologie || 'Non spécifié'}
            Quantité: ${devisEncours?.quantite}
            Montant: ${prix.prixTotal.toLocaleString()} Ar`;

        const currentItem: CartItemsType = {
            id: Date.now(),
            designation: `Document Administratif - ${textileType?.nom || devisEncours?.type}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prix.prixUnitaire,
            quantite: Number(devisEncours?.quantite) || 1,
            remise: 0.00,
            service: 'Document Administratif',
        };

        handleAddCart(currentItem, {
            ...devisEncours,
            montant: String(prix.prixTotal)
        });

        // Réinitialisation
        resetForm();
    };

    // ========== RÉINITIALISATION ==========
    const resetForm = () => {
        setSelectedType('');
        setActiveTab('type');
        setDevisEncours({
            client_id: devisEncours?.client_id || 0,
            type: '',
            taille: '',
            taille_id: 0,
            souche_id: 0,
            souches: 0,
            pages: 0,
            couverture: '',
            couverture_id: 0,
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
    const Products: Record<string, typeof carnet_facture_autocopiant> = {
        carnet_facture_autocopiant,
        en_tete,
        recu,
    };

    // ========== RENDU ==========
    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                {adminsLoading ? (
                    <CardTitle className="flex text-slate-700 animate-pulse items-center gap-2 text-lg font-semibold">
                        <FileTextIcon className="h-6 w-6 text-red-500" />
                        Préparation...
                    </CardTitle>
                ) : (
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <FileTextIcon className="h-6 w-6 text-red-500" />
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
                            <TabsTrigger value="taille" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Dimension
                            </TabsTrigger>
                            <TabsTrigger value="souches" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Souches
                            </TabsTrigger>
                            <TabsTrigger value="couleur" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Couleurs
                            </TabsTrigger>
                            <TabsTrigger value="pages" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Pages
                            </TabsTrigger>
                            <TabsTrigger value="couverture" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                               Couverture
                            </TabsTrigger>
                            <TabsTrigger value="finition" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Finition
                            </TabsTrigger>
                            <TabsTrigger value="technologie" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Technologie
                            </TabsTrigger>
                            <TabsTrigger value="quantite" disabled={!selectedType} className="data-[state=active]:bg-slate-100 data-[state=active]:dark:bg-slate-900 border-3 border-transparent data-[state=active]:border-b-red-500 text-xs px-3 py-1.5 h-auto disabled:opacity-50">
                                Quantité
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-3/4 space-y-1">
                        { adminsLoading ? (
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
                                                    setSelectedType(type.type);
                                                    setActiveTab('taille');
                                                }}
                                                variant={selectedType === type.type ? "default" : "outline"}
                                                className={`h-auto py-3 px-4 justify-center transition-all ${
                                                    selectedType === type.type 
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
                                {selectedType && Products[selectedType] && (
                                    <AdministratifProduct
                                        item={Products[selectedType]}
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