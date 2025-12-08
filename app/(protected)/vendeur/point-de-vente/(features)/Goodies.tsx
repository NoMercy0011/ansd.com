import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
// import Accordion from '@/sources/components/ui/accordion' // Remplacé
import { CartItemsType, clientType, devisGoodiesData } from '@/types/type'
import { Layers, Gift } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react' // Ajout de useRef
import OptionOverview from './OptionOverview/OptionOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Ajout
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs' // Ajout

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisGoodiesData) => void;
}

export default function Goodies({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock (inchangées)
    const GoodiesData = {
        types: [
            { id: 1, type: 'mug', nom: 'Mug' },
            { id: 2, type: 'gourde', nom: 'Gourde' },
            { id: 3, type: 'tasse', nom: 'Tasse' },
            { id: 4, type: 'tapis_souris', nom: 'Tapis souris' },
            { id: 5, type: 'briquet', nom: 'Briquet' },
            { id: 6, type: 'usb', nom: 'USB' },
            { id: 7, type: 'parapluie', nom: 'Parapluie' },
            { id: 8, type: 'stylo', nom: 'Stylo' },
            { id: 9, type: 'porte_cles', nom: 'Porte-clés' },
            { id: 10, type: 'pins_badge', nom: "Pin's / Badge" }
        ],
        
        types_specifiques: {
            mug: [
                { id: 1, type: 'Classique', prix_base: 8000 },
                { id: 2, type: 'Magique', prix_base: 12000 }
            ],
            gourde: [
                { id: 3, type: 'Plastique', prix_base: 15000 },
                { id: 4, type: 'Métal', prix_base: 20000 },
                { id: 5, type: 'Thermos', prix_base: 25000 }
            ],
            tasse: [
                { id: 6, type: 'Standard', prix_base: 6000 }
            ],
            tapis_souris: [
                { id: 7, type: 'Type 1', prix_base: 5000 },
                { id: 8, type: 'Type 2', prix_base: 7000 },
                { id: 9, type: 'Type 3', prix_base: 9000 }
            ],
            briquet: [
                { id: 10, type: 'Classique', prix_base: 3000 },
                { id: 11, type: 'Tempête', prix_base: 5000 }
            ],
            usb: [
                { id: 12, type: 'Forme USB', prix_base: 15000 }
            ],
            parapluie: [
                { id: 13, type: 'Standard', prix_base: 20000 }
            ],
            stylo: [
                { id: 14, type: 'Plastique', prix_base: 2000 },
                { id: 15, type: 'Métal', prix_base: 5000 },
                { id: 16, type: 'autres', prix_base: 4000 }
            ],
            porte_cles: [
                { id: 17, type: 'Métal', prix_base: 4000 },
                { id: 18, type: 'Plastique', prix_base: 3000 },
                { id: 19, type: 'Acrylic', prix_base: 6000 },
                { id: 20, type: 'PVC', prix_base: 3500 }
            ],
            pins_badge: [
                { id: 21, type: 'Standard', prix_base: 2000 }
            ]
        },

        capacites: {
            mug: [
                { id: 1, capacite: '300 ml', prix: 0 },
                { id: 2, capacite: '400 ml', prix: 1000 },
                { id: 3, capacite: '500 ml', prix: 2000 }
            ],
            gourde: [
                { id: 4, capacite: '500 ml', prix: 0 },
                { id: 5, capacite: '750 ml', prix: 3000 },
                { id: 6, capacite: '1 L', prix: 5000 }
            ],
            tasse: [
                { id: 7, capacite: '250 ml', prix: 0 },
                { id: 8, capacite: '300 ml', prix: 1000 },
                { id: 9, capacite: '350 ml', prix: 1500 }
            ],
            tapis_souris: [
                { id: 10, capacite: 'Type 1', prix: 0 },
                { id: 11, capacite: 'Type 2', prix: 2000 },
                { id: 12, capacite: 'Type 3', prix: 4000 }
            ],
            briquet: [
                { id: 13, capacite: 'Standard', prix: 0 }
            ],
            usb: [
                { id: 14, capacite: '4GB', prix: 5000 },
                { id: 15, capacite: '8GB', prix: 7000 },
                { id: 16, capacite: '16GB', prix: 10000 },
                { id: 17, capacite: '32GB', prix: 15000 },
                { id: 18, capacite: '64GB+', prix: 20000 }
            ],
            parapluie: [
                { id: 19, capacite: '80 cm diamètre', prix: 0 },
                { id: 20, capacite: '100 cm diamètre', prix: 3000 },
                { id: 21, capacite: '120 cm diamètre', prix: 5000 }
            ],
            stylo: [
                { id: 22, capacite: 'Standard', prix: 0 }
            ],
            porte_cles: [
                { id: 23, capacite: 'Sur mesure', prix: 0 }
            ],
            pins_badge: [
                { id: 24, capacite: '25 mm', prix: 0 },
                { id: 25, capacite: '35 mm', prix: 1000 },
                { id: 26, capacite: '45 mm', prix: 2000 }
            ]
        },

        emplacements: {
            mug: [
                { id: 1, emplacement: 'Face', prix: 0 },
                { id: 2, emplacement: 'Gauche', prix: 1000 },
                { id: 3, emplacement: 'Droite', prix: 1000 }
            ],
            gourde: [
                { id: 4, emplacement: 'Face', prix: 0 },
                { id: 5, emplacement: 'Gauche', prix: 1500 },
                { id: 6, emplacement: 'Droite', prix: 1500 }
            ],
            tasse: [
                { id: 7, emplacement: 'Face', prix: 0 }
            ],
            tapis_souris: [
                { id: 8, emplacement: 'Standard', prix: 0 }
            ],
            briquet: [
                { id: 9, emplacement: 'Face/Dos', prix: 0 }
            ],
            usb: [
                { id: 10, emplacement: 'Recto', prix: 0 },
                { id: 11, emplacement: 'Recto/Verso', prix: 2000 }
            ],
            parapluie: [
                { id: 12, emplacement: 'Standard', prix: 0 }
            ],
            stylo: [
                { id: 13, emplacement: 'Face', prix: 0 },
                { id: 14, emplacement: '2 faces', prix: 1500 }
            ],
            porte_cles: [
                { id: 15, emplacement: 'Recto', prix: 0 },
                { id: 16, emplacement: 'Recto/Verso', prix: 1000 }
            ],
            pins_badge: [
                { id: 17, emplacement: 'Standard', prix: 0 }
            ]
        },

        technologies: {
            mug: [
                { id: 1, technologie: 'Sublimation', prix: 0 },
                { id: 2, technologie: 'UV DTF', prix: 2000 }
            ],
            gourde: [
                { id: 3, technologie: 'Sublimation', prix: 0 },
                { id: 4, technologie: 'UV DTF', prix: 2500 }
            ],
            tasse: [
                { id: 5, technologie: 'Sublimation', prix: 0 },
                { id: 6, technologie: 'UV DTF', prix: 1500 }
            ],
            tapis_souris: [
                { id: 7, technologie: 'Sublimation', prix: 0 },
                { id: 8, technologie: 'DTF', prix: 1000 }
            ],
            briquet: [
                { id: 9, technologie: 'Vynil', prix: 0 },
                { id: 10, technologie: 'UV DTF', prix: 1000 }
            ],
            usb: [
                { id: 11, technologie: 'Sublimation', prix: 0 },
                { id: 12, technologie: 'UV DTF', prix: 2000 },
                { id: 13, technologie: 'Vynil', prix: 1500 }
            ],
            parapluie: [
                { id: 14, technologie: 'Sublimation', prix: 0 },
                { id: 15, technologie: 'UV DTF', prix: 3000 },
                { id: 16, technologie: 'DTF', prix: 2000 }
            ],
            stylo: [
                { id: 17, technologie: 'Sublimation', prix: 0 },
                { id: 18, technologie: 'UV DTF', prix: 1000 },
                { id: 19, technologie: 'Vynil', prix: 500 }
            ],
            porte_cles: [
                { id: 20, technologie: 'Sublimation', prix: 0 },
                { id: 21, technologie: 'UV DTF', prix: 1500 },
                { id: 22, technologie: 'Direct', prix: 1000 }
            ],
            pins_badge: [
                { id: 23, technologie: 'Sublimation', prix: 0 },
                { id: 24, technologie: 'UV DTF', prix: 1000 },
                { id: 25, technologie: 'Direct', prix: 500 }
            ]
        }
    };

    const [client, setClient] = useState<clientType>();
    const [selectedType, setSelectedType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);
    const [autreType, setAutreType] = useState({ nom: '', prix: '' });

    // --- Ajout des Refs et activeTab ---
    const [activeTab, setActiveTab] = useState('type');
    const typeRef = useRef<HTMLDivElement>(null);
    const specifiqueRef = useRef<HTMLDivElement>(null);
    const capaciteRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const technologieRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);
    // --- Fin Ajout ---

    const [devisGoodies, setDevisGoodies] = useState<devisGoodiesData>({
        client_id: 0,
        type: '',
        type_specifique_id: 0,
        type_specifique: '',
        capacite_id: 0,
        capacite: '',
        emplacement_id: 0,
        emplacement: '',
        technologie_id: 0,
        technologie: '',
        goodies_id: 0,
        montant: '',
        quantite: 1,
        finitionPrix: 0,
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
         // Logique de réinitialisation lors du changement de type
        if (name === 'goodies_id') {
            setDevisGoodies(prevState => ({
                client_id: prevState.client_id, // Conserver l'ID client
                goodies_id: Number(value),
                type: optionValue as string,
                quantite: 1, // Réinitialiser la quantité
                // Réinitialiser tous les champs dépendants
                type_specifique_id: 0,
                type_specifique: '',
                capacite_id: 0,
                capacite: '',
                emplacement_id: 0,
                emplacement: '',
                technologie_id: 0,
                technologie: '',
                montant: '',
                finitionPrix: 0,
                optionPrix: ''
            }));
            setAutreType({ nom: '', prix: '' }); // Réinitialiser aussi 'autreType'
        } else {
            setDevisGoodies(prevState => ({
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
            specifique: specifiqueRef,
            capacite: capaciteRef,
            emplacement: emplacementRef,
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
    // --- Fin Fonction de Scroll ---

    // Fonctions pour obtenir les données dynamiques (inchangées)
    const getCurrentTypesSpecifiques = () => {
        if (!selectedType) return [];
        return GoodiesData.types_specifiques[selectedType as keyof typeof GoodiesData.types_specifiques] || [];
    };

    const getCurrentCapacites = () => {
        if (!selectedType) return [];
        return GoodiesData.capacites[selectedType as keyof typeof GoodiesData.capacites] || [];
    };

    const getCurrentEmplacements = () => {
        if (!selectedType) return [];
        return GoodiesData.emplacements[selectedType as keyof typeof GoodiesData.emplacements] || [];
    };

    const getCurrentTechnologies = () => {
        if (!selectedType) return [];
        return GoodiesData.technologies[selectedType as keyof typeof GoodiesData.technologies] || [];
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: string | number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Calcul du prix (utilisation de safeNumber)
    useEffect(() => {
        if (!selectedType) {
            setPrixUnitaireReel(0);
            setPrixTotalReel(0);
            return;
        }

        let prixTotal = 0;

        // Prix de base selon le type spécifique
        const typeSpecifique = getCurrentTypesSpecifiques().find(t => t.id === devisGoodies.type_specifique_id);
        if (typeSpecifique) {
            if (typeSpecifique.type === 'autres') {
                prixTotal += safeNumber(autreType.prix);
            } else {
                prixTotal += safeNumber(typeSpecifique.prix_base);
            }
        }

        // Prix de la capacité
        const capacite = getCurrentCapacites().find(c => c.id === devisGoodies.capacite_id);
        if (capacite) {
            prixTotal += safeNumber(capacite.prix);
        }

        // Prix de l'emplacement
        const emplacement = getCurrentEmplacements().find(e => e.id === devisGoodies.emplacement_id);
        if (emplacement) {
            prixTotal += safeNumber(emplacement.prix);
        }

        // Prix de la technologie
        const technologie = getCurrentTechnologies().find(t => t.id === devisGoodies.technologie_id);
        if (technologie) {
            prixTotal += safeNumber(technologie.prix);
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(devisGoodies.finitionPrix);
        prixTotal += safeNumber(devisGoodies.optionPrix);

        // Calcul du total avec quantité
        const quantite = safeNumber(devisGoodies.quantite);
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisGoodies, selectedType, autreType]);

    // useEffect GetClientID (inchangé)
    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisGoodies(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    // initializeDevisGoodies (inchangé)
    const initializeDevisGoodies = () => {
        setDevisGoodies({
            client_id: Number(client?.id_client),
            type: '',
            type_specifique_id: 0,
            type_specifique: '',
            capacite_id: 0,
            capacite: '',
            emplacement_id: 0,
            emplacement: '',
            technologie_id: 0,
            technologie: '',
            goodies_id: 0,
            montant: '',
            quantite: 1,
            finitionPrix: 0,
            optionPrix: ''
        });
        setSelectedType('');
        setAutreType({ nom: '', prix: '' });
    };

    // handleAddToCart (utilisation de safeNumber)
    const handleAddToCart = () => {
        const goodiesType = GoodiesData.types.find(t => t.id === devisGoodies.goodies_id);
        
        const detailsDevis = `
                Type: ${goodiesType?.nom}
                /Type spécifique: ${devisGoodies.type_specifique === 'autres' ? autreType.nom : devisGoodies.type_specifique}
                /Capacité-Taille: ${devisGoodies.capacite || 'Non spécifié'}
                /Emplacement: ${devisGoodies.emplacement || 'Non spécifié'}
                /Technologie: ${devisGoodies.technologie || 'Non spécifié'}`;

        const goodiesItem: CartItemsType = {
            id: Date.now(),
            designation: `Goodies - ${goodiesType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(devisGoodies.quantite),
            remise: 0.00,
            service: 'Goodies',
        };
        
        setDevisGoodies(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(goodiesItem, devisGoodies);
        initializeDevisGoodies();
    };

    return (
        // --- Nouvelle Structure Card ---
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-semibold">
                    <Gift className="h-6 w-6 text-red-500 " />
                    Goodies
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
                                    <TabsTrigger value="specifique" className="flex items-center gap-1 text-xs " disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Spécifique
                                    </TabsTrigger>
                                    <TabsTrigger value="capacite" className="flex items-center gap-1 text-xs" disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Capacité
                                    </TabsTrigger>
                                    <TabsTrigger value="emplacement" className="flex items-center gap-1 text-xs" disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Emplacement
                                    </TabsTrigger>
                                    <TabsTrigger value="technologie" className="flex items-center gap-1 text-xs" disabled={!selectedType}>
                                        <Layers className="h-3 w-3" />
                                        Technologie
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
                                    {GoodiesData.types.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                handleSelect(type.id, 'goodies_id', 'type', type.type);
                                                setSelectedType(type.type);
                                            }}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGoodies.goodies_id === type.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <span>{type.nom}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedType && (
                                <>
                                    {/* Type Spécifique */}
                                    <div ref={specifiqueRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Type Spécifique
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentTypesSpecifiques().map(typeSpecifique => (
                                                <button
                                                    key={typeSpecifique.id}
                                                    onClick={() => handleSelect(typeSpecifique.id, 'type_specifique_id', 'type_specifique', typeSpecifique.type)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGoodies.type_specifique_id === typeSpecifique.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{typeSpecifique.type}</div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Input pour type "autres" */}
                                        {devisGoodies.type_specifique === 'autres' && (
                                            <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <h5 className="font-semibold mb-3">Type personnalisé</h5>
                                                <div className="space-y-3">
                                                    <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={autreType.nom}
                                                            onChange={(e) => setAutreType(prev => ({ ...prev, nom: e.target.value }))}
                                                            placeholder="Description du type personnalisé"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            value={autreType.prix}
                                                            onChange={(e) => setAutreType(prev => ({ ...prev, prix: e.target.value }))}
                                                            placeholder="Prix supplémentaire"
                                                            min="0"
                                                        />
                                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Capacité / Taille */}
                                    <div ref={capaciteRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Capacité / Taille
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentCapacites().map(capacite => (
                                                <button
                                                    key={capacite.id}
                                                    onClick={() => handleSelect(capacite.id, 'capacite_id', 'capacite', capacite.capacite)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGoodies.capacite_id === capacite.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{capacite.capacite}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Emplacement d'impression */}
                                    <div ref={emplacementRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Emplacement d&apos;impression
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentEmplacements().map(emplacement => (
                                                <button
                                                    key={emplacement.id}
                                                    onClick={() => handleSelect(emplacement.id, 'emplacement_id', 'emplacement', emplacement.emplacement)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGoodies.emplacement_id === emplacement.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{emplacement.emplacement}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technologie d'impression */}
                                    <div ref={technologieRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Technologie d&apos;impression
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentTechnologies().map(technologie => (
                                                <button
                                                    key={technologie.id}
                                                    onClick={() => handleSelect(technologie.id, 'technologie_id', 'technologie', technologie.technologie)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisGoodies.technologie_id === technologie.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{technologie.technologie}</div>
                                                </button>
                                            ))}
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
                                            value={devisGoodies.quantite.toString()} 
                                            onChange={e => handleSelect(Math.max(1, safeNumber(e.target.value)), 'quantite')} 
                                            placeholder="Ex: 10" 
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
                        devisGoodies={devisGoodies} 
                    />
                </div>
            </CardContent>
        </Card>
    );
}