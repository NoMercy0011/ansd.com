"use client";

import { Layers } from 'lucide-react';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { devisData } from '@/types/type';
import { Input } from '@/components/ui/input';
import type { EventsProduct } from '@/hooks/use-event';

type EventProductComponentProps = {
    item: EventsProduct;
    userRole: string;
    getDevis: (devis: devisData) => void;
    getPrix: (prixTotal: number, prixUnitaire: number) => void;
    activeSection: string;
};

export default function PhotoProduct({ 
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
    });

    // État pour les champs personnalisés
    const [autreTaille, setAutreTaille] = useState({ nom: '', prix: 0 });
    const [autreMatiere, setAutreMatiere] = useState({ nom: '', prix: 0 });
    const [autreEmplacement, setAutreEmplacement] = useState({ nom: '', prix: 0 });
    const [autreFinition, setAutreFinition] = useState({ nom: '', prix: 0 });
    const [autreCouleur, setAutreCouleur] = useState({ nom: '', prix: 0 });

    // ========== RÉFÉRENCES POUR SCROLL ==========
    const tailleRef = useRef<HTMLDivElement>(null);
    const matiereRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const finitionRef = useRef<HTMLDivElement>(null);
    const technologieRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // ========== DONNÉES LOCALES ==========
    const eventData = useMemo(() => ({
        tailles: item.tailles || [],
        matieres: item.matieres || [],
        emplacements: item.emplacements || [],
        faces: item.faces || [],
        couleurs: item.couleurs || [],
        technologies: item.technologies || [],
        finitions: item.finitions || [],
        particularites: item.particularites || [],
    }), [item.tailles, item.matieres, item.emplacements, item.finitions, item.technologies, item.couleurs, item.faces, item.particularites]);

    // ========== FONCTIONS UTILITAIRES ==========
    const safeNumber = (value: string | number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    const scrollToSection = (section: string) => {
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            taille: tailleRef,
            matiere: matiereRef,
            emplacement: emplacementRef,
            face: faceRef,
            couleur: couleurRef,
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
        if (devisEncours.emplacement_id > 0 && autreEmplacement.prix) {
            prixTotal += safeNumber(autreEmplacement.prix);
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
        autreEmplacement.prix,
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

            {/* Matières */}
            {eventData.matieres.length > 0 && (
            <div className='flex mb-4'>
                <div ref={matiereRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Matière
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.matieres.map((matiere) => (
                            <button
                                key={matiere.id}
                                onClick={() => handleOptionSelect('matiere_id', matiere.id, matiere.matiere)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.matiere_id === matiere.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{matiere.matiere}</div>
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


            {/* Emplacements */}
            {eventData.emplacements.length > 0 && (
            <div className='flex mb-4'>
                <div ref={emplacementRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Emplacement
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.emplacements.map((emplacement) => (
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
                {devisEncours.emplacement === 'autres' ? (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Emplacement personnalisé</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreEmplacement.nom}
                            onChange={(e) => setAutreEmplacement(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Description de l'emplacement"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreEmplacement.prix || ''}
                            onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix"
                            min="0"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">| Ar</span>
                    </div>
                    </div>
                </div>
                ) : (devisEncours.emplacement &&
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                    <h1 className='text-sm font-bold ml-2'>Emplacement : {devisEncours.emplacement}</h1>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreEmplacement.prix || ''}
                            onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: Number(e.target.value) }))}
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

            {/* Faces */}
            {eventData.faces.length > 0 && (
            <div ref={faceRef} className="scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Face
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {eventData.faces.map((face) => (
                        <button
                            key={face.id}
                            onClick={() => handleOptionSelect('face_id', face.id, face.face)}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.face_id === face.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold">{face.face}</div>
                        </button>
                    ))}
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

            {/* Particularité */}
            {eventData.particularites.length > 0 && (
            <div className='flex mb-4'>
                <div ref={couleurRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Particularités
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {eventData.particularites.map((particularite) => (
                            <button
                                key={particularite.id}
                                onClick={() => handleOptionSelect('particularite_id', particularite.id, particularite.particularite)}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                    devisEncours.particularite_id === particularite.id 
                                        ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                        : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                                }`}
                            >
                                <div className="font-semibold">{particularite.particularite}</div>
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