"use client"

import React, { useEffect, useState, useRef } from 'react' // Ajout de useRef
import OptionOverview from './OptionOverview/OptionOverview'
import { Button, Input } from '@/sources/components/ui'
import { Book, BookOpen, ChevronsLeftRightEllipsisIcon, Layers, Loader2, Weight } from 'lucide-react'
// import Accordion from '@/sources/components/ui/accordion' // Remplacé
import { CartItemsType, clientType, devisData } from '@/types/type'
import { useLivre } from '@/hooks/useModerator'
import { GetClientID } from '@/sources/actions/admin/client.action'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // Ajout
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs' // Ajout

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart?: (cartItem : CartItemsType, devis: devisData) => void;
}

type ReliureOption = {
    id_stock_reliure: number;
    type: string;
    reference: string;
    stock: number;
    seuil: number;
    reliures: {
        id_reliure: number;
        min: number;
        max: number;
        papier: string;
        prix: number;
    }[];
};

type CustomeSizeType = {
    longueur: number;
    largeur: number;
}

export default function PrintArticle( { param, userRole, handleAddCart } : PrintArticleProps) {
    const { livre, livreLoading } = useLivre();

    const reliureType = ["Plastique", "Métallique", "Piqure à cheval", "Dos carré collé"];
    const [reliureFiltre, setReliureFiltre] = useState<string[]>(reliureType);
    const [client, setClient] = useState<clientType>();
    // const [isOpen, setIsOpen] = useState(true); // Géré par la Card
    const [selectedReliureType, setSelectedReliureType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setprixTotalReel] = useState<number>(0.00);
    const [filteredReliures, setFilteredReliures] = useState<ReliureOption[]>([]);
    const [ customSize, setCustomSize] = useState<CustomeSizeType> ({
        longueur: 0,
        largeur: 0,
    });

    // --- Ajout des Refs et activeTab ---
    const [activeTab, setActiveTab] = useState('type');
    const typeRef = useRef<HTMLDivElement>(null);
    const dimensionRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const papierRef = useRef<HTMLDivElement>(null);
    const pagesRef = useRef<HTMLDivElement>(null);
    const rectoRef = useRef<HTMLDivElement>(null);
    const couvertureRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const reliureRef = useRef<HTMLDivElement>(null);
    const finitionRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);
    // --- Fin Ajout ---

    const MAX_LARGEUR_A3 = 297;
    const MAX_LONGUEUR_A3 = 420;

    // --- Fonction de Scroll ---
    const scrollToSection = (section: string) => {
        setActiveTab(section);
        const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            type: typeRef,
            dimension: dimensionRef,
            couleur: couleurRef,
            papier: papierRef,
            pages: pagesRef,
            recto: rectoRef,
            couverture: couvertureRef,
            imprimante: imprimanteRef,
            reliure: reliureRef,
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
    // --- Fin Fonction de Scroll ---

    const customeSizeChange = (field : "longueur" | "largeur" , value: string) => {
        let numValue = parseInt(value, 10) || 0;
        if( field === 'largeur' && numValue > MAX_LARGEUR_A3) {
            numValue = MAX_LARGEUR_A3;
        } 
         if( field === 'longueur' && numValue > MAX_LONGUEUR_A3) {
            numValue = MAX_LONGUEUR_A3;
        }
        setCustomSize( {...customSize, [field]: numValue});
    }

    const getEffectiveDimension = (custom: CustomeSizeType, standardDimensions: typeof livre.dimensions) => {
        if(!livre || custom.largeur ===0 || custom.longueur===0) {
            return standardDimensions.find(d => d.dimension === 'A6');
        }
        const customL = Math.max(custom.longueur, custom.largeur);
        const customW = Math.min(custom.longueur, custom.largeur);

        const dimensionsWithValues = standardDimensions.map( dim => {
            const partiels = dim.unitée.split('x');
            const longueur = parseInt(partiels[0].trim(), 10);
            const largeur = parseInt(partiels[1].trim(), 10);

            return {
                ...dim, 
                numericValues: partiels ? {
                    longueur: longueur, largeur: largeur, 
                    max: Math.max(longueur, largeur), min: Math.min(longueur, largeur),
                } : null
            };
        }).filter(dim => dim.numericValues !== null);

        dimensionsWithValues.sort( (a, b) => ( a.numericValues!.max * a.numericValues!.min) - (b.numericValues!.max * b.numericValues!.min));

        for (const dim of dimensionsWithValues) {
            if( customL <= dim.numericValues!.max && customW <= dim.numericValues!.min) {
                return dim;
            }
        }
       
        return standardDimensions.find(d => d.dimension === "A3");
    }

    const [ papierSelected, setPapierSelected] = useState({
            categorie: '', accessoire: [{ accessoire: '', id_papier: 0, prix: '', categorie: ''}],
        });
    
    const [ couvertureSelected, setCouvertureSelected] = useState({
            categorie: '', accessoire: [{ accessoire: '', id_papier: 0, prix: '', categorie: ''}],
    });

    const [devisLivre, setDevisLivre] = useState<devisData>({
        client_id: Number(client?.id_client), type: '', couleur_id: '', couleur: '', couverture_id: 0, couverture: '', dimension_id: 0, dimension: '', finition_id: 0, livre_id: 0,
        montant: '', pages: 0, papier_id: 0, papier: '', quantite: 0, recto_verso_id: 0, recto: '', reliure_id: '', imprimante_id: 0, imprimante: '', finition: '',
        reliure: '', reliurePrix: '', finitionPrix: 0,
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisLivre(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };
    
    // Logique de calcul (inchangée)
    const getUnitPriceWithInk = (
            accessoire: { prix: string, accessoire: string } | undefined,
            printer: string | undefined,
            couleur: string | undefined
        ): number => {
            if (!accessoire) return 0;

        let prix = Number(accessoire.prix) || 0;
            if (couleur === 'true' && accessoire.accessoire === '80G') {
                if (printer === 'Laser') {
                    prix += 400;
                } else {
                    prix += 200;
                }
            }
            return prix;
        }

    useEffect(() => {
        if (Number(devisLivre?.pages) % 4 !== 0) {
            setReliureFiltre(reliureType.filter(r => r !== "Piqure à cheval"));
            if (selectedReliureType === "Piqure à cheval") {
                setSelectedReliureType('');
            }
        } else {
            setReliureFiltre(reliureType);
        }
    }, [devisLivre.pages, selectedReliureType]);

    const convertPose = (value: string) => {
        if( !value) return 1;
        const str = String(value).replace(',', '.');
        if( value.includes('/')) {
            const str = value.split('/');
            const num = parseFloat(str[0]);
            const den = parseFloat(str[1]);
            if(den === 0) return NaN;
            return num/den;
        }
        return Number(str);
    }
    
    useEffect(() => {
        if (!livre || livreLoading) return;

        const selectedDimension = livre.dimensions.find(d => d.id_dimension === devisLivre.dimension_id);
        const effectiveDimension = devisLivre.dimension_id === null ? getEffectiveDimension(customSize, livre.dimensions) : selectedDimension;
        if(!effectiveDimension) return ;

        const selectedPapier = livre.papiers.flatMap(p => p.accessoire).find(acc => acc.id_papier === devisLivre.papier_id);
        const selectedCouverture = livre.papiers.flatMap(p => p.accessoire).find(acc => acc.id_papier === devisLivre.couverture_id);
        const selectedReliure = devisLivre.reliurePrix ? Number(devisLivre?.reliurePrix) : Number(filteredReliures.flatMap(r => r.reliures).find(rel => rel.id_reliure === devisLivre.reliure_id)?.prix);

        const nbrPages = Number(devisLivre.pages) || 0;
        const quantite = Number(devisLivre.quantite) || 1;
        const nbrPoses = effectiveDimension?.pose ? convertPose(effectiveDimension?.pose) : 1;
        const rectoVersoMultiplier = devisLivre.recto === "1" ? 1 : 2; 

        const unitPriceWithInk = getUnitPriceWithInk(selectedPapier, devisLivre.imprimante, devisLivre.couleur);
        const coutPapierInterne =  (unitPriceWithInk * nbrPoses) * nbrPages * rectoVersoMultiplier;
        const coutCouverture = selectedCouverture ? (Number(selectedCouverture.prix) * nbrPoses) : 0;
        const coutReliure = selectedReliure ? Number(selectedReliure) : 0;
        const coutFinition = devisLivre.finition === 'aucune' ? 0 : Number(devisLivre.finitionPrix);

        const totalUnitaire = coutPapierInterne + coutCouverture + coutReliure + coutFinition ;
        const totalFinal = totalUnitaire * quantite;
        
        setPrixUnitaireReel(totalUnitaire);
        setprixTotalReel(totalFinal);

    }, [devisLivre, livre, livreLoading, filteredReliures, customSize]); 

    useEffect(() => {
        if (param) {
        GetClientID(Number(param))
            .then(res => {
                const clientData = res.data;
                setClient(clientData);
                setDevisLivre(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
            });
        }
    }, [param]);
    
    useEffect(() => {
        if (!livre?.reliure || !selectedReliureType || !devisLivre.papier || !devisLivre.pages) {
            setFilteredReliures([]);
            return;
        }

        const pageCount = Number(devisLivre.pages);
        if (isNaN(pageCount) || pageCount <= 0) {
            setFilteredReliures([]);
            return;
        }
        const [accessoire] = devisLivre.papier.split("-").map(String);
        
        const results = livre.reliure
            .filter(option => option.type === selectedReliureType)
            .map(option => {
                const validNestedReliures = option.reliures.filter(nested =>
                    nested.papier === accessoire && (pageCount >= nested.min && pageCount <= nested.max)
                );
                return { ...option, reliures: validNestedReliures };
            })
            .filter(option => option.reliures.length > 0);
        
        setFilteredReliures(results);

    }, [devisLivre.papier, devisLivre.pages, selectedReliureType, livre]);

    const initializeDevisLivre = () => {
        setDevisLivre({
        client_id: Number(client?.id_client), type: '', couleur_id: '', couleur: '', couverture_id: 0, couverture: '', dimension_id: 0, dimension: '', finition_id: 0, livre_id: 0,
        montant: '', pages: 0, papier_id: 0, papier: '', quantite: 0, recto_verso_id: 0, recto: '', reliure_id: '', imprimante_id: 0, imprimante: '', finition: '',
        reliure: '', reliurePrix: '' , finitionPrix: 0,
        });
        // setIsOpen(false); // Plus nécessaire
        setCustomSize({ longueur: 0, largeur: 0 });
        setPapierSelected({ categorie: '', accessoire: [] });
        setCouvertureSelected({ categorie: '', accessoire: [] });
        setSelectedReliureType('');
    }

    const handleAddToCart = () => {
        const detailsDevis = `
            Type: ${devisLivre.type}/Dimension: ${devisLivre.dimension}/Couleur: ${devisLivre.couleur ==  'false' ? 'Noir et Blanc' : 'Couleur'}
            /Papier: ${devisLivre.papier}/Pages: ${devisLivre.pages}/Recto: ${devisLivre.recto == 'false' ? 'recto' : 'recto-veso'}
            /Couverture: ${devisLivre.couverture}/Imprimante: ${devisLivre.imprimante}/Reliure: ${devisLivre.reliure}
            /Finition: ${devisLivre.finition}`;

        const printArticleItem : CartItemsType = {
            id: Date.now(),
            designation: "Service d'impression : Livre",
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: Number(devisLivre.quantite),
            remise: 0.00,
            service:'Impression',
        }
        setDevisLivre({ ...devisLivre,  montant:String(prixTotalReel) });
        if (handleAddCart) {
            handleAddCart(printArticleItem, devisLivre);
        }
        initializeDevisLivre();
    }

  return (
    // --- Nouvelle Structure Card ---
    <Card>
        <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-semibold">
                <BookOpen className="h-6 w-6 text-red-500 " />
                Livres, Booklets, Mémoires
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
                                <TabsTrigger value="couleur" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Couleur
                                </TabsTrigger>
                                <TabsTrigger value="papier" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Papier
                                </TabsTrigger>
                                <TabsTrigger value="pages" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Pages
                                </TabsTrigger>
                                <TabsTrigger value="recto" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Recto/Verso
                                </TabsTrigger>
                                <TabsTrigger value="couverture" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Couverture
                                </TabsTrigger>
                                <TabsTrigger value="imprimante" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Impression
                                </TabsTrigger>
                                <TabsTrigger value="reliure" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Reliure
                                </TabsTrigger>
                                <TabsTrigger value="finition" className="flex items-center gap-1 text-xs ">
                                    <Layers className="h-3 w-3" />
                                    Finition
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
                        { livreLoading ? (<Loader2 className='animate-spin w-5 h-5 text-red-500'/>) : !livre ? (<div>Erreur de chargement...</div>) :
                        (<> 
                            {/* Type d'Impression */}
                            <div ref={typeRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Type d&apos;Impression
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.livres.map( livre => (
                                        <React.Fragment key={livre.id_livre}>
                                            <button 
                                                onClick={() => handleSelect(livre.id_livre, 'livre_id', 'type', livre.livre)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.livre_id === livre.id_livre ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{livre.livre}</span>
                                            </button>
                                
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className='mt-3'>
                                    { devisLivre.livre_id == 6 ? 
                                    (<div className='relative'>
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"> Type : </div>
                                        <Input className='pl-15' type="text" value={devisLivre.type} onChange={e => handleSelect(0, '', 'type', e.target.value)} placeholder="Ex: type personnalisé" /> 
                                    </div>): null
                                    }
                                </div>
                            </div>
                            
                            {/* Dimension */}
                            <div ref={dimensionRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Dimension
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.dimensions.map( dimension => (
                                        <React.Fragment key={dimension.id_dimension}>
                                            <button 
                                                onClick={() => handleSelect(dimension.id_dimension, 'dimension_id', 'dimension', dimension.dimension)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.dimension_id === dimension.id_dimension ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{dimension.dimension}</span>
                                            </button>
                                        </React.Fragment>
                                    ))}
                                    <button 
                                        onClick={() => handleSelect(null, 'dimension_id', 'dimension', 'autre')}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.dimension === 'autre' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                        <span>autre</span>
                                    </button>
                                {   devisLivre.dimension === 'autre' && 
                                    <div className='mt-2 border p-2 rounded-lg col-span-2 md:col-span-3'>
                                        <div className='relative w-full md:w-1/2'>
                                            <Input  className=" pl-22" type="number" min="1" max={String(MAX_LONGUEUR_A3)} value={customSize.longueur.toString()} onChange={e => customeSizeChange("longueur", e.target.value)} placeholder="Longueur" />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold" > Longueur : </div>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold" > | mm </div>
                                        </div>
                                        <div className='relative mt-2 w-full md:w-1/2'>
                                            <Input  className=" pl-18 overscroll-none" type="number" min="1" max={String(MAX_LARGEUR_A3)} value={customSize.largeur.toString()} onChange={e => customeSizeChange('largeur', e.target.value)} placeholder="Largeur" />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold" > Largeur : </div>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold" > | mm </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                            
                            {/* couleur */}
                            <div ref={couleurRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Couleur
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.couleurs.map( couleur => (
                                        <React.Fragment key={couleur.id_couleur}>
                                            <button 
                                                onClick={() => handleSelect(couleur.id_couleur, 'couleur_id', 'couleur', couleur.code)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.couleur_id === couleur.id_couleur ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{couleur.couleur}</span>
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            
                            {/* papier */}
                            <div ref={papierRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Papier (Interne)
                                </h4>
                                <div>
                                    <div className='grid grid-cols-1 ml-5 gap-2'>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Book />
                                        <span className="ml-2"> Type de papier </span>
                                    </h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.papiers.map( papier => (
                                        <React.Fragment key={papier.categorie}>
                                            {devisLivre.dimension === "A3" && papier.categorie == "Toile fin" ? null : 
                                            (<button 
                                                onClick={() => setPapierSelected(papier)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${papierSelected.categorie === papier.categorie ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{papier.categorie }</span>
                                            </button>)}
                                        </React.Fragment>
                                    ))}
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='grid grid-cols-1 ml-5 gap-2'>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Weight />
                                        <span className="ml-2"> Grammage </span>
                                    </h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { papierSelected.categorie === '' ? 
                                    ( 
                                        <Button variant='secondary' isDisabled={true}>
                                        . . .   
                                        </Button> 
                                    ) :
                                    (papierSelected.accessoire.map( accessoire => (
                                        <React.Fragment key={accessoire.id_papier}>
                                            <button 
                                                onClick={() => handleSelect(accessoire.id_papier, 'papier_id', 'papier' , `${accessoire.accessoire}-${accessoire.categorie}`)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${accessoire.id_papier === devisLivre.papier_id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{accessoire.accessoire}</span>
                                            </button>
                                        </React.Fragment>
                                    )))}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* nombre de page */}
                            <div ref={pagesRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Nombre de pages
                                </h4>
                                <Input type="number" value={devisLivre?.pages?.toString()} onChange={e => handleSelect(e.target.value, 'pages')} placeholder="Ex: 100" />
                            </div>
                            
                            {/* recto-verso */}
                            <div ref={rectoRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Recto/Verso
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.recto_verso.map( recto => (
                                        <React.Fragment key={recto.id_recto}>
                                            <button 
                                                onClick={() => handleSelect(recto.id_recto, 'recto_verso_id', 'recto', recto.code )}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.recto_verso_id === recto.id_recto ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{recto.type}</span>
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Couverture */}
                            <div ref={couvertureRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Couverture
                                </h4>
                                <div>
                                    <div className='grid grid-cols-1 ml-5 gap-2'>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Book />
                                        <span className="ml-2"> Type de couverture </span>
                                    </h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.papiers.map( papier => (
                                        <React.Fragment key={papier.categorie}>
                                            {devisLivre.dimension === "A3" && papier.categorie == "Toile fin" ? null : 
                                            (<button 
                                                onClick={() => setCouvertureSelected(papier)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${couvertureSelected.categorie === papier.categorie ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{papier.categorie}</span>
                                            </button>)}
                                        </React.Fragment>
                                    ))}
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='grid grid-cols-1 ml-5 gap-2'>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Weight />
                                        <span className="ml-2"> Grammage </span>
                                    </h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { couvertureSelected.categorie === '' ? 
                                    ( 
                                        <Button variant='secondary' isDisabled={true}>
                                        . . .   
                                        </Button> 
                                    ) :
                                    (couvertureSelected.accessoire.map( accessoire => (
                                        <React.Fragment key={accessoire.id_papier}>
                                            <button 
                                                onClick={() => handleSelect(accessoire.id_papier, 'couverture_id' , 'couverture', `${accessoire.accessoire}-${accessoire.categorie}` )}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${accessoire.id_papier === devisLivre.couverture_id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{accessoire.accessoire}</span>
                                            </button>
                                        </React.Fragment>
                                    )))}
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Imprimante */}
                            <div ref={imprimanteRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Technologie d&apos;impréssion
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    { livre.imprimante.map( printer => (
                                        <React.Fragment key={printer.id_imprimante}>
                                            <button 
                                                onClick={() => handleSelect(printer.id_imprimante, 'imprimante_id', 'imprimante', printer.imprimante)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${printer.id_imprimante === devisLivre.imprimante_id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{printer.imprimante}</span>
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            
                            {/* reliure */}
                            <div ref={reliureRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Reliure
                                </h4>
                                <div>
                                    <div className='grid grid-cols-1 ml-5 gap-2'>
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Book />
                                        <span className="ml-2"> Type de reluire </span>
                                    </h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {reliureFiltre?.map(reliure => (
                                        <button
                                            key={reliure}
                                            onClick={() => {
                                                setDevisLivre({...devisLivre, reliurePrix: '0'});
                                                setSelectedReliureType(reliure);
                                                handleSelect('', 'reliure_id', 'reliure', reliure);
                                            } }
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${selectedReliureType === reliure ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <span>{reliure}</span>
                                        </button>
                                    ))}
                                        <button
                                            onClick={() => {
                                                setSelectedReliureType('autre');
                                                handleSelect('', 'reliure_id', 'reliure', 'Autre');
                                            } }
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${selectedReliureType === 'autre' ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                            <span> autre </span>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className='grid grid-cols-1 ml-5 gap-2 mt-4'>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <ChevronsLeftRightEllipsisIcon />
                                        <span className="ml-2"> Référence disponible </span>
                                    </h4>
                                    { selectedReliureType === 'autre' ? 
                                    ( <div className='gap-4 space-y-3 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800'> 
                                        <div className='relative'>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"> Reliure : </div>
                                            <Input className="pl-18" type="text" value={devisLivre.reliure?.toString()} onChange={e => handleSelect(e.target.value, 'reliure')} placeholder="Ex: type de reliure" />
                                        </div>
                                        <div className='relative'>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"> Prix : </div>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold"> | Ar</div>
                                            <Input className="pl-14" type="text" value={devisLivre.reliurePrix?.toString()} onChange={e => handleSelect(e.target.value, 'reliurePrix')} placeholder="Ex: 1200 Ar" />
                                        </div>
                                        </div>) : (<> 
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    
                                    {!filteredReliures.length ? (
                                            <div className="col-span-full text-center text-slate-500 text-sm p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                                                Veuillez choisir un papier, un nombre de pages et un type de reliure.
                                            </div>
                                        ) : (
                                            filteredReliures.map(option =>
                                                option.reliures.map(item => (
                                                    <button
                                                        key={item.id_reliure}
                                                        onClick={() => handleSelect(item.id_reliure, 'reliure_id')}
                                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${item.id_reliure === devisLivre.reliure_id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                    >
                                                        <span className="font-semibold block">{option.reference}</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.prix.toLocaleString('fr-FR')} Ar</span>
                                                    </button>
                                                ))
                                            )
                                        )}
                                    </div>
                                    </>)}
                                </div>
                            </div>
                            
                            {/* finition */}
                            <div ref={finitionRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Finition
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                                    { livre.finition.map( finition => (
                                        <React.Fragment key={finition.id_finition}>
                                            <button 
                                                onClick={() => handleSelect(finition.id_finition, 'finition_id', 'finition', finition.finition)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.finition_id === finition.id_finition ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{finition.finition}</span>
                                            </button>
                                        </React.Fragment>
                                    ))}

                                </div>
                                {( !devisLivre.finition || devisLivre.finition !== "aucune" ) &&
                                <div className='relative'>
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold"> Prix : </div>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold"> | Ar</div>
                                    <Input className='pl-15' type="text" value={devisLivre.finitionPrix?.toString() || ''} onChange={e => handleSelect(Number(e.target.value), 'finitionPrix')}/>
                                </div>}
                            </div>
                            
                            {/* quantité */}
                            <div ref={quantiteRef} className="scroll-mt-20">
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                                    <Layers className="mr-2" />
                                    Quantités
                                </h4>
                                <Input type="number" value={devisLivre.quantite?.toLocaleString('fr-FR') || ''} onChange={e => handleSelect(Number(e.target.value), 'quantite')} placeholder="Ex: 10" min="1" />
                            </div>   
                        </>)}
                    </div>
                </div>
                
                {/* Overview */}
                <OptionOverview  userRole={userRole} prixUnitaireReel={prixUnitaireReel} prixTotalReel={prixTotalReel} handleAddToCart={handleAddToCart} devisLivre={devisLivre} />
            </div>
        </CardContent>
    </Card>
  )
}