import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
// import Accordion from '@/sources/components/ui/accordion' // Remplacé par Card
import { CartItemsType, clientType, devisCalendarData } from '@/types/type'
import { CalendarDays, Layers } from 'lucide-react'
import React, { useEffect, useState, useRef } from 'react' // Ajout de useRef
import OptionOverview from '../OptionOverview/OptionOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Ajout de Card
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs' // Ajout de Tabs

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisCalendarData) => void;
}


export default function Calendar({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock complètes pour le items (inchangées)
    const itemsData = {
        types: [
            { id: 1, type: 'calendrier', nom: 'Calendrier plateaux' },
            { id: 2, type: 'marque_page', nom: 'Marque-page' },
            { id: 3, type: 'chevalet', nom: 'Chevalet' },
        ],
        
        dimensions: {
            calendrier: [
                { id: 1, dimension: 'A3+', unitee: '', pose: '8', prix_base: 50 },
                { id: 2, dimension: 'A3', unitee: '', pose: '8', prix_base: 45 },
                { id: 3, dimension: 'A4+', unitee: '', pose: '8', prix_base: 40 },
                { id: 4, dimension: 'A4', unitee: '', pose: '8', prix_base: 35 },
                { id: 5, dimension: 'A5', unitee: '', pose: '8', prix_base: 30 },
                { id: 6, dimension: 'A5', unitee: '', pose: '8', prix_base: 30 },
                { id: 7, dimension: 'A6', unitee: '', pose: '8', prix_base: 30 },
                { id: 8, dimension: 'DL', unitee: '', pose: '8', prix_base: 30 },
                { id: 9, dimension: 'autres', unitee: '', pose: '8', prix_base: 30 },
            ],
            marque_page: [
                { id: 10, dimension: '1/4 A4', unitee: '', pose: '1', prix_base: 80 },
                { id: 11, dimension: '1/3 A4', unitee: '', pose: '1', prix_base: 80 },
                { id: 12, dimension: '1/6 A4', unitee: '', pose: '1', prix_base: 80 },
                { id: 13, dimension: '1/8 A4', unitee: '', pose: '1', prix_base: 80 },
                { id: 14, dimension: '1/10 A4', unitee: '', pose: '1', prix_base: 80 },
                { id: 15, dimension: 'autres', unitee: '', pose: '1', prix_base: 80 },
            ],
            chevalet: [
                { id: 17, dimension: 'A3', unitee: '', pose: '1', prix_base: 20 },
                { id: 18, dimension: 'A4+', unitee: '', pose: '1', prix_base: 20 },
                { id: 19, dimension: 'A4', unitee: '', pose: '1', prix_base: 20 },
                { id: 20, dimension: 'A5', unitee: '', pose: '1', prix_base: 20 },
                { id: 21, dimension: 'A6', unitee: '', pose: '1', prix_base: 20 },
                { id: 22, dimension: 'DL', unitee: '', pose: '1', prix_base: 20 },
                { id: 23, dimension: 'autres', unitee: '', pose: '1', prix_base: 20 },
            ],
        },

        materiaux: {
            calendrier: [
                { id: 2, categorie: 'PCB', accessoire: '250G', prix: 25 },
                { id: 3, categorie: 'PCB', accessoire: '300G', prix: 30 },
                { id: 4, categorie: 'PCB', accessoire: '350G', prix: 35 },
                { id: 5, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 6, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 8, categorie: 'PCB pellicule', accessoire: '250G', prix: 45 },
                { id: 9, categorie: 'PCB pellicule', accessoire: '300G', prix: 45 },
                { id: 10, categorie: 'PCB pellicule', accessoire: '350G', prix: 45 },
                { id: 11, categorie: 'PCB pellicule', accessoire: '600G', prix: 45 },
                { id: 12, categorie: 'PCB pellicule', accessoire: '700G', prix: 45 },
                { id: 13, categorie: 'Glossy', accessoire: '250G', prix: 45 },
                { id: 14, categorie: 'Glossy', accessoire: '300G', prix: 45 },
                { id: 15, categorie: 'autres', accessoire: '', prix: 45 },
            ],
            marque_page: [
                { id: 17, categorie: 'PCB', accessoire: '250G', prix: 25 },
                { id: 18, categorie: 'PCB', accessoire: '300G', prix: 30 },
                { id: 19, categorie: 'PCB', accessoire: '350G', prix: 35 },
                { id: 20, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 21, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 23, categorie: 'PCB pellicule', accessoire: '250G', prix: 45 },
                { id: 24, categorie: 'PCB pellicule', accessoire: '300G', prix: 45 },
                { id: 25, categorie: 'PCB pellicule', accessoire: '350G', prix: 45 },
                { id: 26, categorie: 'PCB pellicule', accessoire: '600G', prix: 45 },
                { id: 27, categorie: 'PCB pellicule', accessoire: '700G', prix: 45 },
                { id: 28, categorie: 'Glossy', accessoire: '250G', prix: 45 },
                { id: 29, categorie: 'Glossy', accessoire: '300G', prix: 45 },
                { id: 30, categorie: 'autres', accessoire: '', prix: 45 },
            ],
            chevalet: [
                { id: 31, categorie: 'PCB', accessoire: '170G', prix: 20 },
                { id: 32, categorie: 'PCB', accessoire: '250G', prix: 25 },
                { id: 33, categorie: 'PCB', accessoire: '300G', prix: 30 },
                { id: 34, categorie: 'PCB', accessoire: '350G', prix: 35 },
                { id: 35, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 36, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 37, categorie: 'PCB pellicule', accessoire: '170G', prix: 40 },
                { id: 38, categorie: 'PCB pellicule', accessoire: '250G', prix: 45 },
                { id: 39, categorie: 'PCB pellicule', accessoire: '300G', prix: 45 },
                { id: 40, categorie: 'PCB pellicule', accessoire: '350G', prix: 45 },
                { id: 41, categorie: 'PCB pellicule', accessoire: '600G', prix: 45 },
                { id: 42, categorie: 'PCB pellicule', accessoire: '700G', prix: 45 },
                { id: 43, categorie: 'Glossy', accessoire: '250G', prix: 45 },
                { id: 44, categorie: 'Glossy', accessoire: '300G', prix: 45 },
                { id: 45, categorie: 'autres', accessoire: '', prix: 45 },
            ],
        },

        recto_verso: [
            { id: 1, type: 'Recto', code: 'recto', multiplicateur: 1 },
            { id: 2, type: 'Recto-Verso', code: 'recto-verso', multiplicateur: 2 }
        ],

        imprimantes: {
            calendrier: [
                { id: 1, imprimante: "Jet d'encre", prix: 150 },
                { id: 2, imprimante: 'Laser', prix: 150 },
            ],
            marque_page: [
                { id: 3, imprimante: "Jet d'encre", prix: 150 },
                { id: 4, imprimante: 'Laser', prix: 150 },
            ],
            chevalet: [
                { id: 5, imprimante: "Jet d'encre", prix: 150 },
                { id: 6, imprimante: 'Laser', prix: 150 },
            ],
        },

        socle: {
            calendrier: [
                { id: 1, socle: "aucun", prix: 0 }, // Ajustement du prix à 0 pour 'aucun'
            ],
            marque_page: [
                { id: 2, socle: "aucun", prix: 0 }, // Ajustement du prix à 0 pour 'aucun'
            ],
            chevalet: [
                { id: 3, socle: 'Standard 400G', prix: 150 },
                { id: 4, socle: 'Rigide Luxe', prix: 150 },
                { id: 5, socle: 'autres', prix: 150 },
            ],
        },

        particularites: {
            calendrier: ['aucun'],
            marque_page: ['Simple', 'Plié', 'Coin Arrondi', 'autres'],
            chevalet: ['aucun'],
        }
    };

    const [client, setClient] = useState<clientType>();
    const [selecteditemsType, setSelecteditemsType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);

    const [materiauSelected, setMateriauSelected] = useState<{categorie: string, accessoire: string}>({
        categorie: '',
        accessoire: ''
    });

    const [devis, setDevis] = useState<devisCalendarData>({
        client_id: 0,
        type: '',
        materiau_id: 0,
        materiau: '',
        dimension_id: 0,
        dimension: '',
        calendar_id: 0, // Note : Cet ID semble être 'items_id' dans votre handleSelect. Renommé 'calendar_id' ici pour correspondre au state.
        montant: '',
        quantite: 1,
        recto_verso_id: 0,
        recto: '',
        imprimante_id: 0,
        imprimante: '',
        particularite: '',
        socle:'',
        socle_id:0,
    });

    // --- Nouveaux ajouts : Refs et état pour la navigation ---
    const [activeTab, setActiveTab] = useState('type');
    
    // Références pour le scroll
    const typeRef = useRef<HTMLDivElement>(null);
    const dimensionRef = useRef<HTMLDivElement>(null);
    const materiauRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const socleRef = useRef<HTMLDivElement>(null);
    const particularitesRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);
    // --- Fin des nouveaux ajouts ---

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        
        // Gérer la 'calendar_id' qui est 'items_id' dans l'UI
        if (name === 'items_id') {
            setDevis(prevState => ({
                ...prevState,
                calendar_id: Number(value), // Assigner à calendar_id
                ...(option !== undefined && { [option]: optionValue }),
                // Réinitialiser les sélections dépendantes lors du changement de type
                dimension_id: 0,
                dimension: '',
                materiau_id: 0,
                materiau: '',
                recto_verso_id: 0,
                recto: '',
                imprimante_id: 0,
                imprimante: '',
                socle_id: 0,
                socle: '',
                particularite: ''
            }));
        } else {
             setDevis(prevState => ({
                ...prevState,
                [name]: value,
                ...(option !== undefined && { [option]: optionValue }),
            }));
        }
    };

    // --- Nouvelle fonction de Scroll ---
    const scrollToSection = (section: string) => {
        setActiveTab(section);
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            type: typeRef,
            dimension: dimensionRef,
            materiau: materiauRef,
            face: faceRef,
            imprimante: imprimanteRef,
            socle: socleRef,
            particularites: particularitesRef,
            quantite: quantiteRef
        };

        if (refs[section]?.current) {
            refs[section].current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    // --- Fin de la fonction de Scroll ---

    // Fonctions pour obtenir les données dynamiques (inchangées)
    const getCurrentDimensions = () => {
        if (!selecteditemsType) return [];
        return itemsData.dimensions[selecteditemsType as keyof typeof itemsData.dimensions] || [];
    };

    const getCurrentMateriaux = () => {
        if (!selecteditemsType) return [];
        return itemsData.materiaux[selecteditemsType as keyof typeof itemsData.materiaux] || [];
    };

    const getCurrentSocle = () => {
        if (!selecteditemsType) return [];
        return itemsData.socle[selecteditemsType as keyof typeof itemsData.socle] || [];
    };

    const getCurrentImprimante = () => {
        if(!selecteditemsType) return [];
        return itemsData.imprimantes[ selecteditemsType as keyof typeof itemsData.imprimantes] || [];
    }

    const getCurrentParticularites = () => {
        if (!selecteditemsType) return [];
        return itemsData.particularites[selecteditemsType as keyof typeof itemsData.particularites] || [];
    };
    
    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: number): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Calcul du prix (inchangé, mais utilisation de safeNumber)
    useEffect(() => {
        if (!selecteditemsType) {
            setPrixUnitaireReel(0);
            setPrixTotalReel(0);
            return;
        }

        let prixTotal = 0;

        // Prix de base selon la dimension
        const dimension = getCurrentDimensions().find(d => d.id === devis.dimension_id);
        if (dimension) {
            prixTotal += safeNumber(dimension.prix_base);
        }

        // Prix du matériau
        const materiau = getCurrentMateriaux().find(m => m.id === devis.materiau_id);
        if (materiau) {
            prixTotal += safeNumber(materiau.prix);
        }

        // Prix du socle (au lieu de 'couleur')
        const socle = getCurrentSocle().find(c => c.socle === devis.socle); // Comparaison par 'socle' (string)
        if (socle) {
            prixTotal += safeNumber(socle.prix);
        }

        // Supplément imprimante
        const imprimante = getCurrentImprimante().find(i => i.id === devis.imprimante_id);
        if (imprimante) {
            prixTotal += safeNumber(imprimante.prix);
        }

        // Multiplicateur recto-verso (APPLIQUÉ À LA FIN sur le total des options, ou avant ?)
        // Dans votre code original, il s'appliquait avant l'imprimante. Gardons cette logique.
        const rectoVerso = itemsData.recto_verso.find(r => r.id === devis.recto_verso_id);
        if (rectoVerso) {
            // Supposons que le multiplicateur ne s'applique qu'au prix de base + matériau + dimension
            // Si le prix de l'imprimante et du socle est par impression, il ne faut pas multiplier.
            // Votre code original multipliait tout avant l'imprimante.
            prixTotal *= safeNumber(rectoVerso.multiplicateur);
        }

        setPrixUnitaireReel(prixTotal);
        setPrixTotalReel(prixTotal * safeNumber(devis.quantite || 1));

    }, [devis, selecteditemsType, materiauSelected]);

    // useEffect pour GetClientID (inchangé)
    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevis(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    // initializedevis (inchangé)
    const initializedevis = () => {
        setDevis({
            client_id: Number(client?.id_client),
            type: '',
            materiau_id: 0,
            materiau: '',
            dimension_id: 0,
            dimension: '',
            calendar_id: 0,
            montant: '',
            quantite: 1,
            recto_verso_id: 0,
            recto: '',
            imprimante_id: 0,
            imprimante: '',
            particularite: '',
            socle:'',
            socle_id:0,
        });
        setSelecteditemsType('');
        setMateriauSelected({ categorie: '', accessoire: '' });
    };

    // handleAddToCart (inchangé)
    const handleAddToCart = () => {
        const itemsType = itemsData.types.find(t => t.id === devis.calendar_id);
        const detailsDevis = `
            Type: ${itemsType?.nom}/Dimension: ${devis.dimension}/
            /Matériau: ${devis.materiau}/Face: ${devis.recto}
            /Imprimante: ${devis.imprimante}/socle: ${devis.socle}
            /Particularités: ${devis.particularite}`;

        const itemsItem: CartItemsType = {
            id: Date.now(),
            designation: `Calendrier - ${itemsType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: devis.quantite,
            remise: 0.00,
            service: 'Calendrier',
        };
        
        setDevis({ ...devis, montant: String(prixTotalReel) });
        handleAddCart(itemsItem, devis);
        initializedevis();
    };

    return (
        // --- Structure Card (style Flyers) ---
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 font-semibold">
                    <CalendarDays className="h-6 w-6 text-red-500 " />
                    Calendrier & Marque-Page
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col lg:flex-row gap-3">
                    <div className="w-full lg:w-4/5 space-y-1 ">
                        
                        {/* --- Navigation Tabs (style Flyers) --- */}
                        <div className="sticky gap-5 space-x-2 top-0 bg-white dark:bg-slate-900 z-10 pb-0 pt-2 border-b border-slate-200 dark:border-slate-700">
                            <Tabs value={activeTab} onValueChange={scrollToSection} className="w-full">
                                <TabsList className="flex-wrap h-auto p-1 bg-white dark:bg-slate-900">
                                    <TabsTrigger value="type" className="flex items-center gap-1 text-xs ">
                                        <Layers className="h-3 w-3" />
                                        Type
                                    </TabsTrigger>
                                    <TabsTrigger value="dimension" className="flex items-center gap-1 text-xs " disabled={!selecteditemsType}>
                                        <Layers className="h-3 w-3" />
                                        Dimension
                                    </TabsTrigger>
                                    <TabsTrigger value="materiau" className="flex items-center gap-1 text-xs" disabled={!selecteditemsType}>
                                        <Layers className="h-3 w-3" />
                                        Matériau
                                    </TabsTrigger>
                                    <TabsTrigger value="face" className="flex items-center gap-1 text-xs" disabled={!selecteditemsType}>
                                        <Layers className="h-3 w-3" />
                                        Face
                                    </TabsTrigger>
                                    <TabsTrigger value="imprimante" className="flex items-center gap-1 text-xs" disabled={!selecteditemsType}>
                                        <Layers className="h-3 w-3" />
                                        Impression
                                    </TabsTrigger>
                                    <TabsTrigger value="socle" className="flex items-center gap-1 text-xs" disabled={!selecteditemsType || getCurrentSocle().length === 0}>
                                        <Layers className="h-3 w-3" />
                                        Socle
                                    </TabsTrigger>
                                    <TabsTrigger value="particularites" className="flex items-center gap-1 text-xs" disabled={!selecteditemsType || getCurrentParticularites().length === 0}>
                                        <Layers className="h-3 w-3" />
                                        Options
                                    </TabsTrigger>
                                    <TabsTrigger value="quantite" className="flex items-center gap-1 text-xs" disabled={!selecteditemsType}>
                                        <Layers className="h-3 w-3" />
                                        Quantité
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {/* --- Contenu scrollable (style Flyers) --- */}
                        <div className="space-y-8 max-h-[70vh] overflow-y-auto mt-1 pr-2">
                            
                            {/* Section Type */}
                            <div ref={typeRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Type de Produit
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {itemsData.types.map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => {
                                                handleSelect(type.id, 'items_id', 'type', type.type);
                                                setSelecteditemsType(type.type);
                                            }}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.type === type.type ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <span>{type.nom}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sections conditionnelles */}
                            {selecteditemsType && (
                                <>
                                    {/* Section Dimension */}
                                    <div ref={dimensionRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Dimension
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentDimensions().map(dimension => (
                                                <button
                                                    key={dimension.id}
                                                    onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{dimension.dimension}</div>
                                                    <div className={`text-xs text-slate-500`}>{dimension.unitee}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section Matériau */}
                                    <div ref={materiauRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Matériau
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentMateriaux().map(materiau => (
                                                <button
                                                    key={materiau.id}
                                                    onClick={() => {
                                                        handleSelect(materiau.id, 'materiau_id', 'materiau', `${materiau.categorie} ${materiau.accessoire}`);
                                                        setMateriauSelected({ 
                                                            categorie: materiau.categorie, 
                                                            accessoire: materiau.accessoire 
                                                        });
                                                    }}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.materiau_id === materiau.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{materiau.accessoire}</div>
                                                    <div className="text-xs text-slate-500">{materiau.categorie}</div>
                                                    {/* <div className="text-xs font-semibold text-green-600">{materiau.prix} Ar</div> */}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section Face (Recto/Verso) */}
                                    <div ref={faceRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Face d&apos;impression
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {itemsData.recto_verso.map(recto => (
                                                <button
                                                    key={recto.id}
                                                    onClick={() => handleSelect(recto.id, 'recto_verso_id', 'recto', recto.code)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.recto_verso_id === recto.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <span>{recto.type}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section Imprimante */}
                                    <div ref={imprimanteRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Technologie d&apos;impression
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentImprimante().map(imprimante => (
                                                <button
                                                    key={imprimante.id}
                                                    onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{imprimante.imprimante}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Section Socle (Découpe) */}
                                    {getCurrentSocle().length > 0 && (
                                        <div ref={socleRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Type de socle
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentSocle().map((socle) => (
                                                    <button
                                                        key={socle.id}
                                                        onClick={() => handleSelect(socle.socle, 'socle', 'socle_id', socle.id.toString())}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.socle === socle.socle ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <span>{socle.socle}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Section Particularités */}
                                    {getCurrentParticularites().length > 0 && (
                                        <div ref={particularitesRef} className="scroll-mt-20">
                                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                                <Layers className="mr-2" />
                                                Particularités
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                {getCurrentParticularites().map((part, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSelect(part, 'particularite')}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.particularite === part ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <span>{part}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Section Quantité */}
                                    <div ref={quantiteRef} className="scroll-mt-20">
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                            <Layers className="mr-2" />
                                            Quantité
                                        </h4>
                                        <Input 
                                            type="number" 
                                            value={devis.quantite.toString()} 
                                            onChange={e => handleSelect(Math.max(1, safeNumber(Number(e.target.value))), 'quantite')} 
                                            placeholder="Ex: 100" 
                                            min="1"
                                            step="1"
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
                            devisCalendar={devis} 
                        />
                </div>
            </CardContent>
        </Card>
    );
}
