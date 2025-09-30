import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisCalendarData } from '@/sources/types/type'
import { CalendarDays, Layers } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from '../OptionOverview/OptionOverview'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisCalendarData) => void;
}


export default function Items({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock complètes pour le items
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
                { id: 1, categorie: 'PCB', accessoire: '170G', prix: 20 },
                { id: 2, categorie: 'PCB', accessoire: '250G', prix: 25 },
                { id: 3, categorie: 'PCB', accessoire: '300G', prix: 30 },
                { id: 4, categorie: 'PCB', accessoire: '350G', prix: 35 },
                { id: 5, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 6, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 7, categorie: 'PCB pellicule', accessoire: '170G', prix: 40 },
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
                { id: 16, categorie: 'PCB', accessoire: '170G', prix: 20 },
                { id: 17, categorie: 'PCB', accessoire: '250G', prix: 25 },
                { id: 18, categorie: 'PCB', accessoire: '300G', prix: 30 },
                { id: 19, categorie: 'PCB', accessoire: '350G', prix: 35 },
                { id: 20, categorie: 'PCB', accessoire: '600G', prix: 35 },
                { id: 21, categorie: 'PCB', accessoire: '700G', prix: 35 },
                { id: 22, categorie: 'PCB pellicule', accessoire: '170G', prix: 40 },
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
                { id: 1, socle: "aucun", prix: 150 },
            ],
            marque_page: [
                { id: 2, socle: "aucun", prix: 150 },
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

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevis(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonctions pour obtenir les données dynamiques basées sur le type sélectionné
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

    // Calcul du prix
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
            prixTotal += dimension.prix_base;
        }

        // Prix du matériau
        const materiau = getCurrentMateriaux().find(m => m.id === devis.materiau_id);
        if (materiau) {
            prixTotal += materiau.prix;
        }

        // Supplément couleur
        const socle = getCurrentSocle().find(c => c.id === Number(devis.socle));
        if (socle) {
            prixTotal += socle.prix;
        }

        // Multiplicateur recto-verso
        const rectoVerso = itemsData.recto_verso.find(r => r.id === devis.recto_verso_id);
        if (rectoVerso) {
            prixTotal *= rectoVerso.multiplicateur;
        }

        // Supplément imprimante
        const imprimante =getCurrentImprimante().find(i => i.id === devis.imprimante_id);
        if (imprimante) {
            prixTotal += imprimante.prix;
        }

        setPrixUnitaireReel(prixTotal);
        setPrixTotalReel(prixTotal * (devis.quantite || 1));

    }, [devis, selecteditemsType, materiauSelected]);

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
        <Accordion title="Calendrier & Marque-Page" icon={<CalendarDays />} defaultOpen={false}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className='max-h-[80vh] overflow-y-auto pr-4 space-y-4'>
                        
                        {/* Type de items */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Type de Produit </span>
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

                        {selecteditemsType && (
                            <>
                                {/* Dimension */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Dimension </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentDimensions().map(dimension => (
                                            <button
                                                key={dimension.id}
                                                onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{dimension.dimension}</div>
                                                <div className={`text-xs text-slate-300`}>{dimension.unitee}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Matériau */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Matériau </span>
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
                                                <div className="text-xs text-slate-300">{materiau.categorie}</div>
                                                <div className="text-xs font-semibold text-green-600">{materiau.prix} Ar</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recto/Verso */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Face </span>
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

                                {/* Imprimante */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Technologie d&apos;impression </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentImprimante().map(imprimante => (
                                            <button
                                                key={imprimante.id}
                                                onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{imprimante.imprimante}</div>
                                                {imprimante.prix > 0 && (
                                                    <div className="text-xs text-green-600">+{imprimante.prix} Ar</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Découpe */}
                                {getCurrentSocle().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Type de découpe </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentSocle().map((socle) => (
                                                <button
                                                    key={socle.id}
                                                    onClick={() => handleSelect(socle.socle, 'socle')}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devis.socle === socle.socle ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <span>{socle.socle}</span>
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

                                {/* Quantité */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-3 flex items-center ">
                                        <Layers />
                                        <span className="ml-2"> Quantité </span>
                                    </h4>
                                    <Input 
                                        type="number" 
                                        value={devis.quantite.toString()} 
                                        onChange={e => handleSelect(Number(e.target.value), 'quantite')} 
                                        placeholder="Ex: 100" 
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
                    devisCalendar={devis} 
                />
            </div>
        </Accordion>
    );
}