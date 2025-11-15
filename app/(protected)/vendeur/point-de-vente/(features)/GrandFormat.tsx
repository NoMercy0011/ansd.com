import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import { CartItemsType, clientType, devisData } from '@/sources/types/type'
import { Layers, Maximize2 } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react' 
import OptionOverview from './OptionOverview/OptionOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' 
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisData) => void;
}

type CustomSizeType = {
    longueur: number;
    largeur: number;
}

export default function GrandFormat({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock (inchangées)
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

    // --- Ajout des Refs et activeTab ---
    const [activeTab, setActiveTab] = useState('type');
    const typeRef = useRef<HTMLDivElement>(null);
    const dimensionsRef = useRef<HTMLDivElement>(null);
    const laizeRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const finitionRef = useRef<HTMLDivElement>(null);
    const particularitesRef = useRef<HTMLDivElement>(null);
    const epaisseurRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);
    // --- Fin Ajout ---

    const [devisGrandFormat, setDevisGrandFormat] = useState<devisData>({
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
        // Logique de réinitialisation lors du changement de type
        if (name === 'grand_format_id') {
            setDevisGrandFormat({
                ...devisGrandFormat,
                laize_id: 0, laize: '',
                face_id: 0, face: '',
                finition_id: 0, finition: '',
                particularite_id: 0, particularite: '',
                epaisseur_id: 0, epaisseur: '',
                couleur_id: 0, couleur: ''
            });
            setCustomSize({ longueur: 0, largeur: 0 });
            setAutreEpaisseur({ nom: '', prix: '' });
        } else {
            setDevisGrandFormat(prevState => ({
                ...prevState,
                [name]: value,
                ...(option !== undefined && { [option]: optionValue }),
            }));
        }
    };

    // --- Fonction de Scroll ---
    const scrollToSection = (section: string) => {
        setActiveTab(section);
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            type: typeRef,
            dimensions: dimensionsRef,
            laize: laizeRef,
            face: faceRef,
            finition: finitionRef,
            particularites: particularitesRef,
            epaisseur: epaisseurRef,
            couleur: couleurRef,
            options: optionsRef,
            quantite: quantiteRef
        };

        if (refs[section]?.current) {
            refs[section].current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    // --- Fin Fonction de Scroll ---

    // Fonctions pour obtenir les données dynamiques (inchangées)
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
    const safeNumber = (value: string | number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Calcul du prix (inchangé, juste safeNumber)
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
            prixTotal += safeNumber(laize.prix_base);
        }

        // Multiplicateur selon la longueur personnalisée (prix au mètre linéaire)
        if (customSize.longueur > 0) {
            prixTotal *= (safeNumber(customSize.longueur) / 100); 
        } else {
             // Si aucune longueur n'est entrée, on ne peut pas calculer le prix
             prixTotal = 0;
        }

        // Prix de la face
        const face = getCurrentFaces().find(f => f.id === devisGrandFormat.face_id);
        if (face) {
            prixTotal += safeNumber(face.prix);
        }

        // Prix de la finition
        const finition = getCurrentFinitions().find(f => f.id === devisGrandFormat.finition_id);
        if (finition) {
            prixTotal += safeNumber(finition.prix);
        }

        // Prix des particularités
        const particularite = getCurrentParticularites().find(p => p.id === devisGrandFormat.particularite_id);
        if (particularite) {
            prixTotal += safeNumber(particularite.prix);
        }

        // Prix de l'épaisseur (PVC et Plexi)
        const epaisseur = getCurrentEpaisseurs().find(e => e.id === devisGrandFormat.epaisseur_id);
        if (epaisseur) {
            if (epaisseur.epaisseur === 'autres') {
                prixTotal += safeNumber(autreEpaisseur.prix);
            } else {
                prixTotal += safeNumber(epaisseur.prix);
            }
        }

        // Prix de la couleur (Plexi)
        const couleur = GrandFormatData.couleurs_plexi.find(c => c.id === devisGrandFormat.couleur_id);
        if (couleur) {
            prixTotal += safeNumber(couleur.prix);
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(Number(devisGrandFormat.finitionPrix));
        prixTotal += safeNumber(Number(devisGrandFormat.optionPrix));

        // Calcul du total avec quantité
        const quantite = safeNumber(Number(devisGrandFormat.quantite));
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisGrandFormat, selectedType, customSize, autreEpaisseur]);

    // useEffect GetClientID (inchangé)
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

    // initializeDevisGrandFormat (inchangé)
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

    // handleAddToCart (inchangé)
    const handleAddToCart = () => {
        const grandFormatType = GrandFormatData.types.find(t => t.id === devisGrandFormat.grand_format_id);
        
        const detailsDevis = `
Type: ${grandFormatType?.nom}
Laize: ${devisGrandFormat.laize || 'Sur mesure'}
Dimensions: ${customSize.longueur > 0 ? `${customSize.longueur}cm x ${customSize.largeur}cm` : 'Non spécifié'}
Face: ${devisGrandFormat.face || 'Non spécifié'}
Finition: ${devisGrandFormat.finition || 'Non spécifié'}
Particularité: ${devisGrandFormat.particularite || 'Aucune'}
Épaisseur: ${devisGrandFormat.epaisseur === 'autres' ? autreEpaisseur.nom : devisGrandFormat.epaisseur || 'N/A'}
Couleur: ${devisGrandFormat.couleur || 'N/A'}`;

        const grandFormatItem: CartItemsType = {
            id: Date.now(),
            designation: `Grand Format - ${grandFormatType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(Number(devisGrandFormat.quantite)),
            remise: 0.00,
            service: 'Grand Format',
        };
        
        setDevisGrandFormat(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(grandFormatItem, devisGrandFormat);
        initializeDevisGrandFormat();
    };

    // handleCustomSizeChange (inchangé)
    const handleCustomSizeChange = (field: "longueur" | "largeur", value: string) => {
        const numValue = safeNumber(value);
        setCustomSize(prev => ({ ...prev, [field]: numValue }));
    };

    return (
        // --- Nouvelle Structure Card ---
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-semibold">
                    <Maximize2 className="h-6 w-6 text-red-500 " />
                    Grand Format & PVC
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-4/5 space-y-1 ">
                        
                        {/* --- Navigation Tabs --- */}
                        <div className="sticky gap-5 space-x-2 top-0 bg-white dark:bg-slate-900 z-10 pb-0 pt-2 border-b border-slate-200 dark:border-slate-700">
                            <Tabs value={activeTab} onValueChange={scrollToSection} className="w-full">
                                <TabsList className="flex-wrap h-auto p-1 bg-white dark:bg-slate-900">
                                    <TabsTrigger value="type" className="flex items-center gap-1 text-xs ">
                                        <Layers className="h-3 w-3" />
                                        Type
                                    </TabsTrigger>
                                    <TabsTrigger value="dimensions" className="flex items-center gap-1 text-xs " disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Dimensions
                                    </TabsTrigger>
                                    <TabsTrigger value="laize" className="flex items-center gap-1 text-xs" disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Laize
                                    </TabsTrigger>
                                    <TabsTrigger value="face" className="flex items-center gap-1 text-xs" disabled={!selectedType || getCurrentFaces().length === 0}>
                                        <Layers className="h-3 w-3" />
                                        Face
                                    </TabsTrigger>
                                    <TabsTrigger value="finition" className="flex items-center gap-1 text-xs" disabled={!selectedType || getCurrentFinitions().length === 0}>
                                        <Layers className="h-3 w-3" />
                                        Finition
                                    </TabsTrigger>
                                    <TabsTrigger value="particularites" className="flex items-center gap-1 text-xs" disabled={!selectedType || getCurrentParticularites().length === 0}>
                                        <Layers className="h-3 w-3" />
                                        Particularités
                                    </TabsTrigger>
                                    <TabsTrigger value="epaisseur" className="flex items-center gap-1 text-xs" disabled={!selectedType || getCurrentEpaisseurs().length === 0}>
                                        <Layers className="h-3 w-3" />
                                        Épaisseur
                                    </TabsTrigger>
                                    <TabsTrigger value="couleur" className="flex items-center gap-1 text-xs" disabled={selectedType !== 'plexi'}>
                                        <Layers className="h-3 w-3" />
                                        Couleur
                                    </TabsTrigger>
                                    <TabsTrigger value="options" className="flex items-center gap-1 text-xs" disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Options
                                    </TabsTrigger>
                                    <TabsTrigger value="quantite" className="flex items-center gap-1 text-xs" disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Quantité
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        
                        {/* --- Contenu Scrollable --- */}
                        <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2">
                            
                            {/* Type de Produit */}
                            <div ref={typeRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Type de Produit
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
                                    <div ref={dimensionsRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Dimensions (Sur mesure)
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
                                    <div ref={laizeRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Largeur (Laize)
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentLaizes().map(laize => (
                                                <button
                                                    key={laize.id}
                                                    onClick={() => handleSelect(laize.id, 'laize_id', 'laize', laize.laize)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.laize_id === laize.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{laize.laize}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Face */}
                                    {getCurrentFaces().length > 0 && (
                                        <div ref={faceRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Face d&apos;impression
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentFaces().map(face => (
                                                    <button
                                                        key={face.id}
                                                        onClick={() => handleSelect(face.id, 'face_id', 'face', face.face)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.face_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{face.face}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Finition */}
                                    {getCurrentFinitions().length > 0 && (
                                        <div ref={finitionRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Finition
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentFinitions().map(finition => (
                                                    <button
                                                        key={finition.id}
                                                        onClick={() => handleSelect(finition.id, 'finition_id', 'finition', finition.finition)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.finition_id === finition.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{finition.finition}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Particularités */}
                                    {getCurrentParticularites().length > 0 && (
                                        <div ref={particularitesRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Particularités
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentParticularites().map(particularite => (
                                                    <button
                                                        key={particularite.id}
                                                        onClick={() => handleSelect(particularite.id, 'particularite_id', 'particularite', particularite.particularite)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.particularite_id === particularite.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold text-xs">{particularite.particularite}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Épaisseur (PVC et Plexi) */}
                                    {getCurrentEpaisseurs().length > 0 && (
                                        <div ref={epaisseurRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Épaisseur
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentEpaisseurs().map(epaisseur => (
                                                    <button
                                                        key={epaisseur.id}
                                                        onClick={() => handleSelect(epaisseur.id, 'epaisseur_id', 'epaisseur', epaisseur.epaisseur)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.epaisseur_id === epaisseur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{epaisseur.epaisseur}</div>
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
                                        <div ref={couleurRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Couleur
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {GrandFormatData.couleurs_plexi.map(couleur => (
                                                    <button
                                                        key={couleur.id}
                                                        onClick={() => handleSelect(couleur.id, 'couleur_id', 'couleur', couleur.couleur)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGrandFormat.couleur_id === couleur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{couleur.couleur}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Options supplémentaires */}
                                    <div ref={optionsRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Options supplémentaires
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    value={devisGrandFormat.finitionPrix!.toString() }
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
                                    <div ref={quantiteRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Quantité
                                        </h4>
                                        <Input 
                                            type="number" 
                                            value={devisGrandFormat.quantite!.toString()} 
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
            </CardContent>
        </Card>
    );
}