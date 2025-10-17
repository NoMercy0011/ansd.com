import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisGrandFormatData } from '@/sources/types/type'
import { Layers, Maximize2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from './OptionOverview/OptionOverview'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisGrandFormatData) => void;
}

type CustomSizeType = {
    longueur: number;
    largeur: number;
}

export default function GrandFormat({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock pour le Grand Format & PVC basées sur le CSV
    const GrandFormatData = {
        types: [
            { id: 1, type: 'vinyl', nom: 'Vinyl' },
            { id: 2, type: 'dos_bleu', nom: 'Dos bleu' },
            { id: 3, type: 'bache', nom: 'Bâche' },
            { id: 4, type: 'tissus_drapeau', nom: 'Tissus drapeau' },
            { id: 5, type: 'onewayvision', nom: 'Onewayvision' },
            { id: 6, type: 'film_reflechissant', nom: 'Film réfléchissant' },
            { id: 7, type: 'pvc', nom: 'PVC' },
            { id: 8, type: 'plexi', nom: 'Plexi' }
        ],
        
        laizes: {
            vinyl: [
                { id: 1, laize: '1m', prix_base: 5000 },
                { id: 2, laize: '1m20', prix_base: 6000 },
                { id: 3, laize: '1m50', prix_base: 7500 }
            ],
            dos_bleu: [
                { id: 4, laize: '1m20', prix_base: 8000 }
            ],
            bache: [
                { id: 5, laize: '1m', prix_base: 4000 },
                { id: 6, laize: '1m50', prix_base: 6000 },
                { id: 7, laize: '1m80', prix_base: 7200 },
                { id: 8, laize: '2m40', prix_base: 9600 },
                { id: 9, laize: '3m20', prix_base: 12800 }
            ],
            tissus_drapeau: [
                { id: 10, laize: '1m', prix_base: 3500 },
                { id: 11, laize: '1m50', prix_base: 5250 },
                { id: 12, laize: '1m60', prix_base: 5600 }
            ],
            onewayvision: [
                { id: 13, laize: '1m20', prix_base: 12000 }
            ],
            film_reflechissant: [
                { id: 14, laize: '1m21', prix_base: 15000 }
            ],
            pvc: [
                { id: 15, laize: '1m20', prix_base: 8000 },
                { id: 16, laize: '2m40', prix_base: 16000 }
            ],
            plexi: [
                { id: 17, laize: '1m20', prix_base: 10000 },
                { id: 18, laize: '2m41', prix_base: 20000 }
            ]
        },

        faces: {
            vinyl: [
                { id: 1, face: 'Recto', prix: 0 }
            ],
            dos_bleu: [
                { id: 2, face: 'Recto', prix: 0 }
            ],
            bache: [
                { id: 3, face: 'Recto', prix: 0 },
                { id: 4, face: 'Recto/Verso', prix: 5000 }
            ],
            tissus_drapeau: [
                { id: 5, face: 'Recto', prix: 0 }
            ],
            onewayvision: [
                { id: 6, face: 'Recto', prix: 0 }
            ],
            film_reflechissant: [
                { id: 7, face: 'Recto', prix: 0 }
            ],
            pvc: [
                { id: 8, face: 'Recto', prix: 0 },
                { id: 9, face: 'Recto/Verso', prix: 8000 }
            ],
            plexi: [
                { id: 10, face: 'Recto', prix: 0 },
                { id: 11, face: 'Recto/Verso', prix: 10000 }
            ]
        },

        finitions: {
            vinyl: [
                { id: 1, finition: 'pose', prix: 3000 },
                { id: 2, finition: 'decoupe', prix: 2000 }
            ],
            dos_bleu: [
                { id: 3, finition: 'decoupe', prix: 2500 }
            ],
            bache: [
                { id: 4, finition: 'soudure', prix: 4000 },
                { id: 5, finition: 'decoupe', prix: 2000 }
            ],
            tissus_drapeau: [
                { id: 6, finition: 'couture', prix: 3500 },
                { id: 7, finition: 'decoupe', prix: 1500 }
            ],
            onewayvision: [
                { id: 8, finition: 'aucune', prix: 0 }
            ],
            film_reflechissant: [
                { id: 9, finition: 'aucune', prix: 0 }
            ],
            pvc: [
                { id: 10, finition: 'trou', prix: 1000 },
                { id: 11, finition: 'decoupe', prix: 3000 }
            ],
            plexi: [
                { id: 12, finition: 'trou', prix: 1500 },
                { id: 13, finition: 'decoupe', prix: 4000 }
            ]
        },

        particularites: {
            vinyl: [
                { id: 1, particularite: 'Résistance extérieure', prix: 2000 }
            ],
            dos_bleu: [
                { id: 2, particularite: 'aucune', prix: 0 }
            ],
            bache: [
                { id: 3, particularite: 'couleur dos blanc', prix: 1000 },
                { id: 4, particularite: 'couleur dos gris', prix: 1000 },
                { id: 5, particularite: 'couleur dos noir', prix: 1000 }
            ],
            tissus_drapeau: [
                { id: 6, particularite: 'aucune', prix: 0 }
            ],
            onewayvision: [
                { id: 7, particularite: 'aucune', prix: 0 }
            ],
            film_reflechissant: [
                { id: 8, particularite: 'aucune', prix: 0 }
            ]
        },

        epaisseurs: {
            pvc: [
                { id: 1, epaisseur: '3 mm', prix: 0 },
                { id: 2, epaisseur: '6 mm', prix: 3000 },
                { id: 3, epaisseur: '10 mm', prix: 6000 },
                { id: 4, epaisseur: 'autres', prix: 8000 }
            ],
            plexi: [
                { id: 5, epaisseur: '3 mm', prix: 0 },
                { id: 6, epaisseur: '5 mm', prix: 4000 }
            ]
        },

        couleurs_plexi: [
            { id: 1, couleur: 'blanc', prix: 0 },
            { id: 2, couleur: 'transparent', prix: 0 }
        ]
    };

    const [client, setClient] = useState<clientType>();
    const [selectedType, setSelectedType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);
    const [customSize, setCustomSize] = useState<CustomSizeType>({
        longueur: 0,
        largeur: 0,
    });
    const [autreEpaisseur, setAutreEpaisseur] = useState({ nom: '', prix: '' });

    const [devisGrandFormat, setDevisGrandFormat] = useState<devisGrandFormatData>({
        client_id: 0,
        type: '',
        laize_id: 0,
        laize: '',
        face_id: 0,
        face: '',
        finition_id: 0,
        finition: '',
        particularite_id: 0,
        particularite: '',
        epaisseur_id: 0,
        epaisseur: '',
        couleur_id: 0,
        couleur: '',
        grand_format_id: 0,
        montant: '',
        quantite: 1,
        finitionPrix: 0,
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisGrandFormat(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonctions pour obtenir les données dynamiques
    const getCurrentLaizes = () => {
        if (!selectedType) return [];
        return GrandFormatData.laizes[selectedType as keyof typeof GrandFormatData.laizes] || [];
    };

    const getCurrentFaces = () => {
        if (!selectedType) return [];
        return GrandFormatData.faces[selectedType as keyof typeof GrandFormatData.faces] || [];
    };

    const getCurrentFinitions = () => {
        if (!selectedType) return [];
        return GrandFormatData.finitions[selectedType as keyof typeof GrandFormatData.finitions] || [];
    };

    const getCurrentParticularites = () => {
        if (!selectedType) return [];
        return GrandFormatData.particularites[selectedType as keyof typeof GrandFormatData.particularites] || [];
    };

    const getCurrentEpaisseurs = () => {
        if (!selectedType) return [];
        return GrandFormatData.epaisseurs[selectedType as keyof typeof GrandFormatData.epaisseurs] || [];
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: string): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Calcul du prix
    useEffect(() => {
        if (!selectedType) {
            setPrixUnitaireReel(0);
            setPrixTotalReel(0);
            return;
        }

        let prixTotal = 0;

        // Prix de base selon la laize
        const laize = getCurrentLaizes().find(l => l.id === devisGrandFormat.laize_id);
        if (laize) {
            prixTotal += safeNumber(String(laize.prix_base));
        }

        // Multiplicateur selon la longueur personnalisée
        if (customSize.longueur > 0) {
            prixTotal *= (customSize.longueur / 100); // Prix au mètre linéaire
        }

        // Prix de la face
        const face = getCurrentFaces().find(f => f.id === devisGrandFormat.face_id);
        if (face) {
            prixTotal += safeNumber(String(face.prix));
        }

        // Prix de la finition
        const finition = getCurrentFinitions().find(f => f.id === devisGrandFormat.finition_id);
        if (finition) {
            prixTotal += safeNumber(String(finition.prix));
        }

        // Prix des particularités
        const particularite = getCurrentParticularites().find(p => p.id === devisGrandFormat.particularite_id);
        if (particularite) {
            prixTotal += safeNumber(String(particularite.prix));
        }

        // Prix de l'épaisseur (PVC et Plexi)
        const epaisseur = getCurrentEpaisseurs().find(e => e.id === devisGrandFormat.epaisseur_id);
        if (epaisseur) {
            if (epaisseur.epaisseur === 'autres') {
                prixTotal += safeNumber(autreEpaisseur.prix);
            } else {
                prixTotal += safeNumber(String(epaisseur.prix));
            }
        }

        // Prix de la couleur (Plexi)
        const couleur = GrandFormatData.couleurs_plexi.find(c => c.id === devisGrandFormat.couleur_id);
        if (couleur) {
            prixTotal += safeNumber(String(couleur.prix));
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(devisGrandFormat.finitionPrix.toString());
        prixTotal += safeNumber(devisGrandFormat.optionPrix);

        // Calcul du total avec quantité
        const quantite = safeNumber(devisGrandFormat.quantite.toString());
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisGrandFormat, selectedType, customSize, autreEpaisseur]);

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisGrandFormat(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    const initializeDevisGrandFormat = () => {
        setDevisGrandFormat({
            client_id: Number(client?.id_client),
            type: '',
            laize_id: 0,
            laize: '',
            face_id: 0,
            face: '',
            finition_id: 0,
            finition: '',
            particularite_id: 0,
            particularite: '',
            epaisseur_id: 0,
            epaisseur: '',
            couleur_id: 0,
            couleur: '',
            grand_format_id: 0,
            montant: '',
            quantite: 1,
            finitionPrix: 0,
            optionPrix: ''
        });
        setSelectedType('');
        setCustomSize({ longueur: 0, largeur: 0 });
        setAutreEpaisseur({ nom: '', prix: '' });
    };

    const handleAddToCart = () => {
        const grandFormatType = GrandFormatData.types.find(t => t.id === devisGrandFormat.grand_format_id);
        
        const detailsDevis = `
Type: ${grandFormatType?.nom}
Laize: ${devisGrandFormat.laize || 'Sur mesure'}
Longueur: ${customSize.longueur > 0 ? `${customSize.longueur}cm` : 'Sur mesure'}
Face: ${devisGrandFormat.face || 'Non spécifié'}
Finition: ${devisGrandFormat.finition || 'Non spécifié'}
Particularité: ${devisGrandFormat.particularite || 'Aucune'}
Épaisseur: ${devisGrandFormat.epaisseur === 'autres' ? autreEpaisseur.nom : devisGrandFormat.epaisseur || 'Non spécifié'}
Couleur: ${devisGrandFormat.couleur || 'Non spécifié'}`;

        const grandFormatItem: CartItemsType = {
            id: Date.now(),
            designation: `Grand Format - ${grandFormatType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(devisGrandFormat.quantite.toString()),
            remise: 0.00,
            service: 'Grand Format',
        };
        
        setDevisGrandFormat(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(grandFormatItem, devisGrandFormat);
        initializeDevisGrandFormat();
    };

    const handleCustomSizeChange = (field: "longueur" | "largeur", value: string) => {
        const numValue = safeNumber(value);
        setCustomSize(prev => ({ ...prev, [field]: numValue }));
    };

    return (
        <Accordion title="Grand Format & PVC" icon={<Maximize2 />} defaultOpen={false}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className='max-h-[80vh] overflow-y-auto pr-4 space-y-4'>
                        
                        {/* Type de Produit */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Type de Produit </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {GrandFormatData.types.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            handleSelect(type.id, 'grand_format_id', 'type', type.type);
                                            setSelectedType(type.type);
                                        }}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.grand_format_id === type.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <span>{type.nom}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedType && (
                            <>
                                {/* Dimensions personnalisées */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Dimensions (Sur mesure) </span>
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={customSize.longueur.toString()}
                                                onChange={(e) => handleCustomSizeChange('longueur', e.target.value)}
                                                placeholder="Longueur"
                                                min="1"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">cm</span>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={customSize.largeur.toString()}
                                                onChange={(e) => handleCustomSizeChange('largeur', e.target.value)}
                                                placeholder="Largeur"
                                                min="1"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">cm</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Laize (Largeur standard) */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Largeur (Laize) </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentLaizes().map(laize => (
                                            <button
                                                key={laize.id}
                                                onClick={() => handleSelect(laize.id, 'laize_id', 'laize', laize.laize)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.laize_id === laize.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{laize.laize}</div>
                                                <div className="text-xs font-semibold text-green-600">{laize.prix_base.toLocaleString()} Ar/ml</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Face */}
                                {getCurrentFaces().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Face d&apos;impression </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentFaces().map(face => (
                                                <button
                                                    key={face.id}
                                                    onClick={() => handleSelect(face.id, 'face_id', 'face', face.face)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.face_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{face.face}</div>
                                                    {face.prix > 0 && (
                                                        <div className="text-xs text-green-600">+{face.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Finition */}
                                {getCurrentFinitions().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Finition </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentFinitions().map(finition => (
                                                <button
                                                    key={finition.id}
                                                    onClick={() => handleSelect(finition.id, 'finition_id', 'finition', finition.finition)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.finition_id === finition.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{finition.finition}</div>
                                                    {finition.prix > 0 && finition.finition !== 'aucune' && (
                                                        <div className="text-xs text-green-600">+{finition.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Particularités */}
                                {getCurrentParticularites().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Particularités </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentParticularites().map(particularite => (
                                                <button
                                                    key={particularite.id}
                                                    onClick={() => handleSelect(particularite.id, 'particularite_id', 'particularite', particularite.particularite)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.particularite_id === particularite.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold text-xs">{particularite.particularite}</div>
                                                    {particularite.prix > 0 && particularite.particularite !== 'aucune' && (
                                                        <div className="text-xs text-green-600">+{particularite.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Épaisseur (PVC et Plexi) */}
                                {getCurrentEpaisseurs().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Épaisseur </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentEpaisseurs().map(epaisseur => (
                                                <button
                                                    key={epaisseur.id}
                                                    onClick={() => handleSelect(epaisseur.id, 'epaisseur_id', 'epaisseur', epaisseur.epaisseur)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.epaisseur_id === epaisseur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{epaisseur.epaisseur}</div>
                                                    {epaisseur.prix > 0 && epaisseur.epaisseur !== 'autres' && (
                                                        <div className="text-xs text-green-600">+{epaisseur.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Input pour épaisseur "autres" */}
                                        {devisGrandFormat.epaisseur === 'autres' && (
                                            <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <h5 className="font-semibold mb-3">Épaisseur personnalisée</h5>
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={autreEpaisseur.nom}
                                                            onChange={(e) => setAutreEpaisseur(prev => ({ ...prev, nom: e.target.value }))}
                                                            placeholder="Description de l'épaisseur"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            value={autreEpaisseur.prix}
                                                            onChange={(e) => setAutreEpaisseur(prev => ({ ...prev, prix: e.target.value }))}
                                                            placeholder="Prix supplémentaire"
                                                            min="0"
                                                        />
                                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Couleurs (Plexi) */}
                                {(selectedType === 'plexi' && GrandFormatData.couleurs_plexi.length > 0) && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Couleur </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {GrandFormatData.couleurs_plexi.map(couleur => (
                                                <button
                                                    key={couleur.id}
                                                    onClick={() => handleSelect(couleur.id, 'couleur_id', 'couleur', couleur.couleur)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.couleur_id === couleur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{couleur.couleur}</div>
                                                    {couleur.prix > 0 && (
                                                        <div className="text-xs text-green-600">+{couleur.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Options supplémentaires */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Options supplémentaires </span>
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={devisGrandFormat.finitionPrix.toString() }
                                                onChange={(e) => handleSelect(safeNumber(e.target.value), 'finitionPrix')}
                                                placeholder="Prix finition supplémentaire"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={devisGrandFormat.optionPrix}
                                                onChange={(e) => handleSelect(safeNumber(e.target.value), 'optionPrix')}
                                                placeholder="Prix option supplémentaire"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quantité */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-3 flex items-center ">
                                        <Layers />
                                        <span className="ml-2"> Quantité </span>
                                    </h4>
                                    <Input 
                                        type="number" 
                                        value={devisGrandFormat.quantite.toString()} 
                                        onChange={e => handleSelect(Math.max(1, safeNumber(e.target.value)), 'quantite')} 
                                        placeholder="Ex: 1" 
                                        min="1"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Overview et calcul des prix */}
                <OptionOverview 
                    userRole={userRole} 
                    prixUnitaireReel={prixUnitaireReel} 
                    prixTotalReel={prixTotalReel} 
                    handleAddToCart={handleAddToCart} 
                    devisGrandFormat={devisGrandFormat} 
                />
            </div>
        </Accordion>
    );
}