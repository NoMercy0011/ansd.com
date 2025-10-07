import { GetClientID } from '@/sources/actions/admin/client.action'
import { Input } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { CartItemsType, clientType, devisChevaletData } from '@/sources/types/type'
import { Layers, Monitor } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import OptionOverview from '../OptionOverview/OptionOverview'

type PrintArticleProps = {
    userRole?: string;
    param?: string;
    handleAddCart: (cartItem: CartItemsType, devis?: devisChevaletData) => void;
}

type CustomSizeType = {
    longueur: number;
    largeur: number;
}

export default function Chevalet({ param, userRole, handleAddCart }: PrintArticleProps) {
    
    // Données mock complètes pour les chevalets basées sur le CSV
    const ChevaletData = {
        types: [
            { id: 1, type: 'chevalet_table', nom: 'Chevalet de table' },
            { id: 2, type: 'rollup_standard', nom: 'Roll up standard' },
            { id: 3, type: 'rollup_deluxe', nom: 'Roll up Deluxe' },
            { id: 4, type: 'xbanner', nom: 'X-banner' },
            { id: 5, type: 'stop_trottoir', nom: 'Stop trottoir' },
            { id: 6, type: 'porte_flyers', nom: 'Porte flyers' },
            { id: 7, type: 'porte_affiches', nom: 'Porte affiches' },
            { id: 8, type: 'oriflamme', nom: 'Oriflamme' }
        ],
        
        dimensions: {
            chevalet_table: [
                { id: 1, dimension: 'A3', unitee: '297x420mm', prix_base: 2500 },
                { id: 2, dimension: 'A4', unitee: '210x297mm', prix_base: 1800 },
                { id: 3, dimension: 'A5', unitee: '148x210mm', prix_base: 1500 },
                { id: 4, dimension: 'A6', unitee: '105x148mm', prix_base: 1200 },
                { id: 5, dimension: 'DL', unitee: '99x210mm', prix_base: 1000 },
                { id: 6, dimension: 'A7', unitee: '74x105mm', prix_base: 800 },
                { id: 7, dimension: 'autres', unitee: 'personnalisée', prix_base: 3000 }
            ],
            rollup_standard: [
                { id: 8, dimension: '80x200 cm', unitee: '800x2000mm', prix_base: 45000 },
                { id: 9, dimension: '85x200 cm', unitee: '850x2000mm', prix_base: 48000 }
            ],
            rollup_deluxe: [
                { id: 10, dimension: '85x200 cm', unitee: '850x2000mm', prix_base: 65000 }
            ],
            xbanner: [
                { id: 11, dimension: '60x160 cm', unitee: '600x1600mm', prix_base: 35000 },
                { id: 12, dimension: '80x180 cm', unitee: '800x1800mm', prix_base: 42000 }
            ],
            stop_trottoir: [
                { id: 13, dimension: '60x100 cm', unitee: '600x1000mm', prix_base: 28000 },
                { id: 14, dimension: 'autres', unitee: 'personnalisée', prix_base: 35000 }
            ],
            porte_flyers: [
                { id: 15, dimension: 'A4', unitee: '210x297mm', prix_base: 12000 },
                { id: 16, dimension: 'A5', unitee: '148x210mm', prix_base: 10000 },
                { id: 17, dimension: 'A6', unitee: '105x148mm', prix_base: 8000 },
                { id: 18, dimension: 'DL', unitee: '99x210mm', prix_base: 7500 },
                { id: 19, dimension: 'A7', unitee: '74x105mm', prix_base: 6000 },
                { id: 20, dimension: 'autres', unitee: 'personnalisée', prix_base: 15000 }
            ],
            porte_affiches: [
                { id: 21, dimension: 'A0', unitee: '841x1189mm', prix_base: 45000 },
                { id: 22, dimension: 'A1', unitee: '594x841mm', prix_base: 35000 },
                { id: 23, dimension: 'A2', unitee: '420x594mm', prix_base: 25000 },
                { id: 24, dimension: 'A3', unitee: '297x420mm', prix_base: 18000 },
                { id: 25, dimension: 'A4', unitee: '210x297mm', prix_base: 12000 },
                { id: 26, dimension: 'A5', unitee: '148x210mm', prix_base: 10000 },
                { id: 27, dimension: 'A6', unitee: '105x148mm', prix_base: 8000 },
                { id: 28, dimension: 'DL', unitee: '99x210mm', prix_base: 7500 },
                { id: 29, dimension: 'A7', unitee: '74x105mm', prix_base: 6000 },
                { id: 30, dimension: 'autres', unitee: 'personnalisée', prix_base: 50000 }
            ],
            oriflamme: [
                { id: 31, dimension: '2m70', unitee: '2700mm', prix_base: 75000 },
                { id: 32, dimension: '3m40', unitee: '3400mm', prix_base: 85000 },
                { id: 33, dimension: '4m', unitee: '4000mm', prix_base: 95000 },
                { id: 34, dimension: '4m50', unitee: '4500mm', prix_base: 105000 },
                { id: 35, dimension: '5m', unitee: '5000mm', prix_base: 115000 },
                { id: 36, dimension: '5m50', unitee: '5500mm', prix_base: 125000 }
            ]
        },

        supports: {
            chevalet_table: [
                { id: 1, support: 'Socle rigide', type: 'socle', prix: 500 },
                { id: 2, support: 'PCB', type: 'papier', prix: 200 },
                { id: 3, support: 'PCB pelliculé', type: 'papier', prix: 300 },
                { id: 4, support: 'Glossy', type: 'papier', prix: 400 },
                { id: 5, support: 'autres', type: 'autre', prix: 600 }
            ],
            rollup_standard: [
                { id: 6, support: 'Bâche', type: 'materiau', prix: 8000 },
                { id: 7, support: 'autres', type: 'autre', prix: 10000 }
            ],
            rollup_deluxe: [
                { id: 8, support: 'Bâche', type: 'materiau', prix: 12000 },
                { id: 9, support: 'autres', type: 'autre', prix: 15000 }
            ],
            xbanner: [
                { id: 10, support: 'Bâche', type: 'materiau', prix: 6000 },
                { id: 11, support: 'autres', type: 'autre', prix: 8000 }
            ],
            stop_trottoir: [
                { id: 12, support: 'local', type: 'origine', prix: 5000 },
                { id: 13, support: 'importé', type: 'origine', prix: 8000 }
            ],
            porte_flyers: [
                { id: 14, support: 'Plexi', type: 'materiau', prix: 3000 },
                { id: 15, support: 'autres', type: 'autre', prix: 4000 }
            ],
            porte_affiches: [
                { id: 16, support: 'Plexi', type: 'materiau', prix: 5000 },
                { id: 17, support: 'autres', type: 'autre', prix: 7000 }
            ],
            oriflamme: [
                { id: 18, support: 'type 1', type: 'type', prix: 15000 },
                { id: 19, support: 'type 2', type: 'type', prix: 20000 },
                { id: 20, support: 'type 3', type: 'type', prix: 25000 }
            ]
        },

        papiers: {
            chevalet_table: [
                { id: 1, type: 'PCB', grammage: '170G', prix: 100 },
                { id: 2, type: 'PCB', grammage: '250G', prix: 150 },
                { id: 3, type: 'PCB', grammage: '300G', prix: 200 },
                { id: 4, type: 'PCB', grammage: '350G', prix: 250 },
                { id: 5, type: 'PCB', grammage: '600G', prix: 400 },
                { id: 6, type: 'PCB', grammage: '700G', prix: 500 },
                { id: 7, type: 'PCB pelliculé', grammage: '170G', prix: 200 },
                { id: 8, type: 'PCB pelliculé', grammage: '250G', prix: 250 },
                { id: 9, type: 'PCB pelliculé', grammage: '300G', prix: 300 },
                { id: 10, type: 'PCB pelliculé', grammage: '350G', prix: 350 },
                { id: 11, type: 'PCB pelliculé', grammage: '600G', prix: 500 },
                { id: 12, type: 'Glossy', grammage: '250G', prix: 300 },
                { id: 13, type: 'Glossy', grammage: '300G', prix: 400 },
                { id: 14, type: 'autres', grammage: 'personnalisé', prix: 600 }
            ]
        },

        orientations: {
            chevalet_table: [
                { id: 1, orientation: 'paysage', prix: 0 },
                { id: 2, orientation: 'portrait', prix: 0 }
            ],
            porte_flyers: [
                { id: 3, orientation: 'paysage', prix: 0 },
                { id: 4, orientation: 'portrait', prix: 0 }
            ],
            porte_affiches: [
                { id: 5, orientation: 'paysage', prix: 0 },
                { id: 6, orientation: 'portrait', prix: 0 }
            ]
        },

        faces: {
            rollup_standard: [
                { id: 1, face: 'Recto', prix: 0 },
                { id: 2, face: 'Recto verso', prix: 8000 }
            ],
            rollup_deluxe: [
                { id: 3, face: 'Recto', prix: 0 },
                { id: 4, face: 'Recto verso', prix: 10000 }
            ],
            stop_trottoir: [
                { id: 5, face: 'Recto', prix: 0 },
                { id: 6, face: 'Recto verso', prix: 5000 }
            ]
        },

        formes_couture: {
            oriflamme: [
                { id: 1, forme: 'goutte', prix: 5000 },
                { id: 2, forme: 'rectangle', prix: 3000 },
                { id: 3, forme: 'plume', prix: 6000 },
                { id: 4, forme: 'knife', prix: 7000 }
            ]
        },

        particularites: {
            chevalet_table: [
                { id: 1, particularite: 'Support renforcé', prix: 800 },
                { id: 2, particularite: 'Base antidérapante', prix: 500 },
                { id: 3, particularite: 'Design personnalisé', prix: 1500 },
                { id: 4, particularite: 'autres', prix: 1000 }
            ],
            porte_flyers: [
                { id: 5, particularite: 'Support mural', prix: 2000 },
                { id: 6, particularite: 'Support de comptoir', prix: 1500 },
                { id: 7, particularite: 'Design personnalisé', prix: 3000 },
                { id: 8, particularite: 'autres', prix: 2000 }
            ],
            porte_affiches: [
                { id: 9, particularite: 'Support mural', prix: 3000 },
                { id: 10, particularite: 'Support sur pied', prix: 8000 },
                { id: 11, particularite: 'Design personnalisé', prix: 5000 },
                { id: 12, particularite: 'autres', prix: 3000 }
            ],
            oriflamme: [
                { id: 13, particularite: 'Renforts supplémentaires', prix: 10000 },
                { id: 14, particularite: 'Système d\'accroche premium', prix: 15000 },
                { id: 15, particularite: 'Impression recto-verso', prix: 20000 },
                { id: 16, particularite: 'autres', prix: 12000 }
            ]
        }
    };

    const [client, setClient] = useState<clientType>();
    const [selectedChevaletType, setSelectedChevaletType] = useState<string>('');
    const [selectedSupport, setSelectedSupport] = useState<string>('');
    const [prixUnitaireReel, setPrixUnitaireReel] = useState<number>(0.00);
    const [prixTotalReel, setPrixTotalReel] = useState<number>(0.00);
    const [customSize, setCustomSize] = useState<CustomSizeType>({
        longueur: 0,
        largeur: 0,
    });

    // États pour les options "autres"
    const [autreSupport, setAutreSupport] = useState({ nom: '', prix: '' });
    const [autrePapier, setAutrePapier] = useState({ nom: '', prix: '' });
    const [autreParticularite, setAutreParticularite] = useState({ nom: '', prix: '' });

    const [devisChevalet, setDevisChevalet] = useState<devisChevaletData>({
        client_id: 0,
        type: '',
        dimension_id: 0,
        dimension: '',
        support_id: 0,
        support: '',
        papier_id: 0,
        papier: '',
        orientation_id: 0,
        orientation: '',
        face_id: 0,
        face: '',
        forme_couture_id: 0,
        forme_couture: '',
        particularite_id: 0,
        particularite: '',
        chevalet_id: 0,
        montant: '',
        quantite: 1,
        optionPrix: ''
    });

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisChevalet(prevState => ({
            ...prevState,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

    // Fonctions pour obtenir les données dynamiques
    const getCurrentDimensions = () => {
        if (!selectedChevaletType) return [];
        return ChevaletData.dimensions[selectedChevaletType as keyof typeof ChevaletData.dimensions] || [];
    };

    const getCurrentSupports = () => {
        if (!selectedChevaletType) return [];
        return ChevaletData.supports[selectedChevaletType as keyof typeof ChevaletData.supports] || [];
    };

    const getCurrentPapiers = () => {
        if (!selectedChevaletType) return [];
        
        // Filtrer les papiers selon le support sélectionné
        const supports = getCurrentSupports();
        const selectedSupportObj = supports.find(s => s.id === devisChevalet.support_id);
        
        if (!selectedSupportObj) return ChevaletData.papiers[selectedChevaletType as keyof typeof ChevaletData.papiers] || [];
        
        // Si le support est de type "papier", filtrer les papiers correspondants
        if (selectedSupportObj.type === 'papier') {
            return ChevaletData.papiers.chevalet_table.filter(papier => 
                papier.type.toLowerCase().includes(selectedSupportObj.support.toLowerCase())
            );
        }
        
        return ChevaletData.papiers[selectedChevaletType as keyof typeof ChevaletData.papiers] || [];
    };

    const getCurrentOrientations = () => {
        if (!selectedChevaletType) return [];
        return ChevaletData.orientations[selectedChevaletType as keyof typeof ChevaletData.orientations] || [];
    };

    const getCurrentFaces = () => {
        if (!selectedChevaletType) return [];
        return ChevaletData.faces[selectedChevaletType as keyof typeof ChevaletData.faces] || [];
    };

    const getCurrentFormesCouture = () => {
        if (!selectedChevaletType) return [];
        return ChevaletData.formes_couture[selectedChevaletType as keyof typeof ChevaletData.formes_couture] || [];
    };

    const getCurrentParticularites = () => {
        if (!selectedChevaletType) return [];
        return ChevaletData.particularites[selectedChevaletType as keyof typeof ChevaletData.particularites] || [];
    };

    // Fonction utilitaire pour convertir en nombre sécurisé
    const safeNumber = (value: string): number => {
        const num = Number(value);
        return isNaN(num) ? 0 : num;
    };

    // Gestion de la sélection du support
    const handleSupportSelect = (supportId: number, supportName: string) => {
        setSelectedSupport(supportName);
        handleSelect(supportId, 'support_id', 'support', supportName);
        
        // Réinitialiser la sélection de papier si le support change
        if (supportName !== 'autres') {
            setDevisChevalet(prev => ({ ...prev, papier_id: 0, papier: '' }));
            setAutrePapier({ nom: '', prix: '' });
        }
    };

    // Gestion de la sélection de particularité
    const handleParticulariteSelect = (particulariteId: number, particulariteName: string) => {
        handleSelect(particulariteId, 'particularite_id', 'particularite', particulariteName);
    };

    // Calcul du prix
    useEffect(() => {
        if (!selectedChevaletType) {
            setPrixUnitaireReel(0);
            setPrixTotalReel(0);
            return;
        }

        let prixTotal = 0;

        // Prix de base selon la dimension
        const dimension = getCurrentDimensions().find(d => d.id === devisChevalet.dimension_id);
        if (dimension) {
            prixTotal += safeNumber(dimension.prix_base.toString());
        }

        // Prix du support
        const support = getCurrentSupports().find(s => s.id === devisChevalet.support_id);
        if (support) {
            if (support.support === 'autres') {
                prixTotal += safeNumber(autreSupport.prix);
            } else {
                prixTotal += safeNumber(support.prix.toString());
            }
        }

        // Prix du papier (uniquement pour chevalet de table)
        const papier = getCurrentPapiers().find(p => p.id === devisChevalet.papier_id);
        if (papier) {
            if (papier.type === 'autres') {
                prixTotal += safeNumber(autrePapier.prix);
            } else {
                prixTotal += safeNumber(papier.prix.toString());
            }
        }

        // Prix de la face (recto-verso)
        const face = getCurrentFaces().find(f => f.id === devisChevalet.face_id);
        if (face) {
            prixTotal += safeNumber(face.prix.toString());
        }

        // Prix de la forme de couture (oriflamme)
        const formeCouture = getCurrentFormesCouture().find(f => f.id === devisChevalet.forme_couture_id);
        if (formeCouture) {
            prixTotal += safeNumber(formeCouture.prix.toString());
        }

        // Prix des particularités
        const particularite = getCurrentParticularites().find(p => p.id === devisChevalet.particularite_id);
        if (particularite) {
            if (particularite.particularite === 'autres') {
                prixTotal += safeNumber(autreParticularite.prix);
            } else {
                prixTotal += safeNumber(particularite.prix.toString());
            }
        }

        // Ajouter les options personnalisées
        prixTotal += safeNumber(String(devisChevalet.optionPrix!));

        // Calcul du total avec quantité
        const quantite = safeNumber(devisChevalet.quantite.toString());
        const prixUnitaire = Math.max(0, prixTotal);
        const prixTotalAvecQuantite = prixUnitaire * quantite;

        setPrixUnitaireReel(prixUnitaire);
        setPrixTotalReel(prixTotalAvecQuantite);

    }, [devisChevalet, selectedChevaletType, autreSupport, autrePapier, autreParticularite]);

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                    setDevisChevalet(prev => ({ ...prev, client_id: Number(clientData?.id_client) }));
                });
        }
    }, [param]);

    // Fonction complète de réinitialisation
// const resetSpecificAttributes = (chevaletType: string) => {
//     setDevisChevalet(prev => {
//         const newState = { ...prev };
        
//         // Toujours réinitialiser le support (car il change selon le type)
//         newState.support_id = 0;
//         newState.support = '';
//         setAutreSupport({ nom: '', prix: '' });
        
//         // Réinitialiser le papier si non disponible pour ce type
//         if (!ChevaletData.papiers[chevaletType as keyof typeof ChevaletData.papiers]?.length) {
//             newState.papier_id = 0;
//             newState.papier = '';
//             setAutrePapier({ nom: '', prix: '' });
//         }
        
//         // Réinitialiser l'orientation si non disponible
//         if (!ChevaletData.orientations[chevaletType as keyof typeof ChevaletData.orientations]?.length) {
//             newState.orientation_id = 0;
//             newState.orientation = '';
//         }
        
//         // Réinitialiser la face si non disponible
//         if (!ChevaletData.faces[chevaletType as keyof typeof ChevaletData.faces]?.length) {
//             newState.face_id = 0;
//             newState.face = '';
//         }
        
//         // Réinitialiser la forme de couture si non disponible
//         if (!ChevaletData.formes_couture[chevaletType as keyof typeof ChevaletData.formes_couture]?.length) {
//             newState.forme_couture_id = 0;
//             newState.forme_couture = '';
//         }
        
//         // Réinitialiser les particularités si non disponible
//         if (!ChevaletData.particularites[chevaletType as keyof typeof ChevaletData.particularites]?.length) {
//             newState.particularite_id = 0;
//             newState.particularite = '';
//             setAutreParticularite({ nom: '', prix: '' });
//         }
        
//         return newState;
//     });
// };

// Et dans la fonction d'initialisation complète
const initializeDevisChevalet = () => {
    setDevisChevalet({
        client_id: Number(client?.id_client),
        type: '',
        dimension_id: 0,
        dimension: '',
        support_id: 0,
        support: '',
        papier_id: 0,
        papier: '',
        orientation_id: 0,
        orientation: '',
        face_id: 0,
        face: '',
        forme_couture_id: 0,
        forme_couture: '',
        particularite_id: 0,
        particularite: '',
        chevalet_id: 0,
        montant: '',
        quantite: 1,
        optionPrix: ''
    });
    setSelectedChevaletType('');
    setSelectedSupport('');
    setCustomSize({ longueur: 0, largeur: 0 });
    setAutreSupport({ nom: '', prix: '' });
    setAutrePapier({ nom: '', prix: '' });
    setAutreParticularite({ nom: '', prix: '' });
};

    const resetSpecificAttributes = (chevaletType: string) => {
        console.log(chevaletType);
    setDevisChevalet(prev => {
        const newState = { ...prev };
        
            newState.support_id = 0;
            newState.support = '';
            setAutreSupport({ nom: '', prix: '' });

        // Réinitialiser les attributs qui ne sont pas disponibles pour ce type
        if (!getCurrentPapiers().length) {
            newState.papier_id = 0;
            newState.papier = '';
            setAutrePapier({ nom: '', prix: '' });
        }
        
        if (!getCurrentOrientations().length) {
            newState.orientation_id = 0;
            newState.orientation = '';
        }
        
        if (!getCurrentFaces().length) {
            newState.face_id = 0;
            newState.face = '';
        }
        
        if (!getCurrentFormesCouture().length) {
            newState.forme_couture_id = 0;
            newState.forme_couture = '';
        }
        
        if (!getCurrentParticularites().length) {
            newState.particularite_id = 0;
            newState.particularite = '';
            setAutreParticularite({ nom: '', prix: '' });
        }
        
        return newState;
    });
};

    // Utilisation dans la sélection du type de produit
    const handleTypeSelect = (typeId: number, typeName: string) => {
    handleSelect(typeId, 'chevalet_id', 'type', typeName);
    setSelectedChevaletType(typeName);
    setSelectedSupport('');
    
    // Réinitialiser les attributs spécifiques
    resetSpecificAttributes(typeName);
        };

    const handleAddToCart = () => {
        const chevaletType = ChevaletData.types.find(t => t.id === devisChevalet.chevalet_id);
        
        // Préparer les noms des options "autres"
        const supportName = devisChevalet.support === 'autres' ? autreSupport.nom : devisChevalet.support;
        const papierName = devisChevalet.papier === 'autres' ? autrePapier.nom : devisChevalet.papier;
        const particulariteName = devisChevalet.particularite === 'autres' ? autreParticularite.nom : devisChevalet.particularite;
        
        const detailsDevis = `
                Type: ${chevaletType?.nom}
                Dimension: ${devisChevalet.dimension || 'Non spécifié'}
                Support: ${supportName || 'Non spécifié'}
                Papier: ${papierName || 'Non spécifié'}
                Orientation: ${devisChevalet.orientation || 'Non spécifié'}
                Face: ${devisChevalet.face || 'Non spécifié'}
                Forme couture: ${devisChevalet.forme_couture || 'Non spécifié'}
                Particularité: ${particulariteName || 'Aucune'}`;

        const chevaletItem: CartItemsType = {
            id: Date.now(),
            designation: `Chevalet & Stand - ${chevaletType?.nom}`,
            detail_description: detailsDevis,
            prix_unitaire_ht: prixUnitaireReel,
            quantite: safeNumber(String(devisChevalet.quantite!)),
            remise: 0.00,
            service: 'Chevalet & Stand',
        };
        
        setDevisChevalet(prev => ({ ...prev, montant: String(prixTotalReel) }));
        handleAddCart(chevaletItem, devisChevalet);
        initializeDevisChevalet();
    };

    const handleCustomSizeChange = (field: "longueur" | "largeur", value: string) => {
        const numValue = safeNumber(value);
        setCustomSize(prev => ({ ...prev, [field]: numValue }));
    };

    return (
        <Accordion title="Chevalets & Stand (PLV)" icon={<Monitor />} defaultOpen={false}>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    <div className='max-h-[80vh] overflow-y-auto pr-4 space-y-4'>
                        
                        {/* Type de Chevalet */}
                        <div>
                            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                <Layers />
                                <span className="ml-2"> Type de Produit </span>
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {ChevaletData.types.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => handleTypeSelect(type.id, type.type)}
                                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.chevalet_id === type.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                    >
                                        <span>{type.nom}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedChevaletType && (
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
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{dimension.dimension}</div>
                                                <div className="text-xs text-slate-500">{dimension.unitee}</div>
                                                <div className="text-xs font-semibold text-green-600">{dimension.prix_base.toLocaleString()} Ar</div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Dimension personnalisée */}
                                    {devisChevalet.dimension === 'autres' && (
                                        <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                            <h5 className="font-semibold mb-3">Dimensions personnalisées</h5>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={customSize.longueur.toString() }
                                                        onChange={(e) => handleCustomSizeChange('longueur', e.target.value)}
                                                        placeholder="Longueur"
                                                        min="1"
                                                    />
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">mm</span>
                                                </div>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={customSize.largeur.toString() }
                                                        onChange={(e) => handleCustomSizeChange('largeur', e.target.value)}
                                                        placeholder="Largeur"
                                                        min="1"
                                                    />
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">mm</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Support/Matériau */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Type de Support/Matériau </span>
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {getCurrentSupports().map(support => (
                                            <button
                                                key={support.id}
                                                onClick={() => handleSupportSelect(support.id, support.support)}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.support_id === support.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                            >
                                                <div className="font-semibold">{support.support}</div>
                                                {support.prix > 0 && support.support !== 'autres' && (
                                                    <div className="text-xs text-green-600">+{support.prix.toLocaleString()} Ar</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Input pour support "autres" */}
                                    {devisChevalet.support === 'autres' && (
                                        <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                            <h5 className="font-semibold mb-3">Support personnalisé</h5>
                                            <div className="space-y-3">
                                                {/* <div className="relative">
                                                    <Input
                                                        type="text"
                                                        value={autreSupport.nom}
                                                        onChange={(e) => setAutreSupport(prev => ({ ...prev, nom: e.target.value }))}
                                                        placeholder="Nom du support personnalisé"
                                                    />
                                                </div> */}
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

                                {/* Papier (uniquement pour chevalet de table) */}
                                {getCurrentPapiers().length > 0 && selectedSupport && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Type de Papier - {selectedSupport} </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentPapiers().map(papier => (
                                                <button
                                                    key={papier.id}
                                                    onClick={() => handleSelect(papier.id, 'papier_id', 'papier', `${papier.type} ${papier.grammage}`)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.papier_id === papier.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{papier.type}</div>
                                                    <div className="text-xs text-slate-500">{papier.grammage}</div>
                                                    {papier.type !== 'autres' && (
                                                        <div className="text-xs text-green-600">+{papier.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Input pour papier "autres" */}
                                        {devisChevalet.papier === 'autres' && (
                                            <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <h5 className="font-semibold mb-3">Papier personnalisé</h5>
                                                <div className="space-y-3">
                                                    {/* <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={autrePapier.nom}
                                                            onChange={(e) => setAutrePapier(prev => ({ ...prev, nom: e.target.value }))}
                                                            placeholder="Nom du papier personnalisé"
                                                        />
                                                    </div> */}
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            value={autrePapier.prix}
                                                            onChange={(e) => setAutrePapier(prev => ({ ...prev, prix: e.target.value }))}
                                                            placeholder="Prix du papier"
                                                            min="0"
                                                        />
                                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Orientation */}
                                {getCurrentOrientations().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Orientation </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentOrientations().map(orientation => (
                                                <button
                                                    key={orientation.id}
                                                    onClick={() => handleSelect(orientation.id, 'orientation_id', 'orientation', orientation.orientation)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.orientation_id === orientation.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <span>{orientation.orientation}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Face */}
                                {getCurrentFaces().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Face d&aposimpression </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentFaces().map(face => (
                                                <button
                                                    key={face.id}
                                                    onClick={() => handleSelect(face.id, 'face_id', 'face', face.face)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.face_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{face.face}</div>
                                                    {face.prix > 0 && (
                                                        <div className="text-xs text-green-600">+{face.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Forme de couture (oriflamme) */}
                                {getCurrentFormesCouture().length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                            <Layers />
                                            <span className="ml-2"> Forme de couture </span>
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {getCurrentFormesCouture().map(forme => (
                                                <button
                                                    key={forme.id}
                                                    onClick={() => handleSelect(forme.id, 'forme_couture_id', 'forme_couture', forme.forme)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.forme_couture_id === forme.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{forme.forme}</div>
                                                    <div className="text-xs text-green-600">+{forme.prix.toLocaleString()} Ar</div>
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
                                            {getCurrentParticularites().map(particularite => (
                                                <button
                                                    key={particularite.id}
                                                    onClick={() => handleParticulariteSelect(particularite.id, particularite.particularite)}
                                                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisChevalet.particularite_id === particularite.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                                                >
                                                    <div className="font-semibold">{particularite.particularite}</div>
                                                    {particularite.prix > 0 && particularite.particularite !== 'autres' && (
                                                        <div className="text-xs text-green-600">+{particularite.prix.toLocaleString()} Ar</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Input pour particularité "autres" */}
                                        {devisChevalet.particularite === 'autres' && (
                                            <div className="mt-4 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                                                <h5 className="font-semibold mb-3">Particularité personnalisée</h5>
                                                <div className="space-y-3">
                                                    {/* <div className="relative">
                                                        <Input
                                                            type="text"
                                                            value={autreParticularite.nom}
                                                            onChange={(e) => setAutreParticularite(prev => ({ ...prev, nom: e.target.value }))}
                                                            placeholder="Nom de la particularité"
                                                        />
                                                    </div> */}
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            value={autreParticularite.prix}
                                                            onChange={(e) => setAutreParticularite(prev => ({ ...prev, prix: e.target.value }))}
                                                            placeholder="Prix de la particularité"
                                                            min="0"
                                                        />
                                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Options personnalisées */}
                                {/* <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                        <Layers />
                                        <span className="ml-2"> Options supplémentaires </span>
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={devisChevalet.finitionPrix.toString()}
                                                onChange={(e) => handleSelect(safeNumber(e.target.value), 'finitionPrix')}
                                                placeholder="Prix finition supplémentaire"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                value={devisChevalet.optionPrix}
                                                onChange={(e) => handleSelect(safeNumber(e.target.value), 'optionPrix')}
                                                placeholder="Prix option supplémentaire"
                                                min="0"
                                            />
                                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">Ar</span>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Quantité */}
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 mt-3 mb-3 flex items-center ">
                                        <Layers />
                                        <span className="ml-2"> Quantité </span>
                                    </h4>
                                    <Input 
                                        type="number" 
                                        value={devisChevalet.quantite.toString()} 
                                        onChange={e => handleSelect(Math.max(1, safeNumber(e.target.value)), 'quantite')} 
                                        placeholder="Ex: 1" 
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
                    devisChevalet={devisChevalet} 
                />
            </div>
        </Accordion>
    );
}