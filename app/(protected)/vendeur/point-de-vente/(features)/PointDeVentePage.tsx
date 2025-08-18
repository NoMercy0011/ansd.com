"use client"

import { Button, Input, StatCard, Textarea } from '@/sources/components/ui';
import Accordion from '@/sources/components/ui/accordion';
import { clientType, devisLivreData } from '@/sources/types/type';
import { AlertTriangle, Book, BrainCircuit, ChevronsLeftRightEllipsisIcon, FileClock, Layers, Loader2, PencilRuler, Search, ShoppingBasket, Tag, Truck, Wallet, Weight, Wrench } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import CatdSection from './CatdSection';
import { GetClientID } from '@/sources/actions/admin/client.action';
import { useLivre } from '@/hooks/useModerator';

type PointDeVenteProps = {
    
    param ?: string;
}

const cartItems = [{
    id: 0,
    designation : '',
    detailedDescription : '',
    quantite : '',
    prixUnitaire : '',
    remise : '',
}]

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

export default function PointDeVentePage( { param } : PointDeVenteProps) {
    const { livre, livreLoading } = useLivre();
    const stockItems = [
      { id: 101, name: "Stylo Bille Bleu", price: 1500, stock: 250, seuilAlerte: 50, type: "vente-directe" },
      { id: 102, name: "Cahier A5 96p", price: 5400, stock: 120, seuilAlerte: 30, type: "vente-directe" },
      { id: 103, name: "Ramette Papier A4", price: 16500, stock: 15, seuilAlerte: 20, type: "vente-directe" },
      { id: 104, name: "Carnet de notes", price: 6600, stock: 150, seuilAlerte: 40, type: "vente-directe" },
    ];

    const reliureType = [ "Plastique", "Métallique", "Piqure à cheval", "Dos carré collé" ]
    const [ papierSelected, setPapierSelected] = useState({
        categorie: '',
        accessoire: [{
        accessoire: '',
        id_papier: 0,
        prix: '',
        }],
    });

    const [ couvertureSelected, setCouvertureSelected] = useState({
        categorie: '',
        accessoire: [{
        accessoire: '',
        id_papier: 0,
        prix: '',
        }],
    });

        // ✨ NOUVEAU: Un état simple pour suivre le type de reliure sélectionné (ex: "Plastique")
    const [selectedReliureType, setSelectedReliureType] = useState<string>('');
    
    // ✨ NOUVEAU: Un état pour stocker les options de reliure valides après filtrage
    const [filteredReliures, setFilteredReliures] = useState<ReliureOption[]>([]);


    
    const [client, setClient] = useState<clientType>();
    const [devisLivre, setDevisLivre] = useState<devisLivreData>({
        client_id: 0, couleur_id: 0, couverture_id: 0, couverture: '', dimension_id: 0, finition_id: 0, livre_id: 0,
        montant: '', pages: '', papier_id: 0, papier: '', quantite: '', recto_verso_id: 0, reliure_id: 0, user_id: 0,
    });

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
        // Condition 1: S'assurer que les données et les sélections nécessaires existent
        if (!livre?.reliure || !selectedReliureType || !devisLivre.papier || !devisLivre.pages) {
            setFilteredReliures([]); // Vider les résultats si les infos sont incomplètes
            return;
        }

        const pageCount = Number(devisLivre.pages);
        // Condition 2: S'assurer que le nombre de pages est un chiffre valide
        if (isNaN(pageCount) || pageCount <= 0) {
            setFilteredReliures([]);
            return;
        }

        // --- Début du processus de filtrage en chaîne ---
        const results = livre.reliure
            // Étape 1: Filtrer par le TYPE de reliure sélectionné (ex: "Plastique")
            .filter(option => option.type === selectedReliureType)
            .map(option => {
                // Étape 2: Pour chaque option, filtrer ses sous-éléments (reliures)
                const validNestedReliures = option.reliures.filter(nested =>
                    // Condition A: Le PAPIER doit correspondre
                    nested.papier === devisLivre.papier &&
                    // Condition B: Le NOMBRE DE PAGES doit être dans la fourchette [min, max]
                    pageCount >= nested.min && pageCount <= nested.max
                );
                // Retourner l'option parente avec seulement ses enfants valides
                return { ...option, reliures: validNestedReliures };
            })
            // Étape 3: Éliminer les options dont la liste d'enfants est devenue vide
            .filter(option => option.reliures.length > 0);

        setFilteredReliures(results);

    }, [devisLivre.papier, devisLivre.pages, selectedReliureType, livre]); // Ce hook se redéclenche si l'une de ces valeurs change


    const commercialKpis = {
        proformasEnAttente: 0,
        facturesARecouvrer: 0,
        totalResteAPayer: 0.00,
    }
    const handleAddToCart = () => {

    };

    const   otherServices = {
    "Conception & Retouche": [
        { id: 201, name: "Livre/Magazine (Simple)", price: 5000, unit: "/page" },
        { id: 202, name: "Livre/Magazine (Complexe)", price: 10000, unit: "/page" },
    ],
    "Supports de Communication": [
        { id: 205, name: "Carte de Visite (Simple)", price: 30000 },
        { id: 206, name: "Carte de Visite (Complexe)", price: 50000 },
    ],
    "Identité Visuelle": [
        { id: 221, name: "Logo (Simple)", price: 100000 },
        { id: 222, name: "Logo (Complexe)", price: 600000 },
    ]
    };

    const handleSelect = (value : number | string , name : string, papier?: string) => {
        setDevisLivre(prevState => ({
            ...prevState,
            [name]: value,
            ...(papier !== undefined && { papier: papier }),
        }));
    };

    const handleChange = (/*e : React.ChangeEvent*/) => {

    }

      return (
          <div className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard title="Proformas en attente" value={commercialKpis.proformasEnAttente} icon={<FileClock size={24} className="text-white"/>} color={{bg: "bg-yellow-500"}} trend={{direction: 'up', value: '+2'}}/>
                  <StatCard title="Factures à recouvrer" value={commercialKpis.facturesARecouvrer} icon={<AlertTriangle size={24} className="text-white"/>} color={{bg:"bg-orange-500"}} />
                  <StatCard title="Total Reste à Payer" value={`${commercialKpis.totalResteAPayer.toLocaleString('fr-FR')} Ar`} icon={<Wallet size={24} className="text-white"/>} color={{bg: "bg-red-500"}} />
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-6"> 

                <Accordion title="Ajouter un article en stock (Vente Directe)" icon={<Tag />} defaultOpen={true} >
                    
                    <div className="relative mb-4"><Input type="text" placeholder="Rechercher un article en stock..."  onChange={handleChange} className="pl-10"/><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-60 overflow-y-auto pr-2">
                {stockItems.map(item => (
                    <button key={item.id} className="p-4 border dark:border-slate-700 rounded-lg text-center hover:border-red-500 dark:hover:border-red-500 hover:shadow-sm transition-all disabled:opacity-50 bg-white dark:bg-slate-800" disabled={item.stock <= 0}>
                        <span className="font-semibold block text-slate-800 dark:text-slate-200">{item.name}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400 block">{item.price.toLocaleString('fr-FR')} Ar</span>
                        <span className={`text-xs ${item.stock > item.seuilAlerte ? 'text-emerald-600' : 'text-red-600'}`}>Stock: {item.stock}</span>
                    </button>))}
                </div>
                </Accordion>

                <Accordion title="Ajouter un autre service" icon={<BrainCircuit/>} defaultOpen={true}>
                            {Object.entries(otherServices).map(([category, serviceList]) => (
                                <Accordion key={category} title={category} defaultOpen={false}>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {serviceList.map(service => (
                                            <button key={service.id} 
                                                //onClick={() => onAddToCart({ id: Date.now(), serviceId: service.id, designation: service.name, quantite: 1, prixUnitaire: service.price, remise: 0, typeDeVente: 'Service', detailedDescription: `Prestation de service - ${service.name}` })} 
                                                className="p-4 border dark:border-slate-700 rounded-lg text-center hover:border-red-500 dark:hover:border-red-500 hover:shadow-sm transition-all bg-white dark:bg-slate-800"><span className="font-semibold block text-slate-800 dark:text-slate-200">{service.name}</span><span className="text-sm text-slate-500 dark:text-slate-400 block">
                                                {service.price.toLocaleString('fr-FR')} Ar {"service?.unit"}
                                            </span>
                                        </button>))}
                                    </div>
                                </Accordion>
                            ))}
                </Accordion>

                <Accordion title="Ajouter un service de Livraison" icon={<Truck/>} defaultOpen={false}>
                    <div className="space-y-3">
                        <Input placeholder={`Nom du service (Livraison)`} /*onChange={e => handleChange('designation', e.target.value)}*/ />
                        <Textarea placeholder="Description détaillée..." /*onChange={e => handleChange('detailedDescription', e.target.value)}*/ />
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="number" placeholder="Quantité" /*onChange={e => handleChange('quantite', e.target.value)} />
                            <Input type="number" placeholder="Prix Unitaire HT (Ar)" value={"item.prixUnitaire"} /*onChange={e => handleChange('prixUnitaire', e.target.value)}*/ />
                        </div>
                        <Button variant="success" icon={<ShoppingBasket/>} onClick={handleAddToCart} className="w-full">
                            Ajouter au Panier
                        </Button>
                    </div>
                </Accordion>

                <Accordion title="Ajouter un article manuel personnalisé" icon={<PencilRuler/>} defaultOpen={false}>
                    <div className="space-y-3">
                        <Input placeholder={`Nom du service (Manuel)`}  /*onChange={e => handleChange('designation', e.target.value)}*/ />
                        <Textarea placeholder="Description détaillée..." /*onChange={e => handleChange('detailedDescription', e.target.value)}*/ />
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="number" placeholder="Quantité" /*onChange={e => handleChange('quantite', e.target.value)}*/ />
                            <Input type="number" placeholder="Prix Unitaire HT (Ar)"  /*onChange={e => handleChange('prixUnitaire', e.target.value)}*/ />
                        </div>
                        <Button variant="success" icon={<ShoppingBasket/>} onClick={handleAddToCart} className="w-full">Ajouter au Panier</Button>
                    </div>
                </Accordion>

                <Accordion title="Ajouter un article d'impression" icon={<Wrench />} defaultOpen={false}>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-1/2 space-y-4">
                            { livreLoading ? (<Loader2 className='animate-spin w-5 h-5 text-red-500'/>) : 
                            (<> 
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
                                                onClick={() => handleSelect(livre.id_livre, 'livre_id')}
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
                                                onClick={() => handleSelect(dimension.id_dimension, 'dimension_id')}
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
                                                onClick={() => handleSelect(couleur.id_couleur, 'couleur_id')}
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
                                                onClick={() => handleSelect(accessoire.id_papier, 'papier_id', accessoire.accessoire)}
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
                                <Input type="number" value={devisLivre.pages || ''} onChange={e => handleSelect(e.target.value, 'pages')} placeholder="Ex: 1000" />
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
                                                onClick={() => handleSelect(recto.id_recto, 'recto_verso_id')}
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
                                                onClick={() => handleSelect(accessoire.id_papier, 'couverture_id')}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${accessoire.id_papier === devisLivre.couverture_id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{accessoire.accessoire}</span>
                                            </button>
                                        </React.Fragment>
                                    )))}
                                    </div>
                                    </div>
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
                                    {reliureType.map(reliure => (
                                            <button
                                                key={reliure}
                                                // 💡 MODIFIÉ: Met simplement à jour l'état du type sélectionné
                                                onClick={() => setSelectedReliureType(reliure)}
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
                                                onClick={() => handleSelect(finition.id_finition, 'finition_id')}
                                                className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisLivre.finition_id === finition.id_finition ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}>
                                                <span>{finition.finition}</span>
                                            </button>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* quantité */}
                            <div>
                                <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2 mt-3 flex items-center">
                                    <Layers/>
                                    <span className="ml-2"> Quantités </span>
                                </h4>
                                <Input type="number" value={devisLivre.quantite || ''} onChange={e => handleSelect(Number(e.target.value), 'qualite')} placeholder="Ex: 1000" />
                            </div>
                            </>)}
                        </div>
                    </div>
                </Accordion>

            </div>
                <CatdSection cartItems={cartItems} client={client}/>
        </div>
    </div>
    );
}