import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisTextileData } from '@/sources/types/type'
import { Layers, Shirt } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from './OptionOverview/OptionOverview'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis: devisTextileData) => void;
}

export default function Textiles({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock pour les Textiles basées sur le CSV
    const TextilesData = {
        types: [
            { id: 1, type: 'tshirt', nom: 'T-shirt' },
            { id: 2, type: 'polo', nom: 'Polo' },
            { id: 3, type: 'sweat', nom: 'Sweat' },
            { id: 4, type: 'gilet', nom: 'Gilet' },
            { id: 5, type: 'casquette', nom: 'Casquette' },
            { id: 6, type: 'nappe', nom: 'Nappe' },
            { id: 7, type: 'bob', nom: 'Bob' },
            { id: 8, type: 'maillot', nom: 'Maillot' },
            { id: 9, type: 'combinaison', nom: 'Combinaison' },
            { id: 10, type: 'totebag', nom: 'Totebag' },
            { id: 11, type: 'trousse', nom: 'Trousse' }
        ],
        
        tailles: {
            tshirt: [
                { id: 1, taille: '2XS', prix_base: 5000 },
                { id: 2, taille: 'XS', prix_base: 4500 },
                { id: 3, taille: 'S', prix_base: 4000 },
                { id: 4, taille: 'M', prix_base: 3500 },
                { id: 5, taille: 'L', prix_base: 4000 },
                { id: 6, taille: 'XL', prix_base: 4500 },
                { id: 7, taille: 'XXL', prix_base: 5000 },
                { id: 8, taille: 'autres', prix_base: 6000 }
            ],
            polo: [
                { id: 9, taille: '2XS', prix_base: 7000 },
                { id: 10, taille: 'XS', prix_base: 6500 },
                { id: 11, taille: 'S', prix_base: 6000 },
                { id: 12, taille: 'M', prix_base: 5500 },
                { id: 13, taille: 'L', prix_base: 6000 },
                { id: 14, taille: 'XL', prix_base: 6500 },
                { id: 15, taille: 'XXL', prix_base: 7000 },
                { id: 16, taille: 'autres', prix_base: 8000 }
            ],
            sweat: [
                { id: 17, taille: '2XS', prix_base: 12000 },
                { id: 18, taille: 'XS', prix_base: 11000 },
                { id: 19, taille: 'S', prix_base: 10000 },
                { id: 20, taille: 'M', prix_base: 9000 },
                { id: 21, taille: 'L', prix_base: 10000 },
                { id: 22, taille: 'XL', prix_base: 11000 },
                { id: 23, taille: 'XXL', prix_base: 12000 },
                { id: 24, taille: 'autres', prix_base: 13000 }
            ],
            gilet: [
                { id: 25, taille: 'XS', prix_base: 15000 },
                { id: 26, taille: 'S', prix_base: 14000 },
                { id: 27, taille: 'M', prix_base: 13000 },
                { id: 28, taille: 'L', prix_base: 14000 },
                { id: 29, taille: 'XL', prix_base: 15000 },
                { id: 30, taille: 'XXL', prix_base: 16000 },
                { id: 31, taille: 'autres', prix_base: 17000 }
            ],
            casquette: [
                { id: 32, taille: 'Taille unique', prix_base: 8000 }
            ],
            nappe: [
                { id: 33, taille: 'Dimensions personnalisées', prix_base: 20000 }
            ],
            bob: [
                { id: 34, taille: 'Taille unique', prix_base: 7500 }
            ],
            maillot: [
                { id: 35, taille: 'XS', prix_base: 10000 },
                { id: 36, taille: 'S', prix_base: 9000 },
                { id: 37, taille: 'M', prix_base: 8000 },
                { id: 38, taille: 'L', prix_base: 9000 },
                { id: 39, taille: 'XL', prix_base: 10000 },
                { id: 40, taille: 'XXL', prix_base: 11000 },
                { id: 41, taille: 'autres', prix_base: 12000 }
            ],
            combinaison: [
                { id: 42, taille: 'Sur mesure', prix_base: 25000 }
            ],
            totebag: [
                { id: 43, taille: 'A4', prix_base: 6000 },
                { id: 44, taille: 'A3', prix_base: 8000 },
                { id: 45, taille: 'autres', prix_base: 10000 }
            ],
            trousse: [
                { id: 46, taille: 'Dimensions variées', prix_base: 5000 }
            ]
        },

        grammages: {
            tshirt: [
                { id: 1, grammage: '120 g/m²', prix: 0 },
                { id: 2, grammage: '170 g/m²', prix: 1000 },
                { id: 3, grammage: '180 g/m²', prix: 1500 },
                { id: 4, grammage: '200 g/m²', prix: 2000 }
            ],
            polo: [
                { id: 5, grammage: '120 g/m²', prix: 0 },
                { id: 6, grammage: '170 g/m²', prix: 1000 },
                { id: 7, grammage: '180 g/m²', prix: 1500 },
                { id: 8, grammage: '201 g/m²', prix: 2000 }
            ],
            sweat: [
                { id: 9, grammage: '250-350 g/m²', prix: 0 }
            ],
            gilet: [
                { id: 10, grammage: '200-300 g/m²', prix: 0 }
            ],
            maillot: [
                { id: 11, grammage: '150-250 g/m²', prix: 0 }
            ]
        },

        dimensions_impression: {
            tshirt: [
                { id: 1, dimension: 'A6', unitee: '105x148mm', prix: 500 },
                { id: 2, dimension: 'A5', unitee: '148x210mm', prix: 1000 },
                { id: 3, dimension: 'A4', unitee: '210x297mm', prix: 2000 },
                { id: 4, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
                { id: 5, dimension: 'autres', unitee: 'personnalisée', prix: 5000 }
            ],
            polo: [
                { id: 6, dimension: 'A6', unitee: '105x148mm', prix: 500 },
                { id: 7, dimension: 'A5', unitee: '148x210mm', prix: 1000 },
                { id: 8, dimension: 'A4', unitee: '210x297mm', prix: 2000 },
                { id: 9, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
                { id: 10, dimension: 'autres', unitee: 'personnalisée', prix: 5000 }
            ],
            sweat: [
                { id: 11, dimension: 'A6', unitee: '105x148mm', prix: 500 },
                { id: 12, dimension: 'A5', unitee: '148x210mm', prix: 1000 },
                { id: 13, dimension: 'A4', unitee: '210x297mm', prix: 2000 },
                { id: 14, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
                { id: 15, dimension: 'autres', unitee: 'personnalisée', prix: 5000 }
            ],
            gilet: [
                { id: 16, dimension: 'A6', unitee: '105x148mm', prix: 500 },
                { id: 17, dimension: 'A5', unitee: '148x210mm', prix: 1000 },
                { id: 18, dimension: 'A4', unitee: '210x297mm', prix: 2000 },
                { id: 19, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
                { id: 20, dimension: 'autres', unitee: 'personnalisée', prix: 5000 }
            ],
            casquette: [
                { id: 21, dimension: 'longueur', unitee: 'personnalisée', prix: 2000 },
                { id: 22, dimension: 'largeur', unitee: 'personnalisée', prix: 2000 }
            ],
            nappe: [
                { id: 23, dimension: 'longueur', unitee: 'personnalisée', prix: 5000 },
                { id: 24, dimension: 'largeur', unitee: 'personnalisée', prix: 5000 }
            ],
            bob: [
                { id: 25, dimension: 'longueur', unitee: 'personnalisée', prix: 1500 },
                { id: 26, dimension: 'largeur', unitee: 'personnalisée', prix: 1500 }
            ],
            maillot: [
                { id: 27, dimension: 'longueur', unitee: 'personnalisée', prix: 3000 },
                { id: 28, dimension: 'largeur', unitee: 'personnalisée', prix: 3000 }
            ],
            combinaison: [
                { id: 29, dimension: 'longueur', unitee: 'personnalisée', prix: 8000 },
                { id: 30, dimension: 'largeur', unitee: 'personnalisée', prix: 8000 }
            ],
            totebag: [
                { id: 31, dimension: 'longueur', unitee: 'personnalisée', prix: 2000 },
                { id: 32, dimension: 'largeur', unitee: 'personnalisée', prix: 2000 }
            ],
            trousse: [
                { id: 33, dimension: 'longueur', unitee: 'personnalisée', prix: 1000 },
                { id: 34, dimension: 'largeur', unitee: 'personnalisée', prix: 1000 }
            ]
        },

        emplacements: {
            tshirt: [
                { id: 1, emplacement: 'Face', prix: 0 },
                { id: 2, emplacement: 'Dos', prix: 1000 },
                { id: 3, emplacement: 'Manches', prix: 1500 }
            ],
            polo: [
                { id: 4, emplacement: 'Face', prix: 0 },
                { id: 5, emplacement: 'Dos', prix: 1000 },
                { id: 6, emplacement: 'Manches', prix: 1500 }
            ],
            sweat: [
                { id: 7, emplacement: 'Face', prix: 0 },
                { id: 8, emplacement: 'Dos', prix: 1000 },
                { id: 9, emplacement: 'Manches', prix: 1500 }
            ],
            gilet: [
                { id: 10, emplacement: 'Face', prix: 0 },
                { id: 11, emplacement: 'Dos', prix: 1000 },
                { id: 12, emplacement: 'Manches', prix: 1500 }
            ],
            casquette: [
                { id: 13, emplacement: 'Front', prix: 0 },
                { id: 14, emplacement: 'Côté', prix: 500 },
                { id: 15, emplacement: 'autres', prix: 1000 }
            ],
            nappe: [
                { id: 16, emplacement: 'Front', prix: 0 },
                { id: 17, emplacement: 'Côté', prix: 1000 },
                { id: 18, emplacement: 'autres', prix: 2000 }
            ],
            bob: [
                { id: 19, emplacement: 'Front', prix: 0 },
                { id: 20, emplacement: 'Côté', prix: 500 },
                { id: 21, emplacement: 'autres', prix: 1000 }
            ],
            maillot: [
                { id: 22, emplacement: 'Face', prix: 0 },
                { id: 23, emplacement: 'Dos', prix: 1000 },
                { id: 24, emplacement: 'Manches', prix: 1500 }
            ],
            combinaison: [
                { id: 25, emplacement: 'Face', prix: 0 },
                { id: 26, emplacement: 'Dos', prix: 1000 },
                { id: 27, emplacement: 'Manches', prix: 1500 }
            ],
            totebag: [
                { id: 28, emplacement: 'Face', prix: 0 },
                { id: 29, emplacement: 'Dos', prix: 1000 }
            ],
            trousse: [
                { id: 30, emplacement: 'Face', prix: 0 },
                { id: 31, emplacement: 'Dos', prix: 500 }
            ]
        },

        technologies: [
            { id: 1, technologie: 'broderie', prix: 3000 },
            { id: 2, technologie: 'DTF', prix: 2000 },
            { id: 3, technologie: 'flex', prix: 1500 }
        ],

        couleurs_tissus: [
            { id: 1, couleur: 'Blanc', prix: 0 },
            { id: 2, couleur: 'Noir', prix: 500 },
            { id: 3, couleur: 'Bleu', prix: 500 },
            { id: 4, couleur: 'Rouge', prix: 500 },
            { id: 5, couleur: 'Vert', prix: 500 },
            { id: 6, couleur: 'Jaune', prix: 500 },
            { id: 7, couleur: 'Gris', prix: 500 },
            { id: 8, couleur: 'autres', prix: 1000 }
        ]
    };

    const [client, setClient] = useState<clientType>();
    const [selectedType, setSelectedType] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);

    const [autreTaille, setAutreTaille] = useState({ nom: '', prix: '' });
    const [autreDimension, setAutreDimension] = useState({ nom: '', prix: '' });
    const [autreEmplacement, setAutreEmplacement] = useState({ nom: '', prix: '' });
    const [autreCouleur, setAutreCouleur] = useState({ nom: '', prix: '' });

    const [devisTextile, setDevisTextile] = useState<devisTextileData>({
        client_id: 0,
        type: '',
        taille_id: 0,
        taille: '',
        grammage_id: 0,
        grammage: '',
        dimension_id: 0,
        dimension: '',
        emplacement_id: 0,
        emplacement: '',
        technologie_id: 0,
        technologie: '',
        couleur_id: 0,
        couleur: '',
        textile_id: 0,
        montant: '',
        quantite: 1,
        finitionPrix: 0,
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisTextile(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
        
    };

    // Fonctions pour obtenir les données dynamiques
    const getCurrentTailles = () => {
        if (!selectedType) return [];
        return TextilesData.tailles[selectedType as keyof typeof TextilesData.tailles] || [];
    };

    const getCurrentGrammages = () => {
        if (!selectedType) return [];
        return TextilesData.grammages[selectedType as keyof typeof TextilesData.grammages] || [];
    };

    const getCurrentDimensions = () => {
        if (!selectedType) return [];
        return TextilesData.dimensions_impression[selectedType as keyof typeof TextilesData.dimensions_impression] || [];
    };

    const getCurrentEmplacements = () => {
        if (!selectedType) return [];
        return TextilesData.emplacements[selectedType as keyof typeof TextilesData.emplacements] || [];
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: string): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    useEffect(() => {
        setDevisTextile({...devisTextile, 
            grammage_id : 0, grammage:''});
    }, [devisTextile.type])

    useEffect(() => {
        if (!selectedType) {
            setPrixUnitaireReel(0);
            setPrixTotalReel(0);
            return;
        }

        let prixTotal = 0;

        // Prix de base selon la taille
        const taille = getCurrentTailles().find(t => t.id === devisTextile.taille_id);
        if (taille) {
            if (taille.taille === 'autres') {
                prixTotal += safeNumber(autreTaille.prix);
            } else {
                prixTotal += safeNumber(taille.prix_base.toString());
            }
        }

        // Prix du grammage
        const grammage = getCurrentGrammages().find(g => g.id === devisTextile.grammage_id);
        if (grammage) {
            prixTotal += safeNumber(grammage.prix.toString());
        }

        // Prix de la dimension d'impression
        const dimension = getCurrentDimensions().find(d => d.id === devisTextile.dimension_id);
        if (dimension) {
            if (dimension.dimension === 'autres') {
                prixTotal += safeNumber(autreDimension.prix);
            } else {
                prixTotal += safeNumber(dimension.prix.toString());
            }
        }

        // Prix de l'emplacement
        const emplacement = getCurrentEmplacements().find(e => e.id === devisTextile.emplacement_id);
        if (emplacement) {
            if (emplacement.emplacement === 'autres') {
                prixTotal += safeNumber(autreEmplacement.prix);
            } else {
                prixTotal += safeNumber(emplacement.prix.toString());
            }
        }

        // Prix de la technologie
        const technologie = TextilesData.technologies.find(t => t.id === devisTextile.technologie_id);
        if (technologie) {
            prixTotal += safeNumber(technologie.prix.toString());
        }

        // Prix de la couleur
        const couleur = TextilesData.couleurs_tissus.find(c => c.id === devisTextile.couleur_id);
        if (couleur) {
            if (couleur.couleur === 'autres') {
                prixTotal += safeNumber(autreCouleur.prix);
            } else {
                prixTotal += safeNumber(couleur.prix.toString());
            }
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(devisTextile.finitionPrix.toString());
        prixTotal += safeNumber(devisTextile.optionPrix);

        // Calcul du total avec quantité
        const quantite = safeNumber(devisTextile.quantite.toString());
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisTextile, selectedType, autreTaille, autreDimension, autreEmplacement, autreCouleur]);

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisTextile(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    const initializeDevisTextile = () => {
        setDevisTextile({
            client_id: Number(client?.id_client),
            type: '',
            taille_id: 0,
            taille: '',
            grammage_id: 0,
            grammage: '',
            dimension_id: 0,
            dimension: '',
            emplacement_id: 0,
            emplacement: '',
            technologie_id: 0,
            technologie: '',
            couleur_id: 0,
            couleur: '',
            textile_id: 0,
            montant: '',
            quantite: 1,
            finitionPrix: 0,
            optionPrix: ''
        });
        setSelectedType('');
        setAutreTaille({ nom: '', prix: '' });
        setAutreDimension({ nom: '', prix: '' });
        setAutreEmplacement({ nom: '', prix: '' });
        setAutreCouleur({ nom: '', prix: '' });
    };

    const handleAddToCart = () => {
        const textileType = TextilesData.types.find(t => t.id === devisTextile.textile_id);
        
        const detailsDevis = `
                Type: ${textileType?.nom}
                /Taille: ${devisTextile.taille === 'autres' ? autreTaille.nom : devisTextile.taille}
                /Grammage: ${devisTextile.grammage || 'Non spécifié'}
                /Dimension impression: ${devisTextile.dimension === 'autres' ? autreDimension.nom : devisTextile.dimension}
                /Emplacement: ${devisTextile.emplacement === 'autres' ? autreEmplacement.nom : devisTextile.emplacement}
                /Technologie: ${devisTextile.technologie || 'Non spécifié'}
                /Couleur: ${devisTextile.couleur === 'autres' ? autreCouleur.nom : devisTextile.couleur || 'Non spécifié'}`;

        const textileItem: CartItemsType = {
            id: Date.now(),
            designation: `Textile - ${textileType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(devisTextile.quantite.toString()),
            remise: 0.00,
            service: 'Textile',
        };
        
        setDevisTextile(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(textileItem, devisTextile);
        initializeDevisTextile();
    };

    return (
        <Accordion title="Textiles" icon={<Shirt />} defaultOpen={false}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className='max-h-[80vh] overflow-y-auto pr-4 space-y-4'>
                        
                        {/* Type de Produit */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Type de Produit </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {TextilesData.types.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            handleSelect(type.id, 'textile_id', 'type', type.type);
                                            setSelectedType(type.type);
                                        }}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.textile_id === type.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <span>{type.nom}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedType && (
                            <>
                                {/* Taille */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Taille </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentTailles().map(taille => (
                                            <button
                                                key={taille.id}
                                                onClick={() => handleSelect(taille.id, 'taille_id', 'taille', taille.taille)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.taille_id === taille.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{taille.taille}</div>
                                                <div className="text-xs font-semibold text-green-600">{taille.prix_base.toLocaleString()} Ar</div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input pour taille "autres" */}
                                    {devisTextile.taille === 'autres' && (
                                        <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                            <h5 className="font-semibold mb-3">Taille personnalisée</h5>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        value={autreTaille.nom}
                                                        onChange={(e) => setAutreTaille(prev => ({ ...prev, nom: e.target.value }))}
                                                        placeholder="Description de la taille"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={autreTaille.prix}
                                                        onChange={(e) => setAutreTaille(prev => ({ ...prev, prix: e.target.value }))}
                                                        placeholder="Prix supplémentaire"
                                                        min="0"
                                                    />
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Grammage (uniquement pour certains types) */}
                                {getCurrentGrammages().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Grammage du tissu </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentGrammages().map(grammage => (
                                                <button
                                                    key={grammage.id}
                                                    onClick={() => handleSelect(grammage.id, 'grammage_id', 'grammage', grammage.grammage)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.grammage_id === grammage.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{grammage.grammage}</div>
                                                    {grammage.prix > 0 && (
                                                        <div className="text-xs text-green-600">+{grammage.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Dimensions d'impression */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Dimensions d&apos;impression </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentDimensions().map(dimension => (
                                            <button
                                                key={dimension.id}
                                                onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{dimension.dimension}</div>
                                                <div className="text-xs text-slate-500">{dimension.unitee}</div>
                                                {dimension.dimension !== 'autres' && (
                                                    <div className="text-xs text-green-600">+{dimension.prix.toLocaleString()} Ar</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input pour dimension "autres" */}
                                    {devisTextile.dimension === 'autres' && (
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

                                {/* Emplacement d'impression */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Emplacement d&apos;impression </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentEmplacements().map(emplacement => (
                                            <button
                                                key={emplacement.id}
                                                onClick={() => handleSelect(emplacement.id, 'emplacement_id', 'emplacement', emplacement.emplacement)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.emplacement_id === emplacement.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{emplacement.emplacement}</div>
                                                {emplacement.prix > 0 && emplacement.emplacement !== 'autres' && (
                                                    <div className="text-xs text-green-600">+{emplacement.prix.toLocaleString()} Ar</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input pour emplacement "autres" */}
                                    {devisTextile.emplacement === 'autres' && (
                                        <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                            <h5 className="font-semibold mb-3">Emplacement personnalisé</h5>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        value={autreEmplacement.nom}
                                                        onChange={(e) => setAutreEmplacement(prev => ({ ...prev, nom: e.target.value }))}
                                                        placeholder="Description de l'emplacement"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={autreEmplacement.prix}
                                                        onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: e.target.value }))}
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
                                        {TextilesData.technologies.map(technologie => (
                                            <button
                                                key={technologie.id}
                                                onClick={() => handleSelect(technologie.id, 'technologie_id', 'technologie', technologie.technologie)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.technologie_id === technologie.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{technologie.technologie}</div>
                                                <div className="text-xs text-green-600">+{technologie.prix.toLocaleString()} Ar</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Couleurs de tissus */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Couleur du tissu </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {TextilesData.couleurs_tissus.map(couleur => (
                                            <button
                                                key={couleur.id}
                                                onClick={() => handleSelect(couleur.id, 'couleur_id', 'couleur', couleur.couleur)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisTextile.couleur_id === couleur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{couleur.couleur}</div>
                                                {couleur.prix > 0 && couleur.couleur !== 'autres' && (
                                                    <div className="text-xs text-green-600">+{couleur.prix.toLocaleString()} Ar</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input pour couleur "autres" */}
                                    {devisTextile.couleur === 'autres' && (
                                        <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                            <h5 className="font-semibold mb-3">Couleur personnalisée</h5>
                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <Input
                                                        type="text"
                                                        value={autreCouleur.nom}
                                                        onChange={(e) => setAutreCouleur(prev => ({ ...prev, nom: e.target.value }))}
                                                        placeholder="Nom de la couleur"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={autreCouleur.prix}
                                                        onChange={(e) => setAutreCouleur(prev => ({ ...prev, prix: e.target.value }))}
                                                        placeholder="Prix supplémentaire"
                                                        min="0"
                                                    />
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Quantité */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-3 flex items-center ">
                                        <Layers />
                                        <span className="ml-2"> Quantité </span>
                                    </h4>
                                    <Input 
                                        type="number" 
                                        value={devisTextile.quantite.toString()} 
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
                    devisTextile={devisTextile} 
                />
            </div>
        </Accordion>
    );
}