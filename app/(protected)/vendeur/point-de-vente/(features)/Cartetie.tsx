import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisCarterieData } from '@/sources/types/type'
import { Layers, Map } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from './OptionOverview/OptionOverview'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisCarterieData) => void;
}

export default function Carterie({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock pour la carterie basées sur le CSV
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
            //{ id: 1, type: 'PCB/Glossy/PCM/Tissu texturé', prix: 50 },
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
        quantite: 1,
        finitionPrix: 0,
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisCarterie(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: string): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Fonction pour filtrer les supports selon le type de carte
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

    // Calcul du prix
    useEffect(() => {
        let prixTotal = 0;

        // Prix de base selon la dimension
        const dimension = CarterieData.dimensions.find(d => d.id === devisCarterie.dimension_id);
        if (dimension) {
            if (dimension.dimension === 'autres') {
                prixTotal += safeNumber(autreDimension.prix);
            } else {
                prixTotal += safeNumber(String(dimension.prix_base));
            }
        }

        // Prix de la forme
        const forme = CarterieData.formes.find(f => f.id === devisCarterie.forme_id);
        if (forme) {
            if (forme.forme === 'autres') {
                prixTotal += safeNumber(autreForme.prix);
            } else {
                prixTotal += safeNumber(String(forme.prix));
            }
        }

        // Prix du support
        const support = getCurrentSupports().find(s => s.id === devisCarterie.support_id);
        if (support) {
            if (support.type === 'autres') {
                prixTotal += safeNumber(autreSupport.prix);
            } else {
                prixTotal += safeNumber(String(support.prix));
            }
        }

        // Prix de la face
        const face = CarterieData.faces.find(f => f.id === devisCarterie.face_id);
        if (face) {
            prixTotal += safeNumber(String(face.prix));
        }

        // Prix de l'imprimante
        const imprimante = CarterieData.imprimantes.find(i => i.id === devisCarterie.imprimante_id);
        if (imprimante) {
            prixTotal += safeNumber(String(imprimante.prix));
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(String(devisCarterie.finitionPrix));
        prixTotal += safeNumber(devisCarterie.optionPrix);

        // Calcul du total avec quantité (prix unitaire pour 100 cartes)
        const quantite = safeNumber(String(devisCarterie.quantite));
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * (quantite * 1);

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisCarterie, selectedCarterieType, autreDimension, autreForme, autreSupport]);

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
            quantite: safeNumber(String(devisCarterie.quantite)),
            remise: 0.00,
            service: 'Carterie',
        };
        
        setDevisCarterie(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(carterieItem, devisCarterie);
        initializeDevisCarterie();
    };

    return (
        <Accordion title="Carterie" icon={<Map />} defaultOpen={false}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className='max-h-[80vh] overflow-y-auto pr-4 space-y-4'>
                        
                        {/* Type de Carte */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Type de Carte </span>
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
                        <div>
                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                            <Layers />
                            <span className="ml-2"> Dimension </span>
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {CarterieData.dimensions.map(dimension => (
                                <button
                                    key={dimension.id}
                                    onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                >
                                    <div className="font-semibold">{dimension.dimension}</div>
                                    <div className="text-xs text-slate-500">{dimension.unitee}</div>
                                    {dimension.dimension !== 'autres' && (
                                        <div className="text-xs font-semibold text-green-600">{dimension.prix_base} Ar/100</div>
                                    )}
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
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Forme de découpe </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {CarterieData.formes.map(forme => (
                                            <button
                                                key={forme.id}
                                                onClick={() => handleSelect(forme.id, 'forme_id', 'forme', forme.forme)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.forme_id === forme.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{forme.forme}</div>
                                                {forme.prix > 0 && forme.forme !== 'autres' && (
                                                    <div className="text-xs text-green-600">+{forme.prix} Ar</div>
                                                )}
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
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                        {selectedCarterieType && (
                            <>
                                {/* Type de papier/support */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Type de papier/support </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentSupports().map(support => (
                                            <button
                                                key={support.id}
                                                onClick={() => handleSelect(support.id, 'support_id', 'support', support.type)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.support_id === support.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold text-xs">{support.type}</div>
                                                {support.prix > 0 && support.type !== 'autres' && (
                                                    <div className="text-xs text-green-600">+{support.prix} Ar</div>
                                                )}
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

                                

                                {/* Technologie d'impression */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Technologie d&apos;impression </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {CarterieData.imprimantes.map(imprimante => (
                                            <button
                                                key={imprimante.id}
                                                onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisCarterie.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{imprimante.imprimante}</div>
                                                <div className="text-xs text-green-600">+{imprimante.prix} Ar</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>


                            </>
                        )}
                        {/* Face */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Face d&apos;impression </span>
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
                        {/* Quantité */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-3 flex items-center ">
                                <Layers />
                                <span className="ml-2"> Quantité (cartes) </span>
                            </h4>
                            <Input 
                                type="number" 
                                value={devisCarterie.quantite.toString()} 
                                onChange={e => handleSelect(Math.max(1, safeNumber(e.target.value)), 'quantite')} 
                                placeholder="Ex: 1000" 
                                min="1"
                                step="1"
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
        </Accordion>
    );
}