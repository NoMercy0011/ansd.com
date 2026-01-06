import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemType } from '@/types/itemType';
import { devisData } from '@/types/type';
import { Layers, Plus, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

type DoypackProps = {
    doypack: itemType,
    userRole: string;
    getDevis: (devis : devisData) => void;
    getPrix: (prixTotalReel : number, prixUnitaireReel: number) => void; 
    activeSection: string;
}

interface EmplacementItem {
    id: string;
    emplacement: string;
    description: string;
    prix: number;
}

export default function Doypack( { doypack, activeSection, getDevis, getPrix }: DoypackProps) {

    const COLOR_PALETTE = [
        // Noirs et gris
        { name: 'Noir', hex: '#000000' },
        { name: 'Gris très foncé', hex: '#333333' },
        { name: 'Gris foncé', hex: '#666666' },
        { name: 'Gris moyen', hex: '#999999' },
        { name: 'Gris clair', hex: '#CCCCCC' },
        { name: 'Blanc', hex: '#FFFFFF' },
        
        // Rouges
        { name: 'Rouge vif', hex: '#FF0000' },
        { name: 'Rouge foncé', hex: '#CC0000' },
        { name: 'Rouge Bordeaux', hex: '#800000' },
        { name: 'Rose', hex: '#FF66CC' },
        { name: 'Rose pâle', hex: '#FFCCFF' },
        
        // Bleus
        { name: 'Bleu roi', hex: '#0000FF' },
        { name: 'Bleu marine', hex: '#000080' },
        { name: 'Bleu ciel', hex: '#3399FF' },
        { name: 'Bleu clair', hex: '#66CCFF' },
        { name: 'Bleu turquoise', hex: '#00CCCC' },
        
        // Verts
        { name: 'Vert vif', hex: '#00FF00' },
        { name: 'Vert foncé', hex: '#006600' },
        { name: 'Vert forêt', hex: '#339933' },
        { name: 'Vert menthe', hex: '#99FF99' },
        { name: 'Vert olive', hex: '#808000' },
        
        // Jaunes/Oranges
        { name: 'Jaune vif', hex: '#FFFF00' },
        { name: 'Jaune pâle', hex: '#FFFF99' },
        { name: 'Orange vif', hex: '#FF6600' },
        { name: 'Orange pâle', hex: '#FFCC99' },
        { name: 'Or', hex: '#FFCC00' },
        
        // Pourpres/Violets
        { name: 'Violet', hex: '#6600CC' },
        { name: 'Violet pâle', hex: '#CC99FF' },
        { name: 'Magenta', hex: '#FF00FF' },
        { name: 'Lavande', hex: '#CCCCFF' },
        { name: 'Mauve', hex: '#9966CC' },
        
        // Marrons/Beiges
        { name: 'Marron', hex: '#663300' },
        { name: 'Marron clair', hex: '#996633' },
        { name: 'Beige', hex: '#F5F5DC' },
        { name: 'Crème', hex: '#FFFDD0' },
        { name: 'Chocolat', hex: '#D2691E' }
    ];

    const [selectedColor, setSelectedColor] = useState<string>('#000000');

    const handleColorSelect = (name: string, hex: string) => {
        setSelectedColor(hex);
        const customId = Date.now();
        handleSelect(customId, 'couleur_id', 'couleur', `${name} (${hex})`);
    };

    const [prix, setPrix] = useState({
        prixTotal: 0,
        prixUnitaire: 0 ,
    })

    const [autreDimension, setAutreDimension] = useState({
        nom: "",
        prix: 0,
    })

    // État pour gérer les emplacements multiples
    const [emplacements, setEmplacements] = useState<EmplacementItem[]>([]);

    const [devisEncours, setDevisEncours] = useState<devisData>({
        client_id: 0,
        type: doypack.type,
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
        recto: '',
        option_id: '',
        imprimante_id: 0,
        imprimante: '',
        finition: 'invalide',
        option: '',
        optionPrix: '',
        finitionPrix: 0,
        decoupe: 'invalide',
        particularite: '',
        emplacement: '',
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

    useEffect(() => {
        getDevis(devisEncours);
        getPrix(prix.prixTotal, prix.prixUnitaire);
    }, [devisEncours, prix.prixTotal, prix.prixUnitaire]);

    useEffect(() => {
        let prixUnitaire = 0;
        
        // 1. Prix de base selon la dimension
        if (devisEncours.dimension === 'sur devis') {
            prixUnitaire += autreDimension.prix;
        }

        // 2. Prix du matériau
        const materiauSelectionne = doypack.matieres!.find(
            m => m.id === devisEncours.materiau_id
        );
        if (materiauSelectionne) {
            prixUnitaire += Number(materiauSelectionne.prix_unitaire);
        }

        // 3. Prix de la face (recto/verso)
        const faceSelectionnee = doypack.faces!.find(
            f => f.id === devisEncours.recto_verso_id
        );
        if (faceSelectionnee) {
            prixUnitaire = prixUnitaire * Number(faceSelectionnee.code);
        }

        // 4. Prix des emplacements (somme de tous les emplacements)
        const prixEmplacements = emplacements.reduce((total, emp) => total + emp.prix, 0);
        prixUnitaire += prixEmplacements;

        // 5. Application des paliers de quantité
        const quantite = devisEncours.quantite || 1;
        let coefficientQuantite = 1;
        
        if (quantite >= 20000) {
            coefficientQuantite = 0.65;
        } else if (quantite >= 10000) {
            coefficientQuantite = 0.70;
        } else if (quantite >= 5000) {
            coefficientQuantite = 0.75;
        } else if (quantite >= 2000) {
            coefficientQuantite = 0.80;
        } else if (quantite >= 1000) {
            coefficientQuantite = 0.85;
        } else if (quantite >= 500) {
            coefficientQuantite = 0.90;
        } else if (quantite >= 250) {
            coefficientQuantite = 0.95;
        }

        const prixUnitaireFinal = prixUnitaire * coefficientQuantite;
        const prixTotalFinal = prixUnitaireFinal * quantite;

        setPrix({
            prixUnitaire: Math.round(prixUnitaireFinal),
            prixTotal: Math.round(prixTotalFinal)
        });

    }, [
        devisEncours.dimension_id,
        devisEncours.dimension,
        devisEncours.materiau_id,
        devisEncours.imprimante_id,
        devisEncours.recto_verso_id,
        devisEncours.quantite,
        autreDimension.prix,
        emplacements,
    ]);

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisEncours(prevState => ({
            ...prevState,
            type: doypack.type,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonctions pour gérer les emplacements multiples
    const ajouterEmplacement = (emplacementNom: string) => {
        const id = `emp-${Date.now()}`;
        const nouveauEmplacement: EmplacementItem = {
            id,
            emplacement: emplacementNom,
            description: '',
            prix: 0
        };
        setEmplacements([...emplacements, nouveauEmplacement]);
    };

    const supprimerEmplacement = (id: string) => {
        setEmplacements(emplacements.filter(emp => emp.id !== id));
    };

    const mettreAJourEmplacement = (id: string, field: keyof EmplacementItem, value: string | number) => {
        setEmplacements(emplacements.map(emp => 
            emp.id === id ? { ...emp, [field]: value } : emp
        ));
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
                            {doypack.dimensions!.map(dimension => (
                                <button
                                    key={dimension.id}
                                    onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <div className="font-semibold">{dimension.dimension}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 scroll-mt-20">
                        {devisEncours.dimension === 'sur devis' && (
                            <div className="mt-3 px-2">
                                <div className="space-y-3">
                                    <h1 className='text-sm font-bold ml-2'>Dimension personnalisée</h1>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            value={autreDimension.nom}
                                            onChange={(e) => setAutreDimension(prev => ({ ...prev, nom: e.target.value }))}
                                            placeholder="Description de la dimension"
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
                                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
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
                            {doypack.matieres!.map(matiere => (
                                <Button
                                    key={matiere.id}
                                    variant='ghost'
                                    onClick={() => handleSelect(matiere.id, 'materiau_id', 'materiau', matiere.type)}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.materiau_id === matiere.id ? 'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <div className="font-semibold truncate">{matiere.type}</div>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Couleur */}
                <div className='flex mb-4'>
                    <div ref={couleurRef} className="w-full scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Couleur
                        </h4>
                        <div className="mb-6">
                            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-1 bg-slate-100 dark:bg-slate-800 rounded-2xl p-3">
                                {COLOR_PALETTE.map((color, index) => (
                                    <button
                                        key={`color-${index}`}
                                        onClick={() => handleColorSelect(color.name, color.hex)}
                                        className={`aspect-square w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform ${selectedColor === color.hex ? 'ring-2 ring-red-500 border-red-500' : 'border-slate-300 dark:border-slate-700'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
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
                            {doypack.faces!.map(face => (
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
                            {doypack.imprimantes!.map(imprimante => (
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

                {/* Section Emplacement - AMÉLIORÉE */}
                <div className='mb-4'>
                    <div ref={emplacementRef} className="w-full scroll-mt-20">
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                            <Layers className="mr-2" />
                            Emplacements d&apos;impression
                        </h4>
                        
                        {/* Boutons de sélection d'emplacements */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                            {doypack.emplacements!.map(emplacement => (
                                <button
                                    key={emplacement.id}
                                    onClick={() => ajouterEmplacement(emplacement.emplacement)}
                                    className="p-3 border rounded-lg text-center text-sm transition-all duration-200 bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-slate-600 flex items-center justify-center gap-2"
                                >
                                    <Plus size={16} />
                                    <span className="font-semibold">{emplacement.emplacement}</span>
                                </button>
                            ))}
                        </div>

                        {/* Liste des emplacements sélectionnés */}
                        {emplacements.length > 0 && (
                            <div className="mt-6 space-y-4 ">
                                <h5 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                                    Emplacements sélectionnés ({emplacements.length})
                                </h5>
                                <div className='grid grid-cols-2 gap-2'>
                                    {emplacements.map((emp) => (
                                    <div key={emp.id} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                                <span className="font-semibold text-slate-700 dark:text-slate-200">
                                                    {emp.emplacement}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => supprimerEmplacement(emp.id)}
                                                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                                                title="Supprimer cet emplacement"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    value={emp.description}
                                                    onChange={(e) => mettreAJourEmplacement(emp.id, 'description', e.target.value)}
                                                    placeholder="Description détaillée "
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    value={emp.prix || ''}
                                                    onChange={(e) => mettreAJourEmplacement(emp.id, 'prix', Number(e.target.value))}
                                                    placeholder="Prix pour cet emplacement"
                                                    min="0"
                                                    className="w-full"
                                                />
                                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div> 
                                
                                {/* Récapitulatif des prix */}
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                                            Total emplacements :
                                        </span>
                                        <span className="font-bold text-red-600 dark:text-red-400">
                                            {emplacements.reduce((total, emp) => total + emp.prix, 0).toLocaleString()} Ar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Message si aucun emplacement */}
                        {emplacements.length === 0 && (
                            <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                                Cliquez sur un emplacement ci-dessus pour l&apos;ajouter
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
                            value={devisEncours.quantite?.toString() || ''} 
                            onChange={e => handleSelect(Math.max(1, Number(e.target.value)), 'quantite')} 
                            placeholder="Ex: 1000" 
                            min="1"
                        />
                    </div>
                </div>     
            </div>
        </div>
    )
}