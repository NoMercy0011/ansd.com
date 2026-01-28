"use client"

import { Input } from '@/components/ui/input';
import { itemType } from '@/types/itemType';
import { devisData } from '@/types/type';
import { Layers } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

type ItemProps = {
    item: itemType,
    userRole: string;
    getDevis: (devis : devisData) => void;
    getPrix: (prixTotalReel : number, prixUnitaireReel: number) => void;
    activeSection: string; 
}

export default function RollUpStandard({item, activeSection, getDevis, getPrix} : ItemProps) {
    
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

    const [autreDimension, setAutreDimension] = useState({
        nom: "",
        prix: 0,
    })


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
    const orientationRef = useRef<HTMLDivElement>(null);
    const decoupeRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const particulariteRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // --- Gestion du Scroll automatique ---
    useEffect(() => {
        const sections: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            'dimension': dimensionRef,
            'materiau': materiauRef,
            'socle': socleRef,
            'face': faceRef,
            'orientation': orientationRef,
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
    // --- Logique de Calcul du Prix pour Roll-Up/X-Banner ---

    let prixUnitaire = 0;
    
    // 1. Prix de base selon la dimension (avec ratio)
    /*const dimensionSelectionnee = item.dimensions!.find(
        d => d.id === devisEncours.dimension_id
    );
    if (dimensionSelectionnee) {
        prixUnitaire += Number(dimensionSelectionnee.prix) * ratioState;
    }*/
   if( autreDimension.prix ){
    prixUnitaire += autreDimension.prix;
   }

    // 2. Prix du matériau
    if (devisEncours.materiau_id === 999) {
        prixUnitaire += autreMateriau.prix;
    } else {
        const materiauSelectionne = item.matieres!.find(
            m => m.id === devisEncours.materiau_id
        );
        if (materiauSelectionne) {
            prixUnitaire += Number(materiauSelectionne.prix_unitaire);
        }
    }

    // 3. Prix de la face (recto/verso)
    const faceSelectionnee = item.faces!.find(
        f => f.id === devisEncours.recto_verso_id
    );
    if (faceSelectionnee) {
        prixUnitaire *= Number(faceSelectionnee.code);
    }

    // 4. Application des paliers de quantité (volumes plus faibles pour PLV)
    const quantite = devisEncours.quantite || 1;
    let coefficientQuantite = 1;
    
    if (quantite >= 100) {
        coefficientQuantite = 1; // 20% de réduction
    } else if (quantite >= 50) {
        coefficientQuantite = 1; // 15% de réduction
    } else if (quantite >= 20) {
        coefficientQuantite =1; // 10% de réduction
    } else if (quantite >= 10) {
        coefficientQuantite = 1; // 5% de réduction
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
    devisEncours.recto_verso_id,
    devisEncours.quantite,
    ratioState,
    autreMateriau.prix,
    autreDimension.prix,
    ]);
        
    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisEncours(prevState => ({
            ...prevState,
            type: item.type,
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
                      {item.dimensions!.map(dimension => (
                        <button
                            key={dimension.id}
                            onClick= {() => {
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
                                      value={autreDimension.prix || ''}
                                      onChange={(e) => setAutreDimension({...autreDimension , prix: Number(e.target.value)})}
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {item.matieres!.map(matiere => (
                                <button
                                    key={matiere.id}
                                    onClick={() => {
                                        handleSelect(matiere.id, 'materiau_id', 'materiau', matiere.type );
                                    }}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.materiau_id === matiere.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <div className="font-semibold">{matiere.type}</div>
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
