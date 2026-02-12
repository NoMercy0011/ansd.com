"use client";

import { Layers } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { devisData } from '@/types/type';
import { Input } from '@/components/ui/input';
import type { TextileProduct } from '@/hooks/use-textile';

type TextileProductComponentProps = {
    item: TextileProduct;
    userRole: string;
    getDevis: (devis: devisData) => void;
    getPrix: (prixTotal: number, prixUnitaire: number) => void;
    activeSection: string;
};

export default function TextileProductComponent({ 
    item, 
    getDevis, 
    getPrix, 
    activeSection 
}: TextileProductComponentProps) {
    
    // ========== ÉTAT LOCAL ==========
    const [devisEncours, setDevisEncours] = useState({
        taille_id: 0,
        taille: '',
        grammage_id: 0,
        grammage: '',
        dimension_id: 0,
        dimension: '',
        emplacement_id: 0,
        emplacement: '',
        technologie_id: 0,
        technologie: '',
        couleur_id: 0,
        couleur: '',
        quantite: 1,
        finitionPrix: 0,
        optionPrix: 0,
    });

    // État pour les champs personnalisés
    const [autreTaille, setAutreTaille] = useState({ nom: '', prix: 0 });
    const [autreGrammage, setAutreGrammage] = useState({ nom: '', prix: 0 });
    const [autreDimension, setAutreDimension] = useState({ nom: '', prix: 0 });
    const [autreEmplacement, setAutreEmplacement] = useState({ nom: '', prix: 0 });
    const [autreCouleur, setAutreCouleur] = useState({ nom: '', prix: 0 });

    // ========== RÉFÉRENCES POUR SCROLL ==========
    const tailleRef = useRef<HTMLDivElement>(null);
    const grammageRef = useRef<HTMLDivElement>(null);
    const dimensionRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const technologieRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // ========== DONNÉES LOCALES ==========
    const textileData = useMemo(() => ({
        tailles: item.tailles || [],
        grammages: item.grammages || [],
        dimensions: item.dimensions_impression || [],
        emplacements: item.emplacements || [],
        technologies: item.technologies || [],
        couleurs: item.couleurs_tissus || []
    }), [item.tailles, item.grammages, item.dimensions_impression, item.emplacements, item.technologies, item.couleurs_tissus]);

    // ========== FONCTIONS UTILITAIRES ==========
    const safeNumber = (value: string | number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    const scrollToSection = (section: string) => {
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            taille: tailleRef,
            grammage: grammageRef,
            dimension: dimensionRef,
            emplacement: emplacementRef,
            technologie: technologieRef,
            couleur: couleurRef,
            quantite: quantiteRef
        };

        if (refs[section]?.current) {
            refs[section].current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // ========== GESTION DES CHANGEMENTS ==========
    const handleOptionSelect = (name: string, value: number | string, optionData?: string) => {
        setDevisEncours(prev => ({
            ...prev,
            [name]: value,
            ...(optionData && { 
                [name.replace('_id', '')]: optionData 
            })
        }));
    };


    // ========== CALCUL DU PRIX ==========
    useEffect(() => {
        let prixTotal = 0;

        // 1. Prix de base selon la taille
        if (devisEncours.taille_id > 0 && autreTaille.prix) {
            prixTotal = safeNumber(autreTaille.prix)
        }

        // 2. Prix du grammage
        if (devisEncours.grammage_id > 0 && autreGrammage.prix) {
            
            prixTotal += safeNumber(autreGrammage.prix);
        }

        // 3. Prix de la dimension
        if (devisEncours.dimension_id > 0 && autreDimension.prix) {
            
            prixTotal += safeNumber(autreDimension.prix);
        }

        // 4. Prix de l'emplacement
        if (devisEncours.emplacement_id > 0 && autreEmplacement.prix) {
            prixTotal += safeNumber(autreEmplacement.prix);
        }

        // 5. Prix de la technologie
        // if (devisEncours.technologie_id > 0 ) {
        //     const technologie = textileData.technologies.find((t) => t.id === devisEncours.technologie_id);
        //     if (technologie?.prix) {
        //         prixTotal += safeNumber(technologie.prix);
        //     }
        // }

        // 6. Prix de la couleur
        if (devisEncours.couleur_id > 0 && autreCouleur.prix) {
            
            prixTotal += safeNumber(autreCouleur.prix);
        }

        // 7. Options supplémentaires
        prixTotal += safeNumber(devisEncours.finitionPrix);
        prixTotal += safeNumber(devisEncours.optionPrix);

        // 8. Prix unitaire
        const prixUnitaire = Math.max(0, prixTotal);

        // 9. Calcul du total avec quantité
        const quantite = safeNumber(devisEncours.quantite);
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        getPrix(prixTotalAvecQuantite, prixUnitaire);

        // Mise à jour du devis
        getDevis({
            type: item.type || '',
            textile_id: item.id || 0,
            taille_id: devisEncours.taille_id,
            taille: devisEncours.taille,
            grammage_id: devisEncours.grammage_id,
            grammage: devisEncours.grammage,
            dimension_id: devisEncours.dimension_id,
            dimension: devisEncours.dimension,
            emplacement_id: devisEncours.emplacement_id,
            emplacement: devisEncours.emplacement,
            technologie_id: devisEncours.technologie_id,
            technologie: devisEncours.technologie,
            couleur_id: devisEncours.couleur_id,
            couleur: devisEncours.couleur,
            quantite: devisEncours.quantite,
            montant: String(prixTotalAvecQuantite),
            finitionPrix: devisEncours.finitionPrix,
            optionPrix: String(devisEncours.optionPrix),
            client_id: 0,
            particularite: '',
        } as devisData);

    }, [devisEncours.taille_id,
        devisEncours.couleur_id,
        devisEncours.emplacement_id,
        devisEncours.dimension_id,
        devisEncours.grammage_id, 
        autreCouleur.prix,
        autreDimension.prix,
        autreEmplacement.prix,
        autreGrammage.prix,
        autreTaille.prix,
        getDevis, 
        getPrix, item.id, item.type, textileData]);

    // ========== SCROLL AUTOMATIQUE ==========
    useEffect(() => {
        scrollToSection(activeSection);
    }, [activeSection]);

    // ========== RENDU ==========
    return (
        <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-full space-y-1">

            {/* Tailles */}
            {textileData.tailles.length > 0 && (
            <div className='flex mb-4'>
                <div ref={tailleRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Taille
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {textileData.tailles.map((taille) => (
                            <button
                                key={taille.id}
                                onClick={() => handleOptionSelect('taille_id', taille.id, taille.taille || taille.dimension)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 truncate ${
                                    devisEncours.taille_id === taille.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{taille.taille || taille.dimension}</div>
                            </button>
                        ))}
                    </div>

                </div>
                <div className="w-full lg:w-1/2 scroll-mt-20">
                {/* Input pour taille "autres" */}
                {devisEncours.taille === 'autres' ? (
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                        <h1 className='text-sm font-bold ml-2'> Taille personnalisé</h1>
                        <div className="relative">
                            <Input
                                type="text"
                                value={autreTaille.nom}
                                onChange={(e) => setAutreTaille(prev => ({ ...prev, nom: e.target.value }))}
                                placeholder="Description de la taille personnalisé"
                            />
                        </div>
                        <div className="relative">
                            <Input
                                type="number"
                                value={autreTaille.prix || ''}
                                onChange={(e) => setAutreTaille(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                placeholder="Prix supplémentaire"
                                min="0"
                                />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                        </div>
                        </div>
                    </div>
                ) : ( devisEncours.taille &&
                <div className="mt-3 px-2">
                        <div className="space-y-3">
                        <h1 className='text-sm font-bold ml-2'> Taille : { devisEncours.taille} </h1>
                        <div className="relative">
                            <Input
                                type="number"
                                value={autreTaille.prix || ''}
                                onChange={(e) => setAutreTaille(prev => ({ ...prev, prix: Number(e.target.value) }))}
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
            )}

            {/* Grammages */}
            {textileData.grammages.length > 0 && (
            <div className='flex mb-4'>
                <div ref={grammageRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Grammage Tissu
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {textileData.grammages.map((grammage) => (
                            <button
                                key={grammage.id}
                                onClick={() => handleOptionSelect('grammage_id', grammage.id, grammage.grammage)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.grammage_id === grammage.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{grammage.grammage}</div>
                            </button>
                        ))}
                    </div>

                </div>

                <div className="w-full lg:w-1/2 scroll-mt-20">
                {/* Input pour grammage "autres" */}
                {devisEncours.grammage === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Grammage personnalisé</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreGrammage.nom}
                            onChange={(e) => setAutreGrammage(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description du grammage personnalisé"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreGrammage.prix || ''}
                            onChange={(e) => setAutreGrammage(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                    </div>
                    </div>
                </div>
                ) : ( devisEncours.grammage &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Grammage : { devisEncours.grammage} </h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreGrammage.prix || ''}
                            onChange={(e) => setAutreGrammage(prev => ({ ...prev, prix: Number(e.target.value) }))}
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
            )}

            {/* Dimensions d'impression */}
            {textileData.dimensions.length > 0 && (
            <div className='flex mb-4'>
                <div ref={dimensionRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Dimensions d&apos;Impression
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {textileData.dimensions.map((dimension) => (
                            <button
                                key={dimension.id}
                                onClick={() => handleOptionSelect('dimension_id', dimension.id, dimension.dimension)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.dimension_id === dimension.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{dimension.dimension}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 scroll-mt-20">
                {/* Input pour dimension "autres" */}
                {devisEncours.dimension === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Dimension personnalisé </h1>
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
                    <h1 className='text-sm font-bold ml-2'> Dimension : { devisEncours.dimension} </h1>
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
                )}
                </div>
            </div>
            )}

            {/* Emplacements */}
            {textileData.emplacements.length > 0 && (
            <div className='flex mb-4'>
                <div ref={emplacementRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Emplacement d&apos;Impression
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {textileData.emplacements.map((emplacement) => (
                            <button
                                key={emplacement.id}
                                onClick={() => handleOptionSelect('emplacement_id', emplacement.id, emplacement.emplacement)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.emplacement_id === emplacement.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{emplacement.emplacement}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 scroll-mt-20">
                {/* Input pour emplacement "autres" */}
                {devisEncours.emplacement === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Emplacement personnalisé </h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreEmplacement.nom}
                            onChange={(e) => setAutreEmplacement(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de l'emplacement personnalisé"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreEmplacement.prix || ''}
                            onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                    </div>
                    </div>
                </div>
                ) : ( devisEncours.emplacement &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Emplacement : { devisEncours.emplacement} </h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreEmplacement.prix || ''}
                            onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: Number(e.target.value) }))}
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
            )}

            {/* Technologie */}
            {textileData.technologies.length > 0 && (
            <div className='flex mb-4'>
                <div ref={technologieRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Technologie d&apos;Impression
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {textileData.technologies.map((technologie) => (
                            <button
                                key={technologie.id}
                                onClick={() => handleOptionSelect('technologie_id', technologie.id, technologie.technologie)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.technologie_id === technologie.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{technologie.technologie}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            )}

            {/* Couleurs */}
            {textileData.couleurs.length > 0 && (
            <div className='flex mb-4'>
                <div ref={couleurRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Couleur du Tissu
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {textileData.couleurs.map((couleur) => (
                            <button
                                key={couleur.id}
                                onClick={() => handleOptionSelect('couleur_id', couleur.id, couleur.couleur)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.couleur_id === couleur.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{couleur.couleur}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-1/2 scroll-mt-20">
                {/* Input pour couleur "autres" */}
                {devisEncours.couleur === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Couleur personnalisé </h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreCouleur.nom}
                            onChange={(e) => setAutreCouleur(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de la couleur personnalisé"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreCouleur.prix || ''}
                            onChange={(e) => setAutreCouleur(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                    </div>
                    </div>
                </div>
                ) : ( devisEncours.couleur &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'> Couleur : { devisEncours.couleur} </h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreCouleur.prix || ''}
                            onChange={(e) => setAutreCouleur(prev => ({ ...prev, prix: Number(e.target.value) }))}
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
            )}

            {/* Quantité */}
            <div ref={quantiteRef} className="scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Quantité
                </h4>
                <Input 
                    type="number" 
                    value={devisEncours.quantite.toString()} 
                    onChange={e => handleOptionSelect('quantite', Math.max(1, safeNumber(e.target.value)))} 
                    placeholder="Ex: 1" 
                    min="1"
                    className="dark:bg-slate-700"
                />
            </div>

            </div>
        </div>
    );
}