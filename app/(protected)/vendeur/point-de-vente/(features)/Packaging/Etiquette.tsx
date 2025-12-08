import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemType } from '@/types/packaging/packagingType'
import { devisData } from '@/types/type';
import { Layers } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

type EtiquetteProps = {
    etiquette: itemType,
    userRole: string;
    getDevis: (devis : devisData) => void;
    getPrix: (prixTotalReel : number, prixUnitaireReel: number) => void;
    activeSection: string; 
}

export default function Etiquette({etiquette, activeSection, getDevis, getPrix} : EtiquetteProps) {
    
    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0 ,
    })
    //const [activeTab, setActiveTab] = useState('type');
    const [ratioState, setRatioState] = useState(1);

    const [autreMateriau, setAutreMateriau] = useState({
        nom: "",
        prix: 0,
    })

    const [autreDecoupe, setAutreDecoupe] = useState({
        nom: "",
        prix: 0,
    })
    const [autreCouleur, setAutreCouleur] = useState({
        nom: "",
        prix: 0,
    })
    const [autreFinition, setAutreFinition] = useState({
        nom: "",
        prix: 0,
    })

    const [devisEncours, setDevisEncours] = useState<devisData>({
        client_id: 0,
        type: etiquette.type,
        couleur_id: 0,
        couleur: '',
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
        imprimante_id: 0,
        imprimante: '',
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

    useEffect( () => {
        getDevis(devisEncours);
        // Le prix est mis à jour dans l'autre useEffect
        getPrix(prix.prixTotal, prix.prixUnitaire); 
    }, [devisEncours, prix.prixTotal, prix.prixUnitaire]);

useEffect(() => {
    // --- Logique de Calcul du Prix pour Etiquette ---
    
    // Vérification des sélections obligatoires
    /*if (!devisEncours.dimension_id || 
        !devisEncours.materiau_id || 
        !devisEncours.couleur_id || 
        !devisEncours.imprimante_id) {
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
        return;
    }*/

    let prixUnitaire = 0;
    
    // 1. Prix de base selon la dimension (avec ratio)
    // const dimensionSelectionnee = etiquette.dimensions.find(
    //     d => d.id === devisEncours.dimension_id
    // );
    // if (dimensionSelectionnee) {
    //     prixUnitaire += dimensionSelectionnee.prix * ratioState;
    // }

    // 2. Prix du matériau
    if (devisEncours.materiau_id === 999) {
        // Matériau personnalisé
        prixUnitaire += autreMateriau.prix;
    } else {
        const materiauSelectionne = etiquette.matieres.find(
            m => m.id === devisEncours.materiau_id
        );
        if (materiauSelectionne) {
            prixUnitaire += Number(materiauSelectionne.prix_unitaire);
        }
    }

    // 3. Prix de la couleur
    if (devisEncours.couleur === 'autres') {
        // Couleur personnalisée
        prixUnitaire += autreCouleur.prix;
     } 
    //else {
    //     const couleurSelectionnee = etiquette.couleurs.find(
    //         c => c.id === devisEncours.couleur_id
    //     );
    //     if (couleurSelectionnee) {
    //         prixUnitaire += couleurSelectionnee.prix;
    //     }
    // }

    // 4. Prix de l'imprimante/technologie
    // const imprimanteSelectionnee = etiquette.imprimantes.find(
    //     i => i.id === devisEncours.imprimante_id
    // );
    // if (imprimanteSelectionnee) {
    //     prixUnitaire += imprimanteSelectionnee.prix;
    // }

    // 5. Prix de la découpe
    if (devisEncours.decoupe) {
        if (devisEncours.decoupe === 'personnalisée') {
            prixUnitaire += autreDecoupe.prix;
        } else {
            const decoupeSelectionnee = etiquette.decoupes.find(
                d => d.decoupe === devisEncours.decoupe
            );
            if (decoupeSelectionnee) {
                prixUnitaire += Number(decoupeSelectionnee.prix) || 0;
            }
        }
    }

    // 6. Prix de la finition
    if (devisEncours.finition) {
        if (devisEncours.finition === 'autres') {
            prixUnitaire += autreFinition.prix;
        } 
        // else {
        //     const finitionSelectionnee = etiquette.finitions.find(
        //         f => f.finition === devisEncours.finition
        //     );
        //     if (finitionSelectionnee) {
        //         prixUnitaire += finitionSelectionnee.prix || 0;
        //     }
        // }
    }

    // 7. Application des paliers de quantité (remise par volume)
    const quantite = devisEncours.quantite || 1;
    let coefficientQuantite = 1;
    
    if (quantite >= 10000) {
        coefficientQuantite = 0.75; // 25% de réduction
    } else if (quantite >= 5000) {
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

    // Mise à jour de l'état
    setPrix({
        prixUnitaire: Math.round(prixUnitaireFinal),
        prixTotal: Math.round(prixTotalFinal)
    });

}, [
    devisEncours.dimension_id, 
    devisEncours.materiau_id, 
    devisEncours.couleur_id, 
    devisEncours.imprimante_id, 
    devisEncours.decoupe, 
    devisEncours.finition,
    devisEncours.quantite,
    ratioState,
    autreMateriau.prix,
    autreDecoupe.prix,
    autreCouleur.prix,
    autreFinition.prix,
]);
        
    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisEncours(prevState => ({
            ...prevState,
            type: etiquette.type,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // ... Reste du composant (JSX) inchangé ...
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
                            {etiquette.dimensions.map(dimension => (
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {etiquette.matieres.map(matiere => (
                                <button
                                    key={matiere.id}
                                    onClick={() => {
                                        handleSelect(matiere.id, 'materiau_id', 'materiau', matiere.type );
                                    }}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.materiau_id === matiere.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <div className="font-semibold truncate">{matiere.type}</div>
                                </button>
                            ))}
                            <button
                                    
                                onClick={() => {
                                    handleSelect(999, 'materiau_id', 'materiau', 'autres' );
                                    }}
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.materiau_id === 999 ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                            >
                                <div className="font-semibold truncate"> autres </div>
                            </button>
                        </div>
                    </div>

                    {/* Input pour materiau "autres" */}
                    {devisEncours.materiau === 'autres' && (
                    <div className="mt-3 px-2 w-full lg:w-1/2 scroll-mt-20">
                        <div className="space-y-3">
                            <h1 className='text-sm font-bold ml-2'> Autres materiaux</h1>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={autreMateriau.nom}
                                    onChange={(e) => setAutreMateriau(prev => ({ ...prev, nom: e.target.value }))}
                                    placeholder="Description du materiau personnalisé"
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={autreMateriau.prix || ''}
                                    onChange={(e) => setAutreMateriau(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                    placeholder="Prix de base"
                                    min="0"
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                            </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* Section Couleur */}
                <div className='flex  mb-4'>
                <div ref={couleurRef} className="w-full lg:w-1/2 scroll-mt-20">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                        <Layers className="mr-2" />
                        Couleur
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {etiquette.couleurs.map(couleur => (
                            <button
                                title={couleur.couleur}
                                key={couleur.id}
                                onClick={() => handleSelect(couleur.id, 'couleur_id', 'couleur', couleur.couleur)}
                                className={`truncate p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.couleur_id === couleur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                            >
                                <span>{couleur.couleur}</span>
                            </button>
                        ))}
                        </div>
                </div>
                <div className="w-full lg:w-1/2 scroll-mt-20">
                    {/* Input pour couleur "personnalisé" */}
                    {devisEncours.couleur === 'autres' && (
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                            <h1 className='text-sm font-bold ml-2'> Couleur personnalisé</h1>
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
                    )}
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
                            {etiquette.imprimantes.map(imprimante => (
                                <Button
                                    key={imprimante.id}
                                    variant='ghost'
                                    onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <div className="font-semibold">{imprimante.imprimante}</div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Decoupe */}
                <div className='flex mb-4'>
                    <div ref={decoupeRef} className="w-full lg:w-1/2 scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Type de découpe
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {etiquette.decoupes.map((decoupe) => (
                                <button
                                    key={decoupe.id}
                                    onClick={() => handleSelect(decoupe.decoupe, 'decoupe')}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.decoupe === decoupe.decoupe ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <span>{decoupe.decoupe}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 scroll-mt-20">
                    {/* Input pour découpe "personnalisé" */}
                    {devisEncours.decoupe === 'personnalisée' && (
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                            <h1 className='text-sm font-bold ml-2'> Découpe personnalisé</h1>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={autreDecoupe.nom}
                                    onChange={(e) => setAutreDecoupe(prev => ({ ...prev, nom: e.target.value }))}
                                    placeholder="Description du découpe personnalisé"
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={autreDecoupe.prix || ''}
                                    onChange={(e) => setAutreDecoupe(prev => ({ ...prev, prix: Number(e.target.value) }))}
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

                {/* Section Finition */}
                <div className='flex mb-4'>
                    <div /*ref={finitionRef}*/ className="w-full lg:w-1/2 scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Finition
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {etiquette.finitions.map((fintion) => (
                                <button
                                    key={fintion.id}
                                    title={fintion.finition}
                                    onClick={() => handleSelect(fintion.finition, 'finition')}
                                    className={`p-3 truncate border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.finition === fintion.finition ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <span>{fintion.finition}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 scroll-mt-20">
                    {/* Input pour finition "personnalisé" */}
                    {devisEncours.finition === 'autres' && (
                    <div className="mt-3 px-2">
                        <div className="space-y-3">
                            <h1 className='text-sm font-bold ml-2'> Fintion personnalisé</h1>
                            <div className="relative">
                                <Input
                                    type="text"
                                    value={autreFinition.nom}
                                    onChange={(e) => setAutreFinition(prev => ({ ...prev, nom: e.target.value }))}
                                    placeholder="Description de la finition personnalisé"
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={autreFinition.prix || ''}
                                    onChange={(e) => setAutreFinition(prev => ({ ...prev, prix: Number(e.target.value) }))}
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

                <div className='flex mb-4'>
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