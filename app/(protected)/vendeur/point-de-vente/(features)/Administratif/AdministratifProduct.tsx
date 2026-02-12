"use client";

import { Layers } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { devisData } from '@/types/type';
import { Input } from '@/components/ui/input';
import { AdminsProduct } from '@/hooks/use-administratif';

type EventProductComponentProps = {
    item: AdminsProduct;
    userRole: string;
    getDevis: (devis: devisData) => void;
    getPrix: (prixTotal: number, prixUnitaire: number) => void;
    activeSection: string;
};

export default function AdministratifProduct({ 
    item, 
    getDevis, 
    getPrix, 
    activeSection 
}: EventProductComponentProps) {
    
    // ========== ÉTAT LOCAL ==========
    const [devisEncours, setDevisEncours] = useState({
        taille_id: 0,
        taille: '',
        matiere_id: 0,
        matiere: '',
        dimension_id: 0,
        dimension: '',
        emplacement_id: 0,
        emplacement: '',
        finition_id: 0,
        finition: '',
        technologie_id: 0,
        technologie: '',
        couleur_id: 0,
        couleur: '',
        face_id: 0,
        face: '',
        quantite: 1,
        finitionPrix: 0,
        optionPrix: 0,
        particularite_id: 0,
        particularite: '',
        souche_id: 0,
        souches: 0,
        pages: 0,
        couverture: '',
        couverture_id: 0,
    });

    // État pour les champs personnalisés
    const [autreTaille, setAutreTaille] = useState({ nom: '', prix: 0 });
    const [autreMatiere, setAutreMatiere] = useState({ nom: '', prix: 0 });
    const [autreCouverture, setAutreCouverture] = useState({ nom: '', prix: 0 });
    const [autreFinition, setAutreFinition] = useState({ nom: '', prix: 0 });
    const [autreCouleur, setAutreCouleur] = useState({ nom: '', prix: 0 });

    // ========== RÉFÉRENCES POUR SCROLL ==========
    const tailleRef = useRef<HTMLDivElement>(null);
    const souchesRef = useRef<HTMLDivElement>(null);
    const pagesRef = useRef<HTMLDivElement>(null);
    const finitionRef = useRef<HTMLDivElement>(null);
    const technologieRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const couvertureRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // ========== DONNÉES LOCALES ==========
    const eventData = useMemo(() => ({
        tailles: item.tailles || [],
        souches: item.souches || [],
        couleurs: item.couleurs || [],
        couvertures: item.couvertures || [],
        finitions: item.finitions || [],
        technologies: item.technologies || [],
    }), [item.tailles, item.souches, item.couvertures, item.finitions, item.technologies, item.couleurs]);

    // ========== FONCTIONS UTILITAIRES ==========
    const safeNumber = (value: string | number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    const scrollToSection = (section: string) => {
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            dimension: tailleRef,
            souches: souchesRef,
            couleur: couleurRef,
            pages: pagesRef,
            couverture: couvertureRef,
            finition: finitionRef,
            technologie: technologieRef,
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
            prixTotal = safeNumber(autreTaille.prix);
        }

        // 2. Prix de la matière
        if (devisEncours.matiere_id > 0 && autreMatiere.prix) {
            prixTotal += safeNumber(autreMatiere.prix);
        }

        // 3. Prix de la dimension
        // if (devisEncours.dimension_id > 0 && autreDimension.prix) {
        //     prixTotal += safeNumber(autreDimension.prix);
        // }

        // 4. Prix de l'emplacement
        if (devisEncours.couverture_id > 0 && autreCouverture.prix) {
            prixTotal += safeNumber(autreCouverture.prix);
        }

        // 5. Prix de la finition
        if (devisEncours.finition_id > 0 && autreFinition.prix) {
            prixTotal += safeNumber(autreFinition.prix);
        }

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
            grammage_id: devisEncours.matiere_id,
            grammage: devisEncours.matiere,
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
            particularite: `Finition: ${devisEncours.finition}, Face: ${devisEncours.face}`,
        } as devisData);

    }, [devisEncours.taille_id,
        devisEncours.couleur_id,
        devisEncours.emplacement_id,
        devisEncours.dimension_id,
        devisEncours.matiere_id,
        devisEncours.finition_id,
        autreCouleur.prix,
        autreCouverture.prix,
        autreMatiere.prix,
        autreTaille.prix,
        autreFinition.prix,
        getDevis, 
        getPrix, item.id, item.type, eventData]);

    // ========== SCROLL AUTOMATIQUE ==========
    useEffect(() => {
        scrollToSection(activeSection);
    }, [activeSection]);

    // ========== RENDU ==========
    return (
        <div className="flex flex-col lg:flex-row gap-3">
            <div className="w-full lg:w-full space-y-1">

            {/* Tailles */}
            {eventData.tailles.length > 0 && (
            <div className='flex mb-4'>
                <div ref={tailleRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Taille
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.tailles.map((taille) => (
                            <button
                                key={taille.id}
                                onClick={() => handleOptionSelect('taille_id', taille.id, taille.taille || taille.taille)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 truncate ${
                                    devisEncours.taille_id === taille.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{taille.taille || taille.taille}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 scroll-mt-20">
                {devisEncours.taille === 'autres' ? (
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                        <h1 className='text-sm font-bold ml-2'>Taille personnalisée</h1>
                        <div className="relative">
                            <Input
                                type="text"
                                value={autreTaille.nom}
                                onChange={(e) => setAutreTaille(prev => ({ ...prev, nom: e.target.value }))}
                                placeholder="Description de la taille"
                            />
                        </div>
                        <div className="relative">
                            <Input
                                type="number"
                                value={autreTaille.prix || ''}
                                onChange={(e) => setAutreTaille(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                placeholder="Prix"
                                min="0"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                        </div>
                        </div>
                    </div>
                ) : (devisEncours.taille &&
                <div className="mt-3 px-2">
                        <div className="space-y-3">
                        <h1 className='text-sm font-bold ml-2'>Taille : {devisEncours.taille}</h1>
                        <div className="relative">
                            <Input
                                type="number"
                                value={autreTaille.prix || ''}
                                onChange={(e) => setAutreTaille(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                placeholder="Prix supplémentaire"
                                min="0"
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                        </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
            )}

            {/* Souches */}
            {eventData.souches.length > 0 && (
            <div className='flex mb-4'>
                <div ref={souchesRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Matière
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.souches.map((souche) => (
                            <button
                                key={souche.id}
                                onClick={() => handleOptionSelect('souche_id', souche.id, souche.souches)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.souche_id === souche.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{souche.souches}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 scroll-mt-20">
                {devisEncours.matiere === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Matière personnalisée</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreMatiere.nom}
                            onChange={(e) => setAutreMatiere(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de la matière"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreMatiere.prix || ''}
                            onChange={(e) => setAutreMatiere(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                ) : (devisEncours.matiere &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Matière : {devisEncours.matiere}</h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreMatiere.prix || ''}
                            onChange={(e) => setAutreMatiere(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                )}
                </div>
            </div>
            )}

            {/* Couleurs */}
            {eventData.couleurs.length > 0 && (
            <div className='flex mb-4'>
                <div ref={couleurRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Couleur
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.couleurs.map((couleur) => (
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
                {devisEncours.couleur === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Couleur personnalisée</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreCouleur.nom}
                            onChange={(e) => setAutreCouleur(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de la couleur"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreCouleur.prix || ''}
                            onChange={(e) => setAutreCouleur(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                ) : (devisEncours.couleur &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Couleur : {devisEncours.couleur}</h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreCouleur.prix || ''}
                            onChange={(e) => setAutreCouleur(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                )}
                </div>
            </div>
            )}

            {/* Pages */}
            <div className='flex mb-4'>
                <div ref={pagesRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Pages
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        <Input
                            type="number"
                            value={devisEncours.pages || ''}
                            onChange={(e) => setDevisEncours(prev => ({ ...prev, pages: Number(e.target.value) }))}
                            placeholder="nombres de pages"
                            min="0"
                        />
                    </div>
                </div>
            </div>

            {/* Couvertures */}
            {eventData.couvertures.length > 0 && (
            <div className='flex mb-4'>
            <div ref={couvertureRef} className="scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    COuvertures
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {eventData.couvertures.map((couverture) => (
                        <button
                            key={couverture.id}
                            onClick={() => handleOptionSelect('couverture_id', couverture.id, couverture.couverture)}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.couverture_id === couverture.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold">{couverture.couverture}</div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-1/2 scroll-mt-20">
                {devisEncours.couverture === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Couverture personnalisée</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreCouverture.nom}
                            onChange={(e) => setAutreCouverture(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de la couverture"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreCouverture.prix || ''}
                            onChange={(e) => setAutreCouverture(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                ) : (devisEncours.finition &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Couverture : {devisEncours.couverture}</h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreCouverture.prix || ''}
                            onChange={(e) => setAutreCouverture(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                )}
                </div>
            </div>
            )}

            {/* Finitions */}
            {eventData.finitions.length > 0 && (
            <div className='flex mb-4'>
                <div ref={finitionRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Finition
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.finitions.map((finition) => (
                            <button
                                key={finition.id}
                                onClick={() => handleOptionSelect('finition_id', finition.id, finition.finition)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.finition_id === finition.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{finition.finition}</div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 scroll-mt-20">
                {devisEncours.finition === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Finition personnalisée</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreFinition.nom}
                            onChange={(e) => setAutreFinition(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de la finition"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreFinition.prix || ''}
                            onChange={(e) => setAutreFinition(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                ) : (devisEncours.finition &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Finition : {devisEncours.finition}</h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreFinition.prix || ''}
                            onChange={(e) => setAutreFinition(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                )}
                </div>
            </div>
            )}


            {/* Technologie */}
            {eventData.technologies.length > 0 && (
            <div ref={technologieRef} className="scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Technologie
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {eventData.technologies.map((technologie) => (
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