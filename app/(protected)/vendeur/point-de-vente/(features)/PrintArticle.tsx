"use client"

import React, { useEffect, useState } from 'react'
import OptionOverview from './OptionOverview'
import { Button, Input } from '@/sources/components/ui'
import { Book, ChevronsLeftRightEllipsisIcon, Layers, Loader2, Weight, Wrench } from 'lucide-react'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisLivreData } from '@/sources/types/type'
import { useLivre } from '@/hooks/useModerator'
import { GetClientID } from '@/sources/actions/admin/client.action'

type PrintArticleProps = {
    userRole?: string;
    param ?: string;
    handleGetDevisLivre: (devis : devisLivreData[]) => void;
    handleAddCart: (cartItem : CartItemsType, devis: devisLivreData) => void;
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

export default function PrintArticle( { param, userRole, handleAddCart } : PrintArticleProps) {
    const { livre, livreLoading } = useLivre();

    const reliureType = ["Plastique", "Métallique", "Piqure à cheval", "Dos carré collé"];
    const [reliureFiltre, setReliureFiltre] = useState<string[]>(reliureType);
    const [client, setClient] = useState<clientType>();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedReliureType, setSelectedReliureType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setprixTotalReel] = useState<number>(0.00);
    const [filteredReliures, setFilteredReliures] = useState<ReliureOption[]>([]);

    const [ papierSelected, setPapierSelected] = useState({
            categorie: '', accessoire: [{ accessoire: '', id_papier: 0, prix: '', categorie: ''}],
        });
    
    const [ couvertureSelected, setCouvertureSelected] = useState({
            categorie: '', accessoire: [{ accessoire: '', id_papier: 0, prix: '', categorie: ''}],
    });

    const [devisLivre, setDevisLivre] = useState<devisLivreData>({
        client_id: Number(client?.id_client), type: '', couleur_id: 0, couleur: '', couverture_id: 0, couverture: '', dimension_id: 0, dimension: '', finition_id: 0, livre_id: 0,
        montant: '', pages: 1, papier_id: 0, papier: '', quantite: 1, recto_verso_id: 0, recto: '', reliure_id: 0, imprimante_id: 0, imprimante: '', finition: '',
        reliure: '', finitionPrix: 0,
    });

    const handleSelect = (value: number | string, name: string, option?: string, optionValue?: string) => {
        setDevisLivre(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };
    
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
        if (devisLivre.pages % 4 !== 0) {
            setReliureFiltre(reliureType.filter(r => r !== "Piqure à cheval"));
            // Si la reliure invalide était sélectionnée, on la désélectionne
            if (selectedReliureType === "Piqure à cheval") {
                setSelectedReliureType('');
            }
        } else {
            setReliureFiltre(reliureType);
        }
    }, [devisLivre.pages, selectedReliureType]);
    
    useEffect(() => {
        if (!livre || livreLoading) return;

        const selectedDimension = livre.dimensions.find(d => d.id_dimension === devisLivre.dimension_id);
        const selectedPapier = livre.papiers.flatMap(p => p.accessoire).find(acc => acc.id_papier === devisLivre.papier_id);
        const selectedCouverture = livre.papiers.flatMap(p => p.accessoire).find(acc => acc.id_papier === devisLivre.couverture_id);
        const selectedReliure = filteredReliures.flatMap(r => r.reliures).find(rel => rel.id_reliure === devisLivre.reliure_id);
        //const selectedFinition = livre.finition.find(f => f.id_finition === devisLivre.finition_id);

        const nbrPages = Number(devisLivre.pages) || 0;
        const quantite = Number(devisLivre.quantite) || 1;
        const nbrPoses = selectedDimension?.pose ? parseFloat(String(selectedDimension.pose).replace(',', '.')) : 1;
        const rectoVersoMultiplier = devisLivre.recto === "1" ? 1 : 2; // 1 pour R/V, 2 pour Recto simple

        // Calcul du coût du papier interne (papier + encre)
        const unitPriceWithInk = getUnitPriceWithInk(selectedPapier, devisLivre.imprimante, devisLivre.couleur);
        const coutPapierInterne = (unitPriceWithInk / nbrPoses) * nbrPages / rectoVersoMultiplier;

        const coutCouverture = selectedCouverture ? (Number(selectedCouverture.prix) / nbrPoses) : 0;
        const coutReliure = selectedReliure ? Number(selectedReliure.prix) : 0;
        //const coutFinition = selectedFinition ? Number(selectedFinition.prix) : Number(devisLivre.finitionPrix);
        const coutFinition = devisLivre.finition === 'aucune' ? 0 : Number(devisLivre.finitionPrix);

        const totalUnitaire = coutPapierInterne + coutCouverture + coutReliure + coutFinition ;
        const totalFinal = totalUnitaire * quantite;
        
        setPrixUnitaireReel(totalUnitaire);
        setprixTotalReel(totalFinal);

    }, [devisLivre, livre, livreLoading, filteredReliures]); 

        
        
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
        client_id: Number(client?.id_client), type: '', couleur_id: 0, couleur: '', couverture_id: 0, couverture: '', dimension_id: 0, dimension: '', finition_id: 0, livre_id: 0,
        montant: '', pages: 1, papier_id: 0, papier: '', quantite: 1, recto_verso_id: 0, recto: '', reliure_id: 0, imprimante_id: 0, imprimante: '', finition: '',
        reliure: '', finitionPrix: 0,
        });
        setIsOpen(false);
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
            quantite: devisLivre.quantite,
            remise: 0.00,
            service:'Impression',
        }
        setDevisLivre({ ...devisLivre,  montant:prixTotalReel.toString() });
        handleAddCart(printArticleItem, devisLivre);
        initializeDevisLivre();
    }

  return (
    <Accordion title="Ajouter un article d'impression" icon={<Wrench />} defaultOpen={isOpen}>
        <div className="flex flex-col lg:flex-row gap-8 ">
            <div className="w-full lg:w-2/3 space-y-4">
                { livreLoading ? (<Loader2 className='animate-spin w-5 h-5 text-red-500'/>) : 
                (<> 
                <div className='max-h-[70vh] overflow-y-auto pr-4 space-y-4'>
                 {/* Type d'Impression */}
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Type d&apos;Impression </span>
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
                </div>
                {/* Dimension */}
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Dimension </span>
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
                    </div>
                </div>
                {/* couleur */}
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Couleur </span>
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
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Papier </span>
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
                                <button 
                                    onClick={() => setPapierSelected(papier)}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${papierSelected.categorie === papier.categorie ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                    <span>{papier.categorie}</span>
                                </button>
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
                            <Button variant='secondary' isDisabled={true} 
                            >
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
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Nombre de pages </span>
                    </h4>
                    <Input type="number" value={devisLivre.pages.toString() || ''} onChange={e => handleSelect(e.target.value, 'pages')} placeholder="Ex: 1000" />
                </div>
                {/* recto-verso */}
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Recto/Verso </span>
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
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Couverture </span>
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
                                <button 
                                    onClick={() => setCouvertureSelected(papier)}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${couvertureSelected.categorie === papier.categorie ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                    <span>{papier.categorie}</span>
                                </button>
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
                            <Button variant='secondary' isDisabled={true} 
                            >
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

                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Technologie d&apos;impréssion </span>
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
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Reliure </span>
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
                                    setSelectedReliureType(reliure);
                                    handleSelect(0, 'reliure_id', 'reliure', reliure);
                                } }
                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${selectedReliureType === reliure ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                            >
                                <span>{reliure}</span>
                            </button>
                        ))}
                        </div>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-1 ml-5 gap-2 mt-4'>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                            <ChevronsLeftRightEllipsisIcon />
                            <span className="ml-2"> Référence disponible </span>
                        </h4>
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
                    </div>
                    </div>
                {/* finition */}
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Finition </span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                    <Input type="text" value={devisLivre.finitionPrix?.toString() || ''} onChange={e => handleSelect(Number(e.target.value), 'finitionPrix')} className='mt-3 '/>
                </div>
                
                {/* quantité */}
                <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                        <Layers/>
                        <span className="ml-2"> Quantités </span>
                    </h4>
                    <Input type="number" value={devisLivre.quantite.toLocaleString('fr-FR') || ''} onChange={e => handleSelect(Number(e.target.value), 'quantite')} placeholder="Ex: 1000" />
                </div>   
                </div>
                </>)}
            </div>
            <OptionOverview  userRole={userRole} prixUnitaireReel={prixUnitaireReel} prixTotalReel={prixTotalReel} handleAddToCart={handleAddToCart} devisLivre={devisLivre} />
        </div>
    </Accordion>
  )
}
