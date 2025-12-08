import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import { CartItemsType, clientType, devisCarterieData } from '@/types/type'
import { Layers, Map } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react' // Ajout de useRef
import OptionOverview from './OptionOverview/OptionOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Ajout
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs' // Ajout

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisCarterieData) => void;
}

export default function Carterie({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock (inchangées)
    const CarterieData = {
        types: [
            { id: 1, type: 'carte_visite', nom: 'Carte de visite' },
            { id: 2, type: 'carte_fidelite', nom: 'Carte de fidélité' },
            { id: 3, type: 'jeux_cartes', nom: 'Jeux de cartes' }
        ],
        
        dimensions: [
            { id: 1, dimension: '85x55 mm', unitee: '85x55mm', prix_base: 100 },
            { id: 2, dimension: '91x55 mm', unitee: '91x55mm', prix_base: 120 },
            { id: 3, dimension: 'autres', unitee: 'personnalisée', prix_base: 150 }
        ],

        formes: [
            { id: 1, forme: 'Carré', prix: 0 },
            { id: 2, forme: 'Arrondi', prix: 50 },
            { id: 3, forme: 'autres', prix: 100 }
        ],

        supports: [
            { id: 2, type: 'PCB 350G', prix: 80 },
            { id: 3, type: 'PCB 600G', prix: 120 },
            { id: 4, type: 'Toile fin', prix: 150 },
            { id: 5, type: 'Invitation', prix: 100 },
            { id: 6, type: 'pelliculé brillant/mat 320G', prix: 130 },
            { id: 7, type: 'pelliculé brillant/mat 370G', prix: 160 },
            { id: 8, type: 'PVC Translucide', prix: 200 },
            { id: 9, type: 'PVC Opaque', prix: 180 },
            { id: 10, type: 'pelliculé mixte/mat 320G', prix: 140 },
            { id: 11, type: 'pelliculé mixte/mat 370G', prix: 170 },
            { id: 12, type: 'autres', prix: 200 }
        ],

        faces: [
            { id: 1, face: 'Recto', prix: 0 },
            { id: 2, face: 'Recto/Verso', prix: 80 }
        ],

        imprimantes: [
            { id: 1, imprimante: 'Laser', prix: 60 },
            { id: 2, imprimante: "Jet d'encre photo", prix: 100 }
        ]
    };

    const [client, setClient] = useState<clientType>();
    const [selectedCarterieType, setSelectedCarterieType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);
    const [autreDimension, setAutreDimension] = useState({ nom: '', prix: '' });
    const [autreForme, setAutreForme] = useState({ nom: '', prix: '' });
    const [autreSupport, setAutreSupport] = useState({ nom: '', prix: '' });

    // --- Ajout des Refs et activeTab ---
    const [activeTab, setActiveTab] = useState('type');
    const typeRef = useRef<HTMLDivElement>(null);
    const dimensionRef = useRef<HTMLDivElement>(null);
    const formeRef = useRef<HTMLDivElement>(null);
    const supportRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);
    // --- Fin Ajout ---

    const [devisCarterie, setDevisCarterie] = useState<devisCarterieData>({
        client_id: 0,
        type: '',
        dimension_id: 0,
        dimension: '',
        forme_id: 0,
        forme: '',
        support_id: 0,
        support: '',
        face_id: 0,
        face: '',
        imprimante_id: 0,
        imprimante: '',
        carterie_id: 0,
        montant: '',
        quantite: 100, // Quantité par défaut
        finitionPrix: 0,
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
         // Logique de réinitialisation lors du changement de type
        if (name === 'carterie_id') {
             setDevisCarterie({
                ...devisCarterie,
                ...(option !== undefined && { [option]: optionValue }),
                // Réinitialiser les champs dépendants
                support_id: 0, support: '',
            });
            setAutreSupport({ nom: '', prix: '' });
        } else {
            setDevisCarterie(prevState => ({
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
            dimension: dimensionRef,
            forme: formeRef,
            support: supportRef,
            face: faceRef,
            imprimante: imprimanteRef,
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

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: string | number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Fonction pour filtrer les supports (inchangée)
    const getCurrentSupports = () => {
        if (!selectedCarterieType) return CarterieData.supports;
        
        switch(selectedCarterieType) {
            case 'carte_visite':
                return CarterieData.supports.filter(support => 
                    support.type !== 'pelliculé mixte/mat 320G' && 
                    support.type !== 'pelliculé mixte/mat 370G'
                );
            case 'carte_fidelite':
                return CarterieData.supports.filter(support => 
                    support.type !== 'pelliculé brillant/mat 320G' && 
                    support.type !== 'pelliculé brillant/mat 370G' &&
                    support.type !== 'PVC Translucide' &&
                    support.type !== 'PVC Opaque'
                );
            case 'jeux_cartes':
                return CarterieData.supports.filter(support => 
                    support.type !== 'pelliculé mixte/mat 320G' && 
                    support.type !== 'pelliculé mixte/mat 370G' &&
                    support.type !== 'PVC Translucide'
                );
            default:
                return CarterieData.supports;
        }
    };

    // Calcul du prix (inchangé, juste safeNumber)
    useEffect(() => {
        let prixTotal = 0;

        // Prix de base selon la dimension
        const dimension = CarterieData.dimensions.find(d => d.id === devisCarterie.dimension_id);
        if (dimension) {
            if (dimension.dimension === 'autres') {
                prixTotal += safeNumber(autreDimension.prix);
            } else {
                prixTotal += safeNumber(dimension.prix_base);
            }
        }

        // Prix de la forme
        const forme = CarterieData.formes.find(f => f.id === devisCarterie.forme_id);
        if (forme) {
            if (forme.forme === 'autres') {
                prixTotal += safeNumber(autreForme.prix);
            } else {
                prixTotal += safeNumber(forme.prix);
            }
        }

        // Prix du support
        const support = getCurrentSupports().find(s => s.id === devisCarterie.support_id);
        if (support) {
            if (support.type === 'autres') {
                prixTotal += safeNumber(autreSupport.prix);
            } else {
                prixTotal += safeNumber(support.prix);
            }
        }

        // Prix de la face
        const face = CarterieData.faces.find(f => f.id === devisCarterie.face_id);
        if (face) {
            prixTotal += safeNumber(face.prix);
        }

        // Prix de l'imprimante
        const imprimante = CarterieData.imprimantes.find(i => i.id === devisCarterie.imprimante_id);
        if (imprimante) {
            prixTotal += safeNumber(imprimante.prix);
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(devisCarterie.finitionPrix);
        prixTotal += safeNumber(devisCarterie.optionPrix);

        // Calcul du total avec quantité
        // Le prix de base semble être pour 100 cartes. 
        // Si le prix unitaire est par carte, il faut diviser par 100.
        // Votre code original multipliait prixUnitaire * (quantite * 1). 
        // Si le prix unitaire calculé (prixTotal) est déjà pour 100 cartes, alors le prixTotalReel devrait être (prixTotal / 100) * quantite.
        // Assumons que 'prixTotal' est le prix pour 1 CARTE (votre calcul original).
        
        const quantite = safeNumber(devisCarterie.quantite);
        const prixUnitaire = Math.max(0, prixTotal); // C'est le prix par CARTE
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisCarterie, selectedCarterieType, autreDimension, autreForme, autreSupport]);

    // useEffect GetClientID (inchangé)
    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisCarterie(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    // initializeDevisCarterie (inchangé)
    const initializeDevisCarterie = () => {
        setDevisCarterie({
            client_id: Number(client?.id_client),
            type: '',
            dimension_id: 0,
            dimension: '',
            forme_id: 0,
            forme: '',
            support_id: 0,
            support: '',
            face_id: 0,
            face: '',
            imprimante_id: 0,
            imprimante: '',
            carterie_id: 0,
            montant: '',
            quantite: 100,
            finitionPrix: 0,
            optionPrix: ''
        });
        setSelectedCarterieType('');
        setAutreDimension({ nom: '', prix: '' });
        setAutreForme({ nom: '', prix: '' });
        setAutreSupport({ nom: '', prix: '' });
    };

    // handleAddToCart (inchangé)
    const handleAddToCart = () => {
        const carterieType = CarterieData.types.find(t => t.id === devisCarterie.carterie_id);
        
        const detailsDevis = `
                Type: ${carterieType?.nom}
                /Dimension: ${devisCarterie.dimension === 'autres' ? autreDimension.nom : devisCarterie.dimension}
                /Forme: ${devisCarterie.forme === 'autres' ? autreForme.nom : devisCarterie.forme}
                /Support: ${devisCarterie.support === 'autres' ? autreSupport.nom : devisCarterie.support}
                /Face: ${devisCarterie.face || 'Non spécifié'}
                /Imprimante: ${devisCarterie.imprimante || 'Non spécifié'}`;

        const carterieItem: CartItemsType = {
            id: Date.now(),
            designation: `Carterie - ${carterieType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(devisCarterie.quantite),
            remise: 0.00,
            service: 'Carterie',
        };
        
        setDevisCarterie(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(carterieItem, devisCarterie);
        initializeDevisCarterie();
    };

    return (
        // --- Nouvelle Structure Card ---
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-semibold">
                    <Map className="h-6 w-6 text-red-500 " />
                    Carterie
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
                                    <TabsTrigger value="dimension" className="flex items-center gap-1 text-xs ">
                                        <Layers className="h-3 w-3" />
                                        Dimension
                                    </TabsTrigger>
                                    <TabsTrigger value="forme" className="flex items-center gap-1 text-xs ">
                                        <Layers className="h-3 w-3" />
                                        Forme
                                    </TabsTrigger>
                                    <TabsTrigger value="support" className="flex items-center gap-1 text-xs" disabled={!selectedCarterieType}>
                                        <Layers className="h-3 w-3" />
                                        Support
                                    </TabsTrigger>
                                    <TabsTrigger value="face" className="flex items-center gap-1 text-xs ">
                                        <Layers className="h-3 w-3" />
                                        Face
                                    </TabsTrigger>
                                    <TabsTrigger value="imprimante" className="flex items-center gap-1 text-xs" disabled={!selectedCarterieType}>
                                        <Layers className="h-3 w-3" />
                                        Impression
                                    </TabsTrigger>
                                    <TabsTrigger value="quantite" className="flex items-center gap-1 text-xs ">
                                        <Layers className="h-3 w-3" />
                                        Quantité
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        
                        {/* --- Contenu Scrollable --- */}
                        <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2">
                            
                            {/* Type de Carte */}
                            <div ref={typeRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Type de Carte
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {CarterieData.types.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                handleSelect(type.id, 'carterie_id', 'type', type.type);
                                                setSelectedCarterieType(type.type);
                                            }}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.carterie_id === type.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <span>{type.nom}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dimension */}
                            <div ref={dimensionRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Dimension
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {CarterieData.dimensions.map(dimension => (
                                        <button
                                            key={dimension.id}
                                            onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <div className="font-semibold">{dimension.dimension}</div>
                                            <div className="text-xs">{dimension.unitee}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Input pour dimension "autres" */}
                                {devisCarterie.dimension === 'autres' && (
                                    <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <h5 className="font-semibold mb-3">Dimension personnalisée</h5>
                                        <div className="space-y-3">
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
                                                    value={autreDimension.prix}
                                                    onChange={(e) => setAutreDimension(prev => ({ ...prev, prix: e.target.value }))}
                                                    placeholder="Prix supplémentaire"
                                                    min="0"
                                                />
                                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Forme de découpe */}
                            <div ref={formeRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Forme de découpe
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {CarterieData.formes.map(forme => (
                                        <button
                                            key={forme.id}
                                            onClick={() => handleSelect(forme.id, 'forme_id', 'forme', forme.forme)}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.forme_id === forme.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <div className="font-semibold">{forme.forme}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Input pour forme "autres" */}
                                {devisCarterie.forme === 'autres' && (
                                    <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <h5 className="font-semibold mb-3">Forme personnalisée</h5>
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    value={autreForme.nom}
                                                    onChange={(e) => setAutreForme(prev => ({ ...prev, nom: e.target.value }))}
                                                    placeholder="Description de la forme"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    value={autreForme.prix}
                                                    onChange={(e) => setAutreForme(prev => ({ ...prev, prix: e.target.value }))}
                                                    placeholder="Prix supplémentaire"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Type de papier/support */}
                            {selectedCarterieType && (
                                <div ref={supportRef} className="scroll-mt-20">
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="mr-2" />
                                        Type de papier/support
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentSupports().map(support => (
                                            <button
                                                key={support.id}
                                                onClick={() => handleSelect(support.id, 'support_id', 'support', support.type)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.support_id === support.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold text-xs">{support.type}</div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input pour support "autres" */}
                                    {devisCarterie.support === 'autres' && (
                                        <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                            <h5 className="font-semibold mb-3">Support personnalisé</h5>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        value={autreSupport.nom}
                                                        onChange={(e) => setAutreSupport(prev => ({ ...prev, nom: e.target.value }))}
                                                        placeholder="Type de support personnalisé"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={autreSupport.prix}
                                                        onChange={(e) => setAutreSupport(prev => ({ ...prev, prix: e.target.value }))}
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

                            {/* Face */}
                            <div ref={faceRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Face d&apos;impression
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {CarterieData.faces.map(face => (
                                        <button
                                            key={face.id}
                                            onClick={() => handleSelect(face.id, 'face_id', 'face', face.face)}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.face_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <div className="font-semibold">{face.face}</div>
                                            {face.prix > 0 && (
                                                <div className="text-xs text-green-600">+{face.prix} Ar</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                                
                            {/* Technologie d'impression */}
                            {selectedCarterieType && (
                                <div ref={imprimanteRef} className="scroll-mt-20">
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                        <Layers className="mr-2" />
                                        Technologie d&apos;impression
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {CarterieData.imprimantes.map(imprimante => (
                                            <button
                                                key={imprimante.id}
                                                onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{imprimante.imprimante}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantité */}
                            <div ref={quantiteRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Quantité (cartes)
                                </h4>
                                <Input 
                                    type="number" 
                                    value={devisCarterie.quantite.toString()} 
                                    onChange={e => handleSelect(Math.max(1, safeNumber(e.target.value)), 'quantite')} 
                                    placeholder="Ex: 100" 
                                    min="1"
                                    step="10"
                                />
                                <p className="text-xs text-slate-500 mt-1">Quantité minimum: 1 carte</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Overview et calcul des prix */}
                    <OptionOverview 
                        userRole={userRole} 
                        prixUnitaireReel={prixUnitaireReel} 
                        prixTotalReel={prixTotalReel} 
                        handleAddToCart={handleAddToCart} 
                        devisCarterie={devisCarterie} 
                    />
                </div>
            </CardContent>
        </Card>
    );
}