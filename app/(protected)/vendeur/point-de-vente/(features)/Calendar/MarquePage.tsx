"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemType } from '@/types/itemType';
import { devisData } from '@/types/type';
import { Book, Layers, Weight } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react'

type ItemProps = {
    item: itemType;
    userRole: string;
    getDevis: (devis: devisData) => void;
    getPrix: (prixTotalReel: number, prixUnitaireReel: number) => void;
    activeSection: string; // Ajout de la prop pour gérer le scroll depuis le parent
}

export default function MarquePage({ item, getDevis, getPrix, activeSection }: ItemProps) {

    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    })
    
    const [ratioState, setRatioState] = useState(1);

    // --- Refs pour le Scroll ---
    const dimensionRef = useRef<HTMLDivElement>(null);
    const materiauRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const decoupeRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const particulariteRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // --- Gestion du Scroll automatique ---
    useEffect(() => {
        const sections: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            'dimension': dimensionRef,
            'materiau': materiauRef,
            'couleur': couleurRef,
            'face': faceRef,
            'imprimante': imprimanteRef,
            'decoupe': decoupeRef,
            'emplacement': emplacementRef,
            'particularite': particulariteRef,
            'quantite': quantiteRef,
        };

        if (activeSection && sections[activeSection]?.current) {
            sections[activeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeSection]);

    // --- États pour les options personnalisées ---
    const [autreMateriau, setAutreMateriau] = useState({ nom: "", prix: 0 });
    const [ autreParticularite, setAutreParticularite] = useState({ nom: "", prix: 0 });

    const categories = [
        { id: 1, categorie: "PCB" },
        { id: 2, categorie: "PCB Pélliculé" },
        { id: 3, categorie: "autres" },
    ]

    const [devisEncours, setDevisHangtag] = useState<devisData>({
        client_id: 0,
        type: item.type,
        materiau_id: 0,
        materiau: '',
        dimension_id: 0,
        dimension: '',
        finition_id: 0,
        montant: '',
        quantite: 1,
        recto_verso_id: 0,
        recto: '',
        option_id: '',
        imprimante_id: 0,
        imprimante: '',
        particularite: '',
        categorie_id: 0,
        categorie: '',
        socle: 'invalide'
    });

    useEffect( () => {
        getDevis(devisEncours);
        getPrix(prix.prixTotal, prix.prixUnitaire); 
    }, [devisEncours, prix.prixTotal, prix.prixUnitaire]);
    // --- Logique de Calcul de Devis ---

    useEffect(() => {

        let prixUnitaire = 0;

        //1. Prix de base selon la dimension (avec ratio)
        /*const dimensionSelectionnee = item.dimensions.find(
            d => d.id === devisEncours.dimension_id
        );
        if (dimensionSelectionnee) {
            prixUnitaire /= ratioState;
        }*/

        // 2. Prix du matériau
        if (devisEncours.categorie === 'autres') {
            // Matériau personnalisé
            prixUnitaire += autreMateriau.prix;
        } else {
            const materiauSelectionne = item.matieres!.find(
                m => m.id === devisEncours.materiau_id
            );
            if (materiauSelectionne) {
                prixUnitaire += Number(materiauSelectionne.prix_unitaire) / ratioState;
            }

            // Supplément selon la catégorie (PCB, PCB Pelliculé)
            const categorieSelectionnee = categories.find(
                c => c.id === devisEncours.categorie_id
            );
            if (categorieSelectionnee) {
                // Appliquer un coefficient selon la catégorie
                if (devisEncours.categorie === 'PCB Pélliculé') {
                    prixUnitaire += 600 / ratioState; // +600 Ar de supplément pour pelliculé
                }
            }
        }

        // 3. Prix de la face (recto/verso)
        const faceSelectionnee = item.faces!.find(
            f => f.id === devisEncours.recto_verso_id
        );
        if (faceSelectionnee) {
            prixUnitaire *= Number(faceSelectionnee.code);
        }

            // 5. Prix des particularités
        if (autreParticularite.prix > 0) {
            prixUnitaire += autreParticularite.prix;
        }
        // 6. Application des paliers de quantité
        const quantite = devisEncours.quantite || 1;
        const coefficientQuantite = 1;
        
        // if (quantite >= 10000) {
        //     coefficientQuantite = 0.70; // 30% de réduction
        // } else if (quantite >= 5000) {
        //     coefficientQuantite = 0.75; // 25% de réduction
        // } else if (quantite >= 2000) {
        //     coefficientQuantite = 0.80; // 20% de réduction
        // } else if (quantite >= 1000) {
        //     coefficientQuantite = 0.85; // 15% de réduction
        // } else if (quantite >= 500) {
        //     coefficientQuantite = 0.90; // 10% de réduction
        // } else if (quantite >= 200) {
        //     coefficientQuantite = 0.95; // 5% de réduction
        // }

        const prixUnitaireFinal = prixUnitaire * coefficientQuantite;
        const prixTotalFinal = prixUnitaireFinal * quantite;

        // Mise à jour de l'état
        setPrix({
            prixUnitaire: Math.round(prixUnitaireFinal),
            prixTotal: Math.round(prixTotalFinal)
        });

    },[
        devisEncours.dimension_id,
        devisEncours.dimension,
        devisEncours.categorie_id,
        devisEncours.categorie,
        devisEncours.materiau_id,
        devisEncours.couleur_id,
        devisEncours.recto_verso_id,
        devisEncours.imprimante_id,
        devisEncours.decoupe,
        devisEncours.emplacement,
        devisEncours.particularite,
        devisEncours.quantite,
        autreMateriau.prix,
        autreParticularite.prix,
    ]);

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisHangtag(prevState => ({
            ...prevState,
            type: item.type,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="w-full lg:w-full space-y-1">
                    
                    {/* Section Dimension */}
                    <div className='flex mb-4'>
                        <div ref={dimensionRef} className="w-full lg:w-1/2 scroll-mt-20">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                <Layers className="mr-2" />
                                Dimension
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {item.dimensions!.map(dimension => (
                                    <button
                                        key={dimension.id}
                                        onClick={() => {
                                            handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension);
                                            setRatioState(dimension.ratio);
                                        }}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <div className="font-semibold">{dimension.dimension}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section Materiaux */}
                    <div className='flex mb-4'>
                        <div ref={materiauRef} className="w-full lg:w-1/2 scroll-mt-20">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                <Layers className="mr-2" />
                                Matériaux
                            </h4>
                            <div>
                                <div className='flex ml-5 mb-4 text-gray-800 font-semibold'>
                                    <Book size={22} className='mr-2' />
                                    Type de papier
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                                    {categories.map(categorie => (
                                        <Button key={categorie.id}
                                            variant='ghost'
                                            onClick={() => {
                                                handleSelect(categorie.id, "categorie_id", 'categorie', categorie.categorie);
                                                handleSelect(0, "materiau_id", "materiau", ""); // Reset materiau selection
                                            }}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 
                                                ${devisEncours.categorie_id === categorie.id ? 'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' :
                                                    'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            {categorie.categorie}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            {devisEncours.categorie &&
                                <div className={`${devisEncours.categorie === 'autres' ? 'hidden' : ''} `}>
                                    <div className='flex ml-5 mb-4 text-gray-800 font-semibold'>
                                        <Weight size={22} className='mr-2' />
                                        Grammage
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {item.matieres!.map(materiau => (
                                            <button
                                                key={materiau.id}
                                                onClick={() => {
                                                    handleSelect(materiau.id, 'materiau_id', 'materiau', `${devisEncours.categorie}-${materiau.taille}`.trim());
                                                }}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 
                                                    ${devisEncours.materiau_id === materiau.id ?
                                                        'bg-red-600 text-white border-red-600 shadow-md' :
                                                        'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}
                                                    ${devisEncours.categorie === 'PCB Pélliculé' && materiau.taille === '700G' ? "hidden" : ''}
                                                    `}
                                            >
                                                <div className="text-xs">{materiau.taille ? materiau.taille : ''}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>}
                        </div>
                        <div className="w-full lg:w-1/2 scroll-mt-20 mt-10">
                            {/* Input pour matériau "autres" */}
                            {devisEncours.categorie === 'autres' && (
                                <div className="mt-2 px-2">
                                    <div className="space-y-3">
                                        <h1 className='text-sm font-bold ml-2'> Matériau personnalisé</h1>
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                value={autreMateriau.nom}
                                                onChange={(e) => setAutreMateriau(prev => ({ ...prev, nom: e.target.value }))}
                                                placeholder="Description du matériau personnalisé"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={autreMateriau.prix || ''}
                                                onChange={(e) => setAutreMateriau(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                                placeholder="Prix supplémentaire"
                                                min="0"
                                            />
                                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section Face */}
                    <div className='flex mb-4'>
                        <div ref={faceRef} className="w-full lg:w-1/2 scroll-mt-20">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                <Layers className="mr-2" />
                                Face
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {item.faces!.map(face => (
                                    <button
                                        key={face.id}
                                        onClick={() => handleSelect(face.id, 'recto_verso_id', 'recto', face.face)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.recto_verso_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <span>{face.face}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section Imprimante */}
                    <div className='flex mb-4'>
                        <div ref={imprimanteRef} className="w-full lg:w-1/2 scroll-mt-20">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                <Layers className="mr-2" />
                                Technologie d&apos;impression
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {item.imprimantes!.map(imprimante => (
                                    <button
                                        key={imprimante.id}
                                        onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <div className="font-semibold">{imprimante.imprimante}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Section Particularités */}
                    <div className='flex'>
                        <div ref={particulariteRef} className="w-full lg:w-1/2 scroll-mt-20">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                <Layers className="mr-2" />
                                Particularités
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {item.particularites!.map((part) => (
                                    <button
                                        key={part.id}
                                        title={part.particularite}
                                        onClick={() => handleSelect(part.particularite, 'particularite')}
                                        className={`truncate p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.particularite === part.particularite ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <span>{part.particularite}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 scroll-mt-20">
                        {/* Input pour particularite "personnalisé" */}
                        {devisEncours.particularite === 'autres' && (
                        <div className="mt-3 px-2">
                            <div className="space-y-3">
                                <h1 className='text-sm font-bold ml-2'> Patricularité personnalisé</h1>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={autreParticularite.nom}
                                        onChange={(e) => setAutreParticularite(prev => ({ ...prev, nom: e.target.value }))}
                                        placeholder="Description de la particularite personnalisé"
                                    />
                                </div>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={autreParticularite.prix || ''}
                                        onChange={(e) => setAutreParticularite(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                        placeholder="Prix supplémentaire"
                                        min="0"
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                                </div>
                            </div>
                        </div>
                        )}
                        </div>
                    </div>

                    {/* Section Quantité */}
                    <div className='flex mb-4'>
                        <div ref={quantiteRef} className="w-full lg:w-1/2 scroll-mt-20">
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                <Layers className="mr-2" />
                                Quantité
                            </h4>
                            <Input
                                type="number"
                                value={devisEncours.quantite?.toString()}
                                onChange={e => handleSelect(Math.max(1, Number(e.target.value)), 'quantite')}
                                placeholder="Ex: 100"
                                min="1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}