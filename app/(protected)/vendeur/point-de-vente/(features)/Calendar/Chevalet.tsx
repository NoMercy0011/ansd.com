"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemType } from '@/types/itemType';
import { devisData } from '@/types/type';
import { Book, Layers, Weight } from 'lucide-react';
import React, { useEffect, useRef, useState, useMemo } from 'react'

type ItemProps = {
    item: itemType,
    userRole: string;
    getDevis: (devis : devisData) => void;
    getPrix: (prixTotalReel : number, prixUnitaireReel: number) => void;
    activeSection: string; 
}

export default function Chevalet({item, activeSection, getDevis, getPrix} : ItemProps) {
    
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0 ,
    })
    const [ratioState, setRatioState] = useState(1);

    const [autreMateriau, setAutreMateriau] = useState({
        nom: "",
        prix: 0,
    })

    const [autreDimension, setAutreDimension] = useState({
        nom: "",
        prix: 0,
    })
    
    const [autreSocle, setAutresocle] = useState({
        nom: "",
        prix: 0,
    })

    const [ prixDimension, setPrixDimension] = useState(0);

    // Catégories de papier
    const categories = [
        { id: 1, categorie: "PCB" },
        { id: 2, categorie: "PCB Pélliculé" },
        { id: 3, categorie: "Glossy" },
        { id: 4, categorie: "autres" },
    ]

    const [devisEncours, setDevisEncours] = useState<devisData>({
        client_id: 0,
        type: item.type,
        socle_id: 0,
        socle: '',
        materiau_id: 0,
        materiau: '',
        dimension_id: 0,
        dimension: '',
        finition_id: 0,
        packaging_id: 0,
        montant: '',
        quantite: 1,
        recto_verso_id: 0,
        recto: 'invalide',
        option_id: '',
        orientation_id: 0,
        orientation: '',
        finition: '',
        option: '',
        optionPrix: '',
        finitionPrix: 0,
        decoupe: '',
        particularite: 'invalide',
        emplacement: 'invalide',
        categorie_id: 0,
        categorie: ''
    });

    // --- Refs pour le Scroll ---
    const dimensionRef = useRef<HTMLDivElement>(null);
    const materiauRef = useRef<HTMLDivElement>(null);
    const socleRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const particulariteRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // --- Gestion du Scroll automatique ---
    useEffect(() => {
        const sections: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            'dimension': dimensionRef,
            'materiau': materiauRef,
            'socle': socleRef,
            'face': faceRef,
            'imprimante': imprimanteRef,
            'particularite': particulariteRef,
            'quantite': quantiteRef,
        };

        if (activeSection && sections[activeSection]?.current) {
            sections[activeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeSection]);

    // --- Filtrage des matériaux selon dimension et catégorie ---
    const materiauxFiltres = useMemo(() => {
        if (!devisEncours.categorie || devisEncours.categorie === 'autres') {
            return [];
        }

        // Déterminer si on filtre par A3 ou A4
        let detailsFiltre = '';
        if (devisEncours.categorie !== 'autres' && (devisEncours.dimension === 'A3' || 'A4+')) {
            detailsFiltre = 'A3';
        } else if (['A4', 'A5', 'A6', 'DL', 'A7'].includes(devisEncours.dimension || '') && devisEncours.categorie !== 'autres') {
            detailsFiltre = 'A4';
        }

        if (!detailsFiltre) return [];

        if(devisEncours.categorie === 'PCB Pélliculé') {
            return item.matieres!.filter(matiere => (
                matiere.type === 'PCB' && 
                matiere.details === detailsFiltre)
            );
        }

        // Filtrer par catégorie et dimension
        return item.matieres!.filter(matiere => (
            
            matiere.type === devisEncours.categorie && 
            matiere.details === detailsFiltre)
        );
    }, [devisEncours.categorie, devisEncours.dimension, item.matieres]);

    useEffect( () => {
        getDevis(devisEncours);
        getPrix(prix.prixTotal, prix.prixUnitaire); 
    }, [devisEncours, prix.prixTotal, prix.prixUnitaire]);

    useEffect(() => {
        // --- Logique de Calcul du Prix pour Chevalet de Table ---
      
        let prixUnitaire = 0;

        if( devisEncours.dimension === 'autres') {
            prixUnitaire += autreDimension.prix;
        } else {
            prixUnitaire += prixDimension;
        }
      
        // 1. Prix du matériau
        // if (devisEncours.materiau_id === 999) {
        //     prixUnitaire += autreMateriau.prix;
        // } else {
        //     const materiauSelectionne = item.matieres!.find(
        //         m => m.id === devisEncours.materiau_id
        //     );
        //     if (materiauSelectionne) {
        //         prixUnitaire += Number(materiauSelectionne.prix_unitaire);
        //     }

        //     const categorieSelectionnee = categories.find(
        //         c => c.id === devisEncours.categorie_id
        //     );
        //     if (categorieSelectionnee) {
        //         // Appliquer un coefficient selon la catégorie
        //         if (devisEncours.categorie === 'PCB Pélliculé' &&  materiauSelectionne) {
        //             prixUnitaire += 600 / ratioState; // +600 Ar de supplément pour pelliculé
        //         }
        //     }
        // }
        // 2. Prix du socle
        if (devisEncours.recto === 'Recto - Verso') {
            prixUnitaire *= 2 ;
        }
      
        // 2. Prix du socle
        if (devisEncours.socle === 'autres') {
            prixUnitaire += autreSocle.prix;
        }
      
        // 3. Prix des particularités
        if (autreDimension.prix > 0) {
            prixUnitaire += autreDimension.prix;
        }
      
        // 4. Application des paliers de quantité
        const quantite = devisEncours.quantite || 1;
        let coefficientQuantite = 1;

        if (quantite >= 5000) {
            coefficientQuantite = 0.75; // 25% de réduction
        } else if (quantite >= 2000) {
            coefficientQuantite = 0.80; // 20% de réduction
        } else if (quantite >= 1000) {
            coefficientQuantite = 0.85; // 15% de réduction
        } else if (quantite >= 500) {
            coefficientQuantite = 0.90; // 10% de réduction
        } else if (quantite >= 100) {
            coefficientQuantite = 0.95; // 5% de réduction
        }
      
        const prixUnitaireFinal = prixUnitaire * coefficientQuantite;
        const prixTotalFinal = prixUnitaireFinal * quantite;
      
        setPrix({
            prixUnitaire: Math.round(prixUnitaireFinal),
            prixTotal: Math.round(prixTotalFinal)
        });
      
    }, [
        devisEncours.dimension_id, 
        devisEncours.materiau_id, 
        devisEncours.socle_id,
        devisEncours.recto,
        devisEncours.imprimante, 
        devisEncours.orientation_id, 
        devisEncours.quantite,
        ratioState,
        autreMateriau.prix,
        autreSocle.prix,
        autreDimension.prix,
        prixDimension,
    ]);
        
    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisEncours(prevState => ({
            ...prevState,
            type: item.type,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    return (
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
                            onClick= {() => {
                                handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension);
                                setRatioState(dimension.ratio);
                                // Réinitialiser la sélection de matériau lors du changement de dimension
                                handleSelect(0, 'materiau_id', 'materiau', '');
                            }}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                        >
                            <div className="font-semibold">{dimension.dimension}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 scroll-mt-20">
                    {/* Input pour dimension "personnalisé" */}
                    {devisEncours.dimension === 'autres' ? (
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                            <h1 className='text-sm font-bold ml-2'> Dimension personnalisé</h1>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={autreDimension.nom}
                                    onChange={(e) => setAutreDimension(prev => ({ ...prev, nom: e.target.value }))}
                                    placeholder="Description de la dimension personnalisé"
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={autreDimension.prix || ''}
                                    onChange={(e) => setAutreDimension(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                    placeholder="Prix supplémentaire"
                                    min="0"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                            </div>
                        </div>
                    </div>
                    ) : ( devisEncours.dimension &&
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                            <h1 className='text-sm font-bold ml-2'> { devisEncours.dimension} </h1>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={prixDimension || ''}
                                    onChange={(e) => setPrixDimension(Number(e.target.value))}
                                    placeholder="Prix de base"
                                    min="0"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                            </div>
                        </div>
                    </div>
                    )}
                    </div>
                </div>

                {/* Section Materiaux */}
                <div className='flex mb-4'>
                    <div ref={materiauRef} className="w-full lg:w-1/2 scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Matériaux
                        </h4>
                        
                        {/* Sélection du type de papier */}
                        <div>
                            <div className='flex ml-5 mb-4 text-gray-800 dark:text-gray-200 font-semibold'>
                                <Book size={22} className='mr-2'/>
                                Type de papier
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                                {categories.map(categorie => (
                                    <Button 
                                        key={categorie.id}
                                        variant='ghost'
                                        onClick={() => {
                                            handleSelect(categorie.id, "categorie_id", 'categorie', categorie.categorie);
                                            // Réinitialiser la sélection de matériau
                                            handleSelect(0, 'materiau_id', 'materiau', '');
                                        }}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 
                                            ${devisEncours.categorie_id === categorie.id ? 
                                            'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' : 
                                            'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        {categorie.categorie}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Sélection du grammage (si catégorie sélectionnée) */}
                        {devisEncours.categorie && devisEncours.dimension && (
                            <div className={`${devisEncours.categorie === 'autres' ? 'hidden' : ''}`}>
                                <div className='flex ml-5 mb-4 text-gray-800 dark:text-gray-200 font-semibold'>
                                    <Weight size={22} className='mr-2'/>
                                    Grammage
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {materiauxFiltres.map(matiere => (
                                        <button
                                            key={matiere.id}
                                            onClick={() => {
                                                handleSelect(matiere.id, 'materiau_id', 'materiau', `${matiere.type}-${matiere.taille}`);
                                            }}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 
                                                ${devisEncours.materiau_id === matiere.id ? 
                                                'bg-red-600 text-white border-red-600 shadow-md' : 
                                                'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <div className="font-semibold">{matiere.taille}</div>
                                        </button>
                                    ))}
                                </div>
                                {materiauxFiltres.length === 0 && devisEncours.categorie !== 'autres' && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-5">
                                        Veuillez d&apos;abord sélectionner une dimension
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Input pour materiau "autres" */}
                    <div className="w-full lg:w-1/2 scroll-mt-20 mt-10">
                        {devisEncours.categorie === 'autres' && (
                        <div className="mt-2 px-2">
                            <div className="space-y-3">
                                <h1 className='text-sm font-bold ml-2'>Matériau personnalisé</h1>
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
                                        onChange={(e) => {
                                            const prix = Number(e.target.value);
                                            setAutreMateriau(prev => ({ ...prev, prix }));
                                            handleSelect(999, 'materiau_id', 'materiau', 'autres');
                                        }}
                                        placeholder="Prix de base"
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

                {/* Section Socle */}
                <div className='flex mb-4'>
                    <div ref={socleRef} className="w-full lg:w-1/2 scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Socle
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {item.socles!.map(socle => (
                                <button
                                    title={socle.socle}
                                    key={socle.id}
                                    onClick={() => handleSelect(socle.id, 'socle_id', 'socle', socle.socle)}
                                    className={`truncate p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.socle_id === socle.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <span>{socle.socle}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 scroll-mt-20">
                        {devisEncours.socle === 'autres' && (
                        <div className="mt-3 px-2">
                            <div className="space-y-3">
                                <h1 className='text-sm font-bold ml-2'>Socle personnalisé</h1>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={autreSocle.nom}
                                        onChange={(e) => setAutresocle(prev => ({ ...prev, nom: e.target.value }))}
                                        placeholder="Description du socle personnalisé"
                                    />
                                </div>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={autreSocle.prix || ''}
                                        onChange={(e) => setAutresocle(prev => ({ ...prev, prix: Number(e.target.value) }))}
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
                <div className='flex my-4'>
                    <div ref={quantiteRef} className="w-full lg:w-1/2 scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Quantité
                        </h4>
                        <Input 
                            type="number" 
                            value={devisEncours.quantite?.toString() || ''} 
                            onChange={e => handleSelect(Math.max(1, Number(e.target.value)), 'quantite')} 
                            placeholder="Ex: 100" 
                            min="1"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}