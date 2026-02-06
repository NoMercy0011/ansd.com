'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Layers } from 'lucide-react';
import { devisData } from '@/types/type';
import { itemType } from '@/types/itemType';
import { Input } from '@/components/ui/input';

type ItemProps = {
    item: itemType;
    userRole: string;
    getDevis: (devis: devisData) => void;
    getPrix: (prixTotal: number, prixUnitaire: number) => void;
    activeSection: string;
};

export default function Plexi({ item, getDevis, getPrix, activeSection }: ItemProps) {

    // ========== ÉTAT LOCAL ==========
    const [autreLongueur, setAutreLongueur] = useState({
        nom: '',
        prix: 0,
    });

    const [autreFinition, setAutreFinition] = useState({
        nom: '',
        prix: 0,
    });

    const [autreParticularite, setAutreParticularite] = useState({
        nom: '',
        prix: 0,
    });

    const [ autreEpaisseur, setAutreEpaisseur] = useState({
        nom: '',
        prix: 0,
    })

    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0,
    })

    const [devisEncours, setDevisEncours] = useState<devisData>({
            client_id: 0,
            type: item.type,
            longueur_id: 0,
            longueur: '',
            laize_id: 0,
            laize: '',
            finition_id: 0,
            finition: '',
            montant: '',
            quantite: 1,
            recto_verso_id: 0,
            recto: '',
            decoupe: '',
            particularite: '',
            epaisseur_id: 0,
            epaisseur: '',
        });

    // ========== RÉFÉRENCES POUR SCROLL ==========
    const longueurRef = useRef<HTMLDivElement>(null);
    const laizeRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const finitionRef = useRef<HTMLDivElement>(null);
    const particularitesRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDevisEncours(prev => ({
            ...prev,
            longueur: autreLongueur.nom || prev.longueur
        }));
    }, [autreLongueur.nom])
    
    // --- Gestion du Scroll automatique ---
    useEffect(() => {
        const sections: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            'longueur': longueurRef,
            'laize': laizeRef,
            'face': faceRef,
            'finition': finitionRef,
            'particularite': particularitesRef,
            'quantite': quantiteRef,
        };

        if (activeSection && sections[activeSection]?.current) {
            sections[activeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeSection]);

    // ========== CALCUL DU PRIX ==========
    useEffect(() => {

    let prixUnitaire = 0;

    if( autreLongueur.prix ){
        prixUnitaire += autreLongueur.prix;
    }

    if( autreFinition.prix ){
        prixUnitaire += autreFinition.prix;
    }

    if( autreParticularite.prix ){
        prixUnitaire += autreParticularite.prix;
    }

    if( autreEpaisseur.prix ){
        prixUnitaire += autreEpaisseur.prix;
    }


    // 3. Prix de la face (recto/verso)
    const faceSelectionnee = item.faces!.find(
        f => f.id === devisEncours.recto_verso_id
    );
    if (faceSelectionnee) {
        prixUnitaire *= Number(faceSelectionnee.code);
    }

    const quantite = devisEncours.quantite || 1;
        
    let coefficientQuantite = 1;
    
    if (quantite >= 100) {
        coefficientQuantite = 1; // 20% de réduction
    } else if (quantite >= 50) {
        coefficientQuantite = 1; // 15% de réduction
    } else if (quantite >= 20) {
        coefficientQuantite = 1; // 10% de réduction
    } else if (quantite >= 10) {
        coefficientQuantite = 1; // 5% de réduction
    }

    const prixUnitaireFinal = prixUnitaire * coefficientQuantite;
    const prixTotalFinal = prixUnitaireFinal * quantite;

    setPrix({
        prixUnitaire: Math.round(prixUnitaireFinal),
        prixTotal: Math.round(prixTotalFinal)
    });

    }, [ devisEncours.longueur,
        devisEncours.longueur_id,
        devisEncours.laize,
        devisEncours.laize_id,
        devisEncours.recto,
        devisEncours.recto_verso_id,
        devisEncours.finition,
        devisEncours.finition_id,
        devisEncours.particularite,
        devisEncours.particularite_id,
        devisEncours.quantite,
        autreLongueur.prix,
        autreFinition.prix,
        autreParticularite.prix,
        autreEpaisseur.prix,
        getDevis, 
        getPrix
    ]);

    useEffect( () => {
        getDevis(devisEncours);
        // Le prix est mis à jour dans l'autre useEffect
        getPrix(prix.prixTotal, prix.prixUnitaire); 
    }, [devisEncours, prix.prixTotal, prix.prixUnitaire]);


    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisEncours(prevState => ({
            ...prevState,
            type: item.type,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // ========== RENDU ==========
    return (
        <div className="space-y-8">
            {/* Longueur personnalisées */}
            <div className='flex mb-4'>
            <div ref={longueurRef} className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Longueur
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                        onClick= {() => {
                            handleSelect(999, 'longueur_id', 'longueur', 'sur mesure');
                        }}
                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.longueur_id === 999 ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                    >
                        <div className="font-semibold"> sur mesure </div>
                    </button>
                </div>
            </div>

            <div className="w-full lg:w-1/2 scroll-mt-20">
            {/* Input pour Longueur "personnalisé" */}
            {devisEncours.longueur_id === 999 && (
                <div className="mt-3 px-2">
                    <div className="space-y-3">
                        <h1 className='text-sm font-bold ml-2'> Longueur personnalisé</h1>
                    <div className="relative">
                        <Input
                            type="text"
                            value={autreLongueur.nom || ''}
                            onChange={(e) => setAutreLongueur(prev => ({ ...prev, nom: e.target.value }))}
                            placeholder="Longueur en mètre"
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            value={autreLongueur.prix.toString() || ''}
                            onChange={(e) => setAutreLongueur(prev => ({ ...prev, prix: Number(e.target.value) }))}
                            placeholder="Prix supplémentaire"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                    </div>
                </div>
                   </div>
            )}
            </div>
            </div>

            {/* Laize (Largeur standard) */}
            <div ref={laizeRef} className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Largeur (Laize)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {item?.dimensions?.map(laize => (
                        <button
                            key={laize.id}
                            onClick={() => handleSelect(laize.id, 'laize_id', 'laize', laize.dimension)}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.laize_id === laize.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold">{laize.dimension}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Face d'impression */}
            <div ref={faceRef} className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Face d&apos;impression
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {item?.faces?.map(face => (
                        <button
                            key={face.id}
                            onClick={() => handleSelect(face.id, 'recto_verso_id', 'recto', face.face)}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.recto_verso_id === face.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold">{face.face}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Epaisseur */}
            <div className='flex mb-4'>
            <div className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Epaisseur
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {item?.epaisseurs?.map(epaisseur => (
                        <button
                            key={epaisseur.id}
                            onClick={() => handleSelect(epaisseur.id, 'epaisseur_id', 'epaisseur', epaisseur.epaisseur)}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.epaisseur_id === epaisseur.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold">{epaisseur.epaisseur}</div>
                        </button>
                    ))}
                    <button
                            onClick={() => handleSelect(999, 'epaisseur_id', 'epaisseur', 'autres')}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.epaisseur_id === 999
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold"> {'autres'} </div>
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-1/2 scroll-mt-20">
            {/* Input pour epaisseur "personnalisé" */}
            {devisEncours.epaisseur === 'autres' ? (
                   <div className="mt-3 px-2">
                       <div className="space-y-3">
                           <h1 className='text-sm font-bold ml-2'> Epaisseur personnalisé</h1>
                           <div className="relative">
                               <Input
                                   type="text"
                                   value={autreEpaisseur.nom}
                                   onChange={(e) => setAutreEpaisseur(prev => ({ ...prev, nom: e.target.value }))}
                                   placeholder="Description supplémentaire"
                               />
                           </div>
                           <div className="relative">
                               <Input
                                   type="number"
                                   value={autreEpaisseur.prix || ''}
                                   onChange={(e) => setAutreEpaisseur(prev => ({ ...prev, prix: Number(e.target.value) }))}
                                   placeholder="Prix supplémentaire"
                                   min="0"
                               />
                               <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                           </div>
                       </div>
                   </div>
                   ) : ( devisEncours.epaisseur &&
                   <div className="mt-3 px-2">
                       <div className="space-y-3">
                           <h1 className='text-sm font-bold ml-2'> Epaisseur : { devisEncours.epaisseur} </h1>
                           <div className="relative">
                               <Input
                                   type="number"
                                   value={ autreEpaisseur.prix || ''}
                                   onChange={(e) => setAutreEpaisseur({...autreEpaisseur , prix: Number(e.target.value)})}
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

            {/* Finition */}
            <div className='flex mb-4'>
            <div ref={finitionRef} className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Finition
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {item?.finitions?.map(finition => (
                        <button
                            key={finition.id}
                            onClick={() => handleSelect(finition.id, 'finition_id', 'finition', finition.finition)}
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
            {/* Input pour finition "personnalisé" */}
            {devisEncours.finition === 'autres' ? (
                   <div className="mt-3 px-2">
                       <div className="space-y-3">
                           <h1 className='text-sm font-bold ml-2'> Finition personnalisé</h1>
                           <div className="relative">
                               <Input
                                   type="text"
                                   value={autreFinition.nom}
                                   onChange={(e) => setAutreFinition(prev => ({ ...prev, nom: e.target.value }))}
                                   placeholder="Description de la dimension personnalisé"
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
                   ) : ( devisEncours.finition &&
                   <div className="mt-3 px-2">
                       <div className="space-y-3">
                           <h1 className='text-sm font-bold ml-2'> Finition : { devisEncours.finition} </h1>
                           <div className="relative">
                               <Input
                                   type="text"
                                   value={autreFinition.nom}
                                   onChange={(e) => setAutreFinition(prev => ({ ...prev, nom: e.target.value }))}
                                   placeholder="Description supplémentaire"
                               />
                           </div>
                           <div className="relative">
                               <Input
                                   type="number"
                                   value={ autreFinition.prix || ''}
                                   onChange={(e) => setAutreFinition({...autreFinition , prix: Number(e.target.value)})}
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

            {/* Particularités */}
            <div className='flex mb-4'>
            <div ref={particularitesRef} className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Particularités
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <button
                        onClick={() => handleSelect(0, 'particularite_id')}
                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                            devisEncours.particularite_id === 0 
                                ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                        }`}
                    >
                        <div className="font-semibold text-xs">Aucune</div>
                    </button>
                    {item?.particularites?.map(particularite => (
                        <button
                            key={particularite.id}
                            onClick={() => handleSelect(particularite.id, 'particularite_id', 'particularite', particularite.particularite)}
                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${
                                devisEncours.particularite_id === particularite.id 
                                    ? 'bg-red-600 text-white border-red-600 shadow-md' 
                                    : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500'
                            }`}
                        >
                            <div className="font-semibold text-xs">{particularite.particularite}</div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-1/2 scroll-mt-20">
            {/* Input pour finition "personnalisé" */}
            {devisEncours.particularite_id !== 0 && 
            ( devisEncours.particularite &&
                   <div className="mt-3 px-2">
                       <div className="space-y-3">
                           <h1 className='text-sm font-bold ml-2'> Particularité : { devisEncours.particularite } </h1>
                           <div className="relative">
                               <Input
                                   type="text"
                                   value={autreParticularite.nom}
                                   onChange={(e) => setAutreParticularite(prev => ({ ...prev, nom: e.target.value }))}
                                   placeholder="Description supplémentaire"
                               />
                           </div>
                           <div className="relative">
                               <Input
                                   type="number"
                                   value={ autreParticularite.prix || ''}
                                   onChange={(e) => setAutreParticularite({...autreParticularite , prix: Number(e.target.value)})}
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

            {/* Quantité */}
            <div ref={quantiteRef} className="w-full lg:w-1/2 scroll-mt-20">
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                    <Layers className="mr-2" />
                    Quantité
                </h4>
                <Input 
                    type="number" 
                    value={devisEncours.quantite?.toString()} 
                    onChange={e => handleSelect(Math.max(1, Number(e.target.value)), 'quantite')} 
                    placeholder="Ex: 1" 
                    min="1"
                    className="dark:bg-slate-700"
                />
            </div>
        </div>
    );
}