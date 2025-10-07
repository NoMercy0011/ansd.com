import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisFlyersData } from '@/sources/types/type'
import { Layers, FileText } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from './OptionOverview/OptionOverview'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisFlyersData) => void;
}

export default function Flyers({ param, userRole, handleAddCart }: PrintArticleProps) {

   const [selectedSupport, setSelectedSupport] = useState<string>('');
   const [autreSupport, setAutreSupport] = useState({ nom: '', prix: '' });
    
    // Données mock pour les flyers basées sur le CSV
    const FlyersData = {
        dimensions: [
            { id: 1, dimension: 'A6', unitee: '105x148mm', prix_base: 50 },
            { id: 2, dimension: 'DL', unitee: '99x210mm', prix_base: 60 },
            { id: 3, dimension: 'A5', unitee: '148x210mm', prix_base: 80 },
            { id: 4, dimension: 'B5', unitee: '176x250mm', prix_base: 100 },
            { id: 5, dimension: 'A4', unitee: '210x297mm', prix_base: 120 },
            { id: 6, dimension: 'A3', unitee: '297x420mm', prix_base: 200 }
        ],

        volets: [
            { id: 1, volet: '1 (simple)', plis: 1, prix: 0 },
            { id: 2, volet: '2', plis: 2, prix: 50 },
            { id: 3, volet: 'autres', plis: 0, prix: 100 }
        ],

        faces: [
            { id: 1, face: 'Recto', prix: 0 },
            { id: 2, face: 'Recto/Verso', prix: 100 }
        ],

        supports: [
            { id: 1, type: 'Offset standard', prix: 0 },
            { id: 2, type: 'PCB', prix: 10 },
            { id: 3, type: 'PCB pelliculé', prix: 20 },
            { id: 4, type: 'Glossy', prix: 15 },
            { id: 5, type: 'autres', prix: 30 }
        ],

        grammages: {
            'Offset standard': [
                { id: 1, grammage: '80G', prix: 20 }
            ],
            'PCB': [
                { id: 2, grammage: '90G', prix: 25 },
                { id: 3, grammage: '115G', prix: 30 },
                { id: 4, grammage: '130G', prix: 35 },
                { id: 5, grammage: '150G', prix: 40 },
                { id: 6, grammage: '170G', prix: 45 },
                { id: 7, grammage: '250G', prix: 60 },
                { id: 8, grammage: '300G', prix: 75 }
            ],
            'PCB pelliculé': [
                { id: 9, grammage: '170G', prix: 70 },
                { id: 10, grammage: '250G', prix: 85 },
                { id: 11, grammage: '300G', prix: 100 }
            ],
            'Glossy': [
                { id: 12, grammage: '120G', prix: 50 },
                { id: 13, grammage: '160G', prix: 65 },
                { id: 14, grammage: '250G', prix: 80 },
                { id: 15, grammage: '300G', prix: 95 }
            ],
            'autres': [
                { id: 16, grammage: 'personnalisé', prix: 120 }
            ]
        },

        imprimantes: [
            { id: 1, imprimante: 'Laser', prix: 50 },
            { id: 2, imprimante: "Jet d'encre", prix: 30 }
        ]
    };

    const [client, setClient] = useState<clientType>();
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);
    const [autreVolet, setAutreVolet] = useState({ nom: '', prix: '' });
    const [autrePapier, setAutrePapier] = useState({ nom: '', prix: '' });

    const [devisFlyers, setDevisFlyers] = useState<devisFlyersData>({
        client_id: 0,
        dimension_id: 0,
        dimension: '',
        volet_id: 0,
        volet: '',
        face_id: 0,
        face: '',
        support_id: 0,
        support: '',
        grammage_id: 0,
        grammage: '',
        imprimante_id: 0,
        imprimante: '',
        montant: '',
        quantite: 1, // Quantité de base pour les flyers
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisFlyers(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonction pour obtenir les grammages selon le support sélectionné
    const getCurrentGrammages = () => {
        if (!selectedSupport) return [];
        return FlyersData.grammages[selectedSupport as keyof typeof FlyersData.grammages] || [];
    };
    
    // Fonction pour gérer la sélection du support
    const handleSupportSelect = (supportId: number, supportType: string) => {
        setSelectedSupport(supportType);
        handleSelect(supportId, 'support_id', 'support', supportType);
        
        // Réinitialiser la sélection de grammage si le support change
        setDevisFlyers(prev => ({ ...prev, grammage_id: 0, grammage: '' }));
        setAutrePapier({ nom: '', prix: '' });
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: any): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Calcul du prix
    useEffect(() => {
        let prixTotal = 0;

        // Prix de base selon la dimension
        const dimension = FlyersData.dimensions.find(d => d.id === devisFlyers.dimension_id);
        if (dimension) {
            prixTotal += safeNumber(dimension.prix_base);
        }

        // Prix du volet
        const volet = FlyersData.volets.find(v => v.id === devisFlyers.volet_id);
        if (volet) {
            if (volet.volet === 'autres') {
                prixTotal += safeNumber(autreVolet.prix);
            } else {
                prixTotal += safeNumber(volet.prix);
            }
        }

        // Prix de la face
        const face = FlyersData.faces.find(f => f.id === devisFlyers.face_id);
        if (face) {
            prixTotal += safeNumber(face.prix);
        }

        // Prix du support
        const support = FlyersData.supports.find(s => s.id === devisFlyers.support_id);
        if (support) {
            if (support.type === 'autres') {
                prixTotal += safeNumber(autreSupport.prix);
            } else {
                prixTotal += safeNumber(support.prix);
            }
        }

        // Prix du grammage
        const grammage = getCurrentGrammages().find(g => g.id === devisFlyers.grammage_id);
        if (grammage) {
            if (grammage.grammage === 'personnalisé') {
                prixTotal += safeNumber(autrePapier.prix);
            } else {
                prixTotal += safeNumber(grammage.prix);
            }
        }

        // Prix de l'imprimante
        const imprimante = FlyersData.imprimantes.find(i => i.id === devisFlyers.imprimante_id);
        if (imprimante) {
            prixTotal += safeNumber(imprimante.prix);
        }

        // Ajouter les options personnalisées
        //prixTotal += safeNumber(devisFlyers.finitionPrix);
        prixTotal += safeNumber(devisFlyers.optionPrix);

        // Calcul du total avec quantité (prix unitaire pour 100 flyers)
        const quantite = safeNumber(devisFlyers.quantite);
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * (quantite / 1); // Prix pour la quantité demandée

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisFlyers, autreVolet, autrePapier]);

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisFlyers(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    const initializeDevisFlyers = () => {
        setDevisFlyers({
            client_id: Number(client?.id_client),
            dimension_id: 0,
            dimension: '',
            volet_id: 0,
            volet: '',
            face_id: 0,
            face: '',
            support_id: 0,
            support: '',
            grammage_id: 0,
            grammage: '',
            imprimante_id: 0,
            imprimante: '',
            montant: '',
            quantite: 1,
            optionPrix: ''
        });
        setAutreVolet({ nom: '', prix: '' });
        setAutrePapier({ nom: '', prix: '' });
    };

    const handleAddToCart = () => {
        const detailsDevis = `
            Dimension: ${devisFlyers.dimension || 'Non spécifié'}
            Nb volets: ${devisFlyers.volet === 'autres' ? autreVolet.nom : devisFlyers.volet}
            Face: ${devisFlyers.face || 'Non spécifié'}
            Papier: ${devisFlyers.support === 'autres' ? autrePapier.nom : `${devisFlyers.support}-${devisFlyers.grammage}`}
            Imprimante: ${devisFlyers.imprimante || 'Non spécifié'}`;

        const flyersItem: CartItemsType = {
            id: Date.now(),
            designation: 'Flyers',
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(devisFlyers.quantite),
            remise: 0.00,
            service: 'Flyers',
        };
        
        setDevisFlyers(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(flyersItem, devisFlyers);
        initializeDevisFlyers();
    };

    return (
        <Accordion title="Flyers" icon={<FileText />} defaultOpen={false}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className='max-h-[80vh] overflow-y-auto pr-4 space-y-4'>
                        
                        {/* Dimension */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Dimension </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {FlyersData.dimensions.map(dimension => (
                                    <button
                                        key={dimension.id}
                                        onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisFlyers.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <div className="font-semibold">{dimension.dimension}</div>
                                        <div className="text-xs text-slate-500">{dimension.unitee}</div>
                                        <div className="text-xs font-semibold text-green-600">{dimension.prix_base} Ar/100</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Nombre de volets/pli */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Nombre de volets/pli </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {FlyersData.volets.map(volet => (
                                    <button
                                        key={volet.id}
                                        onClick={() => handleSelect(volet.id, 'volet_id', 'volet', volet.volet)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisFlyers.volet_id === volet.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <div className="font-semibold">{volet.volet}</div>
                                        {volet.prix > 0 && volet.volet !== 'autres' && (
                                            <div className="text-xs text-green-600">+{volet.prix} Ar</div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Input pour volet "autres" */}
                            {devisFlyers.volet === 'autres' && (
                                <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                    <h5 className="font-semibold mb-3">Volet personnalisé</h5>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                value={autreVolet.nom}
                                                onChange={(e) => setAutreVolet(prev => ({ ...prev, nom: e.target.value }))}
                                                placeholder="Description du volet personnalisé"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={autreVolet.prix}
                                                onChange={(e) => setAutreVolet(prev => ({ ...prev, prix: e.target.value }))}
                                                placeholder="Prix supplémentaire"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Type de support */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Type de support </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {FlyersData.supports.map(support => (
                                    <button
                                        key={support.id}
                                        onClick={() => handleSupportSelect(support.id, support.type)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisFlyers.support_id === support.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <div className="font-semibold">{support.type}</div>
                                        {support.prix > 0 && support.type !== 'autres' && (
                                            <div className="text-xs text-green-600">+{support.prix} Ar</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Input pour support "autres" */}
                            {devisFlyers.support === 'autres' && (
                                <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                    <h5 className="font-semibold mb-3">Support personnalisé</h5>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Input
                                                type="text"
                                                value={autreSupport.nom}
                                                onChange={(e) => setAutreSupport(prev => ({ ...prev, nom: e.target.value }))}
                                                placeholder="Nom du support personnalisé"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={autreSupport.prix}
                                                onChange={(e) => setAutreSupport(prev => ({ ...prev, prix: e.target.value }))}
                                                placeholder="Prix du support"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Grammage (apparaît seulement si un support est sélectionné) */}
                        {selectedSupport && (
                            <div>
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                    <Layers />
                                    <span className="ml-2"> Grammage - {selectedSupport} </span>
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {getCurrentGrammages().map(grammage => (
                                        <button
                                            key={grammage.id}
                                            onClick={() => handleSelect(grammage.id, 'grammage_id', 'grammage', grammage.grammage)}
                                            className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisFlyers.grammage_id === grammage.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                        >
                                            <div className="font-semibold">{grammage.grammage}</div>
                                            {grammage.grammage !== 'personnalisé' && (
                                                <div className="text-xs text-green-600">+{grammage.prix} Ar</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Input pour grammage "personnalisé" */}
                                {devisFlyers.grammage === 'personnalisé' && (
                                    <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                        <h5 className="font-semibold mb-3">Grammage personnalisé</h5>
                                        <div className="space-y-3">
                                            <div className="relative">
                                                <Input
                                                    type="text"
                                                    value={autrePapier.nom}
                                                    onChange={(e) => setAutrePapier(prev => ({ ...prev, nom: e.target.value }))}
                                                    placeholder="Description du grammage personnalisé"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    value={autrePapier.prix}
                                                    onChange={(e) => setAutrePapier(prev => ({ ...prev, prix: e.target.value }))}
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
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Face d'impression </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {FlyersData.faces.map(face => (
                                    <button
                                        key={face.id}
                                        onClick={() => handleSelect(face.id, 'face_id', 'face', face.face)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisFlyers.face_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
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
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Technologie d'impression </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {FlyersData.imprimantes.map(imprimante => (
                                    <button
                                        key={imprimante.id}
                                        onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisFlyers.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <div className="font-semibold">{imprimante.imprimante}</div>
                                        <div className="text-xs text-green-600">+{imprimante.prix} Ar</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Options supplémentaires */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Options supplémentaires </span>
                            </h4>
                            <div className="space-y-3">
                                {/* <div className="relative">
                                    <Input
                                        type="number"
                                        value={devisFlyers.finitionPrix}
                                        onChange={(e) => handleSelect(safeNumber(e.target.value), 'finitionPrix')}
                                        placeholder="Prix finition supplémentaire"
                                        min="0"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                </div> */}
                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={devisFlyers.optionPrix}
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
                                <span className="ml-2"> Quantité (flyers) </span>
                            </h4>
                            <Input 
                                type="number" 
                                value={devisFlyers.quantite.toString()} 
                                onChange={e => handleSelect(Math.max(1, safeNumber(e.target.value)), 'quantite')} 
                                placeholder="Ex: 1000" 
                                min="1"
                                step="1"
                            />
                            <p className="text-xs text-slate-500 mt-1">Quantité minimum: 100 flyers</p>
                        </div>
                    </div>
                </div>
                
                {/* Overview et calcul des prix */}
                <OptionOverview 
                    userRole={userRole} 
                    prixUnitaireReel={prixUnitaireReel} 
                    prixTotalReel={prixTotalReel} 
                    handleAddToCart={handleAddToCart} 
                    devisFlyers={devisFlyers} 
                />
            </div>
        </Accordion>
    );
}