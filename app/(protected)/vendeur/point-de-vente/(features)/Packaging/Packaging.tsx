import { GetClientID } from '@/sources/actions/admin/client.action'
import { CartItemsType, clientType, devisPackagingData } from '@/sources/types/type'
import { Layers, PackageOpenIcon } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react'
import OptionOverview from '../OptionOverview/OptionOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart?: (cartItem: CartItemsType, devis: devisPackagingData) => void;
}

export default function Packaging({ param, userRole, handleAddCart }: PrintArticleProps) {
    const [selectedPackagingType, setSelectedPackagingType] = useState<string>('');
    const [activeTab, setActiveTab] = useState('type');
    
    // Références pour le scroll
    const typeRef = useRef<HTMLDivElement>(null);
    const dimensionRef = useRef<HTMLDivElement>(null);
    const materiauRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const decoupeRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const particulariteRef = useRef<HTMLDivElement>(null);
    const finitionRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // Données mock complètes pour le packaging
    const PackagingData = {
        types: [
            { id: 1, type: 'hangtag', nom: 'Hangtag' },
            { id: 2, type: 'etiquette', nom: 'Étiquette prédécoupée' },
            { id: 3, type: 'boite', nom: 'Boîte' },
            { id: 4, type: 'doypack', nom: 'Doypack' },
            { id: 5, type: 'sac_papier', nom: 'Sac papier' }
        ],
        
        dimensions: {
            hangtag: [
                { id: 1, dimension: '1/10 A4', unitee: '85x55mm', pose: '8', prix_base: 50 },
                { id: 2, dimension: '1/12 A4', unitee: '70x50mm', pose: '12', prix_base: 45 },
                { id: 3, dimension: '1/16 A4', unitee: '52x37mm', pose: '16', prix_base: 40 },
                { id: 4, dimension: '1/20 A4', unitee: '42x30mm', pose: '20', prix_base: 35 },
                { id: 5, dimension: '1/24 A4', unitee: '35x25mm', pose: '24', prix_base: 30 }
            ],
            etiquette: [
                { id: 6, dimension: '50x50mm', unitee: '50x50mm', pose: '1', prix_base: 80 },
                { id: 8, dimension: 'Linéaire', unitee: '100x30mm', pose: '1', prix_base: 120 }
            ],
            boite: [
                { id: 9, dimension: 'Devis Manuel', unitee: 'personnalisée', pose: '1', prix_base: 200 },
            ],
            doypack: [
                { id: 10, dimension: 'Sur Devis', unitee: 'personnalisée', pose: '1', prix_base: 200 },
            ],
            sac_papier: [
                { id: 11, dimension: 'Sur Devis', unitee: 'personnalisée', pose: '1', prix_base: 200 },
            ]
        },

        materiaux: {
            hangtag: [
                { id: 2, categorie: 'PCB', accessoire: '250G', prix: 25 },
                { id: 3, categorie: 'PCB', accessoire: '300G', prix: 30 },
                { id: 4, categorie: 'PCB', accessoire: '350G', prix: 35 },
                { id: 5, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 6, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 8, categorie: 'PCB pellicule', accessoire: '250G', prix: 45 },
                { id: 9, categorie: 'PCB pellicule', accessoire: '300G', prix: 45 },
                { id: 10, categorie: 'PCB pellicule', accessoire: '350G', prix: 45 },
                { id: 11, categorie: 'PCB pellicule', accessoire: '600G', prix: 45 },
                { id: 12, categorie: 'autres', accessoire: '', prix: 45 }
            ],
            etiquette: [
                { id: 13, categorie: 'Vynil blanc', accessoire: '', prix: 60 },
                { id: 14, categorie: 'Vynil transparent', accessoire: '', prix: 50 }
            ],
            boite: [
                { id: 15, categorie: 'PCB', accessoire: '250G', prix: 100 },
                { id: 16, categorie: 'PCB', accessoire: '300G', prix: 120 },
                { id: 17, categorie: 'PCB', accessoire: '350G', prix: 140 },
                { id: 18, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 19, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 20, categorie: 'PCB pellicule', accessoire: '170G', prix: 40 },
                { id: 21, categorie: 'PCB pellicule', accessoire: '250G', prix: 45 },
                { id: 22, categorie: 'PCB pellicule', accessoire: '300G', prix: 45 },
                { id: 23, categorie: 'PCB pellicule', accessoire: '350G', prix: 45 },
                { id: 24, categorie: 'PCB pellicule', accessoire: '600G', prix: 45 },
                { id: 25, categorie: 'Autres', accessoire: '', prix: 45 }
            ],
            doypack: [
                { id: 26, categorie: 'Aluminium', accessoire: '', prix: 150 },
                { id: 27, categorie: 'Kraft', accessoire: '', prix: 100 },
                { id: 28, categorie: 'Plastique', accessoire: '', prix: 120 }
            ],
            sac_papier: [
                { id: 29, categorie: 'Kraft Naturel', accessoire: '', prix: 80 },
                { id: 30, categorie: 'Papier Standard', accessoire: '', prix: 60 },
                { id: 31, categorie: 'Autres', accessoire: '', prix: 70 }
            ]
        },

        couleurs: {
            hangtag: [
                { id: 1, couleur: 'Niveau de Gris', prix: 150 },
                { id: 2, couleur: 'Quadri CMJN', prix: 150 },
            ],
            etiquette: [
                { id: 3, couleur: 'Quadri CMJN', prix: 150 },
                { id: 4, couleur: 'autres', prix: 150 },
            ],
            boite: [
                { id: 5, couleur: 'Niveau de Gris', prix: 150 },
                { id: 6, couleur: 'Quadri CMJN', prix: 150 },
            ],
            doypack: [
                { id: 7, couleur: 'non disponible', prix: 0 },
            ],
            sac_papier: [
                { id: 8, couleur: 'Niveau de Gris', prix: 150 },
                { id: 9, couleur: 'Quadri CMJN', prix: 150 },
                { id: 10, couleur: 'autres', prix: 150 },
            ],
        },

        recto_verso: [
            { id: 1, type: 'Recto', code: 'recto', multiplicateur: 1 },
            { id: 2, type: 'Recto-Verso', code: 'recto-verso', multiplicateur: 2 }
        ],

        imprimantes: {
            hangtag: [
                { id: 1, imprimante: "Jet d'encre", prix: 150 },
                { id: 2, imprimante: 'Laser', prix: 150 },
            ],
            etiquette: [
                { id: 3, imprimante: "Jet d'encre", prix: 150 },
                { id: 4, imprimante: 'Laser', prix: 150 },
                { id: 5, imprimante: 'Eco-Solvant', prix: 150 },
            ],
            boite: [
                { id: 6, imprimante: "Jet d'encre", prix: 150 },
                { id: 7, imprimante: 'Laser', prix: 150 },
            ],
            doypack: [
                { id: 8, imprimante: "Jet d'encre", prix: 150 },
                { id: 9, imprimante: 'Laser', prix: 150 },
                { id: 10, imprimante: 'Eco-Solvant', prix: 150 },
            ],
            sac_papier: [
                { id: 11, imprimante: "Jet d'encre", prix: 150 },
                { id: 12, imprimante: 'Laser', prix: 150 },
                { id: 13, imprimante: 'Eco-Solvant', prix: 150 },
            ],
        },

        finitions: {
            hangtag: [
                { id: 1, finition: "Trou", prix: 150 },
                { id: 2, finition: 'autres', prix: 150 },
            ],
            etiquette: [
                { id: 3, finition: "Pelliculage à froid", prix: 150 },
                { id: 4, finition: 'autres', prix: 150 },
            ],
            boite: [
                { id: 5, finition: "aucun", prix: 0 },
            ],
            doypack: [
                { id: 6, finition: "aucun", prix: 0 },
            ],
            sac_papier: [
                { id: 7, finition: "aucun", prix: 0 },
            ],
        },

        emplacement: {
            hangtag: [
                { id: 1, emplacement: 'centre', prix: 10},
                { id: 2, emplacement: 'gauche', prix: 10},
                { id: 3, emplacement: 'droite', prix: 10},
                { id: 4, emplacement: 'bas', prix: 10},
                { id: 5, emplacement: 'autres', prix: 10},
            ],
            etiquette: [
                { id: 6, emplacement: 'non disponible', prix: 0},
            ],
            boite: [
                { id: 7, emplacement: 'centre', prix: 10},
                { id: 8, emplacement: 'gauche', prix: 10},
                { id: 9, emplacement: 'droite', prix: 10},
                { id: 10, emplacement: 'bas', prix: 10},
                { id: 11, emplacement: 'autres', prix: 10},
            ],
            doypack: [
                { id: 12, emplacement: 'centre', prix: 10},
                { id: 13, emplacement: 'gauche', prix: 10},
                { id: 14, emplacement: 'droite', prix: 10},
                { id: 15, emplacement: 'bas', prix: 10},
                { id: 16, emplacement: 'autres', prix: 10},
            ],
            sac_papier: [
                { id: 17, emplacement: 'centre', prix: 10},
                { id: 18, emplacement: 'gauche', prix: 10},
                { id: 19, emplacement: 'droite', prix: 10},
                { id: 20, emplacement: 'bas', prix: 10},
                { id: 21, emplacement: 'autres', prix: 10},
            ]
        },

        decoupes: {
            hangtag: ['Cercle', 'Carré', 'Rectangle', 'Personnalisé'],
            etiquette: ['Rectangulaire', 'Ronde', 'Ovale', 'Personnalisé'],
            boite: ['aucun'],
            doypack: ['aucun'],
            sac_papier: ['aucun']
        },

        particularites: {
            hangtag: ['Cordelette', 'Attache', 'Coins arrondis', 'Oeillet'],
            etiquette: ['aucun'],
            boite: ['Forme type de Fermeture'],
            doypack: ['aucun'],
            sac_papier: ['aucun']
        }
    };

    const [client, setClient] = useState<clientType>();
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);
    const [materiauSelected, setMateriauSelected] = useState<{categorie: string, accessoire: string}>({
        categorie: '',
        accessoire: ''
    });

    const [devisPackaging, setDevisPackaging] = useState<devisPackagingData>({
        client_id: 0,
        type: '',
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
        finition: '',
        option: '',
        optionPrix: '',
        finitionPrix: 0,
        decoupe: '',
        particularite: '',
        emplacement: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisPackaging(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonctions pour obtenir les données dynamiques basées sur le type sélectionné
    const getCurrentDimensions = () => {
        if (!selectedPackagingType) return [];
        return PackagingData.dimensions[selectedPackagingType as keyof typeof PackagingData.dimensions] || [];
    };

    const getCurrentMateriaux = () => {
        if (!selectedPackagingType) return [];
        return PackagingData.materiaux[selectedPackagingType as keyof typeof PackagingData.materiaux] || [];
    };

    const getCurrentEmplacement = () => {
        if (!selectedPackagingType) return [];
        return PackagingData.emplacement[selectedPackagingType as keyof typeof PackagingData.emplacement] || [];
    };

    const getCurrentCouleur = () => {
        if(!selectedPackagingType) return [];
        return PackagingData.couleurs[ selectedPackagingType as keyof typeof PackagingData.couleurs] || [];
    }

    const getCurrentImprimante = () => {
        if(!selectedPackagingType) return [];
        return PackagingData.imprimantes[ selectedPackagingType as keyof typeof PackagingData.imprimantes] || [];
    }

    const getCurrentDecoupes = () => {
        if (!selectedPackagingType) return [];
        return PackagingData.decoupes[selectedPackagingType as keyof typeof PackagingData.decoupes] || [];
    };

    const getCurrentFinition = () => {
        if (!selectedPackagingType) return [];
        return PackagingData.finitions[selectedPackagingType as keyof typeof PackagingData.finitions] || [];
    };

    const getCurrentParticularites = () => {
        if (!selectedPackagingType) return [];
        return PackagingData.particularites[selectedPackagingType as keyof typeof PackagingData.particularites] || [];
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Fonction de scroll vers une section
    const scrollToSection = (section: string) => {
        setActiveTab(section);
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            type: typeRef,
            dimension: dimensionRef,
            materiau: materiauRef,
            couleur: couleurRef,
            face: faceRef,
            imprimante: imprimanteRef,
            decoupe: decoupeRef,
            emplacement: emplacementRef,
            particularite: particulariteRef,
            finition: finitionRef,
            quantite: quantiteRef
        };

        if (refs[section]?.current) {
            refs[section].current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Calcul du prix
    useEffect(() => {
        if (!selectedPackagingType) {
            setPrixUnitaireReel(0);
            setPrixTotalReel(0);
            return;
        }

        let prixTotal = 0;

        // Prix de base selon la dimension
        const dimension = getCurrentDimensions().find(d => d.id === devisPackaging.dimension_id);
        if (dimension) {
            prixTotal += safeNumber(dimension.prix_base);
        }

        // Prix du matériau
        const materiau = getCurrentMateriaux().find(m => m.id === devisPackaging.materiau_id);
        if (materiau) {
            prixTotal += safeNumber(materiau.prix);
        }

        // Supplément couleur
        const couleur = getCurrentCouleur().find(c => c.id === safeNumber(devisPackaging.couleur_id));
        if (couleur) {
            prixTotal += safeNumber(couleur.prix);
        }

        // Multiplicateur recto-verso
        const rectoVerso = PackagingData.recto_verso.find(r => r.id === devisPackaging.recto_verso_id);
        if (rectoVerso) {
            prixTotal *= safeNumber(rectoVerso.multiplicateur);
        }

        // Supplément imprimante
        const imprimante = getCurrentImprimante().find(i => i.id === devisPackaging.imprimante_id);
        if (imprimante) {
            prixTotal += safeNumber(imprimante.prix);
        }

        // Prix de la finition
        const finition = getCurrentFinition().find(f => f.id === devisPackaging.finition_id);
        if (finition) {
            prixTotal += safeNumber(finition.prix);
        }

        // Prix de l'emplacement
        const emplacement = getCurrentEmplacement().find(e => e.id === devisPackaging.emplacement_id);
        if (emplacement) {
            prixTotal += safeNumber(emplacement.prix);
        }

        // Ajouter la finition personnalisée
        prixTotal += safeNumber(devisPackaging.finitionPrix);

        // Calcul du total avec quantité
        const quantite = safeNumber(devisPackaging.quantite);
        const prixUnitaire = Math.max(0, prixTotal); // Éviter les prix négatifs
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisPackaging, selectedPackagingType, materiauSelected]);

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisPackaging(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    const initializeDevisPackaging = () => {
        setDevisPackaging({
            client_id: Number(client?.id_client),
            type: '',
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
            finition: '',
            option: '',
            optionPrix: '',
            finitionPrix: 0,
            decoupe: '',
            particularite: '',
            emplacement: ''
        });
        setSelectedPackagingType('');
        setMateriauSelected({ categorie: '', accessoire: '' });
    };

    const handleAddToCart = () => {
        const packagingType = PackagingData.types.find(t => t.id === devisPackaging.packaging_id);
        
        const detailsDevis = `
                Type: ${packagingType?.nom}
                Dimension: ${devisPackaging.dimension || 'Non spécifié'}
                Couleur: ${devisPackaging.couleur || 'Non spécifié'}
                Matériau: ${devisPackaging.materiau || 'Non spécifié'}
                Face: ${devisPackaging.recto === 'recto' ? 'Recto seulement' : 'Recto-Verso'}
                Imprimante: ${devisPackaging.imprimante || 'Non spécifié'}
                Finition: ${devisPackaging.finition || 'Aucune'}
                Découpe: ${devisPackaging.decoupe || 'Standard'}
                Emplacement: ${devisPackaging.emplacement || 'Standard'}
                Particularité: ${devisPackaging.particularite || 'Aucune'}`;

        const packagingItem: CartItemsType = {
            id: Date.now(),
            designation: `Packaging - ${packagingType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(devisPackaging.quantite),
            remise: 0.00,
            service: 'Packaging',
        };
        
        setDevisPackaging(prev => ({ ...prev, montant: String(prixTotalReel) }));
        if (handleAddCart) {
            handleAddCart(packagingItem, devisPackaging);
        }
        initializeDevisPackaging();
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-semibold">
                    <PackageOpenIcon className="h-6 w-6 text-red-500 " />
                    Packaging & Boites
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-4/5 space-y-1">
                        {/* Navigation Tabs - Accès rapide */}
                        <div className="sticky gap-5 space-x-2 top-0 bg-white dark:bg-slate-900 z-10 pb-0 pt-2 border-b border-slate-200 dark:border-slate-700">
                            <Tabs value={activeTab} onValueChange={scrollToSection} className="w-full">
                                <TabsList className="flex-wrap h-auto p-1 bg-white dark:bg-slate-900">
                                    <TabsTrigger value="type" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Type
                                    </TabsTrigger>
                                    <TabsTrigger value="dimension" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Dimension
                                    </TabsTrigger>
                                    <TabsTrigger value="materiau" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Matériau
                                    </TabsTrigger>
                                    <TabsTrigger value="couleur" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Couleur
                                    </TabsTrigger>
                                    <TabsTrigger value="face" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Face
                                    </TabsTrigger>
                                    <TabsTrigger value="imprimante" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Impression
                                    </TabsTrigger>
                                    <TabsTrigger value="decoupe" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Découpe
                                    </TabsTrigger>
                                    <TabsTrigger value="emplacement" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Emplacement
                                    </TabsTrigger>
                                    <TabsTrigger value="particularite" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Particularité
                                    </TabsTrigger>
                                    <TabsTrigger value="finition" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Finition
                                    </TabsTrigger>
                                    <TabsTrigger value="quantite" className="flex items-center gap-1 text-xs">
                                        <Layers className="h-3 w-3" />
                                        Quantité
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* Contenu complet avec toutes les sections */}
                        <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2">
                            {/* Section Type de Packaging */}
                            <div className='flex'>
                                <div ref={typeRef} className="w-full lg:w-1/2 scroll-mt-20">
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="mr-2" />
                                        Type de Produit
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {PackagingData.types.map(type => (
                                            <button
                                                key={type.id}
                                                onClick={() => {
                                                    handleSelect(type.id, 'packaging_id', 'type', type.type);
                                                    setSelectedPackagingType(type.type);
                                                }}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.packaging_id === type.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <span>{type.nom}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {selectedPackagingType && (
                                <>
                                    {/* Section Dimension */}
                                    <div className='flex'>
                                        <div ref={dimensionRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Dimension
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentDimensions().map(dimension => (
                                                    <button
                                                        key={dimension.id}
                                                        onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{dimension.dimension}</div>
                                                        <div className={`text-xs `}>{dimension.unitee}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Matériau */}
                                    <div className='flex'>
                                        <div ref={materiauRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Matériau
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentMateriaux().map(materiau => (
                                                    <button
                                                        key={materiau.id}
                                                        onClick={() => {
                                                            handleSelect(materiau.id, 'materiau_id', 'materiau', `${materiau.categorie} ${materiau.accessoire}`.trim());
                                                            setMateriauSelected({ 
                                                                categorie: materiau.categorie, 
                                                                accessoire: materiau.accessoire 
                                                            });
                                                        }}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.materiau_id === materiau.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{materiau.accessoire || materiau.categorie}</div>
                                                        <div className="text-xs">{materiau.accessoire ? materiau.categorie : ''}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Couleur */}
                                    <div className='flex'>
                                        <div ref={couleurRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Couleur
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentCouleur().map(couleur => (
                                                    <button
                                                        key={couleur.id}
                                                        onClick={() => handleSelect(couleur.id.toString(), 'couleur_id', 'couleur', couleur.couleur)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.couleur_id === couleur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <span>{couleur.couleur}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Recto/Verso */}
                                    <div className='flex'>
                                        <div ref={faceRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Face
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {PackagingData.recto_verso.map(recto => (
                                                    <button
                                                        key={recto.id}
                                                        onClick={() => handleSelect(recto.id, 'recto_verso_id', 'recto', recto.code)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.recto_verso_id === recto.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <span>{recto.type}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Imprimante */}
                                    <div className='flex'>
                                        <div ref={imprimanteRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Technologie d&apos;impression
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentImprimante().map(imprimante => (
                                                    <button
                                                        key={imprimante.id}
                                                        onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{imprimante.imprimante}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Découpe */}
                                    {getCurrentDecoupes().length > 0 && getCurrentDecoupes()[0] !== 'aucun' && (
                                        <div className='flex'>
                                            <div ref={decoupeRef} className="w-full lg:w-1/2 scroll-mt-20">
                                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                    <Layers className="mr-2" />
                                                    Type de découpe
                                                </h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {getCurrentDecoupes().map((decoupe, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleSelect(decoupe, 'decoupe')}
                                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.decoupe === decoupe ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                        >
                                                            <span>{decoupe}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Section Emplacement */}
                                    {getCurrentEmplacement().length > 0 && getCurrentEmplacement()[0].emplacement !== 'non disponible' && (
                                        <div className='flex'>
                                            <div ref={emplacementRef} className="w-full lg:w-1/2 scroll-mt-20">
                                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                    <Layers className="mr-2" />
                                                    Emplacement d&apos;impression
                                                </h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {getCurrentEmplacement().map(emplacement => (
                                                        <button
                                                            key={emplacement.id}
                                                            onClick={() => handleSelect(emplacement.emplacement, 'emplacement')}
                                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.emplacement === emplacement.emplacement ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                        >
                                                            <div className="font-semibold">{emplacement.emplacement}</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Section Particularités */}
                                    {getCurrentParticularites().length > 0 && getCurrentParticularites()[0] !== 'aucun' && (
                                        <div className='flex'>
                                            <div ref={particulariteRef} className="w-full lg:w-1/2 scroll-mt-20">
                                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                    <Layers className="mr-2" />
                                                    Particularités
                                                </h4>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {getCurrentParticularites().map((part, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleSelect(part, 'particularite')}
                                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.particularite === part ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                        >
                                                            <span>{part}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Section Finition */}
                                    <div className='flex'>
                                        <div ref={finitionRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Finition
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentFinition().map(finition => (
                                                    <button
                                                        key={finition.id}
                                                        onClick={() => handleSelect(finition.id, 'finition_id', 'finition', finition.finition)}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisPackaging.finition_id === finition.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <div className="font-semibold">{finition.finition}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section Quantité */}
                                    <div className='flex'>
                                        <div ref={quantiteRef} className="w-full lg:w-1/2 scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Quantité
                                            </h4>
                                            <Input 
                                                type="number" 
                                                value={devisPackaging.quantite.toString()} 
                                                onChange={e => handleSelect(Math.max(1, Number(e.target.value)), 'quantite')} 
                                                placeholder="Ex: 100" 
                                                min="1"
                                            />
                                        </div>
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
                        devisPackaging={devisPackaging} 
                    />
                </div>
            </CardContent>  
        </Card>
    );
}
