import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemType } from '@/types/itemType';
import { devisData } from '@/types/type';
import { Book, Layers, Weight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

type BoiteProps = {
    boite: itemType,
    userRole: string;
    getDevis: (devis : devisData) => void;
    getPrix: (prixTotalReel : number, prixUnitaireReel: number) => void; 
    activeSection: string;
}

export default function Boite( { boite, activeSection, getDevis, getPrix } : BoiteProps) {
const [prix, setPrix] = useState({
            prixTotal: 0,
            prixUnitaire: 0 ,
        })
    //const [activeTab, setActiveTab] = useState('type');
    //const [ratioState, setRatioState] = useState(1);

    const [autreMateriau, setAutreMateriau] = useState({
      nom: "",
      prix: 0,
    })
    const [autreDecoupe, setAutreDecoupe] = useState({
      nom: "",
      prix: 0,
    })
    const [autreEmplacement, setAutreEmplacement] = useState({
      nom: "",
      prix: 0,
    })
    /*const [autreFinition, setAutreFinition] = useState({
      nom: "",
      prix: 0,
    })*/

    const categories = [
      { id: 1, categorie: "PCB" },
      { id: 2, categorie: "PCB Pélliculé" },
      { id: 3, categorie: "autres" },
    ]

    const [devisEncours, setDevisEncours] = useState<devisData>({
            client_id: 0,
            type: boite.type,
            couleur_id: 0,
            couleur: '',
            materiau_id: 0,
            materiau: '',
            dimension_id: 0,
            dimension: '',
            finition_id: 0,
            packaging_id: 0,
            montant: '',
            quantite: 1,
            recto_verso_id: 0,
            recto: '',
            option_id: '',
            imprimante_id: 0,
            imprimante: '',
            finition: 'invalide',
            option: '',
            optionPrix: '',
            finitionPrix: 0,
            decoupe: 'invalide',
            particularite: '',
            emplacement: '',
            categorie_id: 0,
            categorie: ''
        });

    // --- Refs pour le Scroll ---
    const dimensionRef = useRef<HTMLDivElement>(null);
    const materiauRef = useRef<HTMLDivElement>(null);
    const couleurRef = useRef<HTMLDivElement>(null);
    const faceRef = useRef<HTMLDivElement>(null);
    const imprimanteRef = useRef<HTMLDivElement>(null);
    const decoupeRef = useRef<HTMLDivElement>(null);
    const emplacementRef = useRef<HTMLDivElement>(null);
    const particulariteRef = useRef<HTMLDivElement>(null);
    const quantiteRef = useRef<HTMLDivElement>(null);

    // --- Gestion du Scroll automatique ---
    useEffect(() => {
        const sections: { [key: string]: React.RefObject<HTMLDivElement | null> } = {
            'dimension': dimensionRef,
            'materiau': materiauRef,
            'couleur': couleurRef,
            'face': faceRef,
            'imprimante': imprimanteRef,
            'decoupe': decoupeRef,
            'emplacement': emplacementRef,
            'particularite': particulariteRef,
            'quantite': quantiteRef,
        };

        if (activeSection && sections[activeSection]?.current) {
            sections[activeSection].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeSection]);

    useEffect( () => {
        getDevis(devisEncours);
        getPrix(prix.prixTotal, prix.prixUnitaire);
    }, [devisEncours, prix.prixTotal, prix.prixUnitaire]);

    useEffect(() => {
    // --- Logique de Calcul du Prix pour Boite ---
    
    // Vérification des sélections obligatoires
    /*if (!devisEncours.dimension_id || 
        !devisEncours.categorie_id ||
        !devisEncours.materiau_id || 
        !devisEncours.couleur_id || 
        !devisEncours.recto_verso_id ||
        !devisEncours.imprimante_id ||
        !devisEncours.emplacement) {
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
        return;
    }*/

    let prixUnitaire = 0;
    
    // 1. Prix de base selon la dimension
    if (devisEncours.dimension === 'devis manuel') {
        // Dimension personnalisée
        prixUnitaire += autreDecoupe.prix;
    } 
    /*else {
        const dimensionSelectionnee = boite.dimensions.find(
            d => d.id === devisEncours.dimension_id
        );
        if (dimensionSelectionnee) {
            prixUnitaire += dimensionSelectionnee.prix;
        }
    }*/

    // 2. Prix du matériau (catégorie + grammage)
    if (devisEncours.categorie === 'autres') {
        // Matériau personnalisé
        prixUnitaire += autreMateriau.prix;
    } else {
        // Prix du grammage sélectionné
        const materiauSelectionne = boite.matieres!.find(
            m => m.id === devisEncours.materiau_id
        );
        if (materiauSelectionne) {
            prixUnitaire += Number(materiauSelectionne.prix_unitaire);
        }
        
        // Supplément selon la catégorie (PCB, PCB Pelliculé)
        const categorieSelectionnee = categories.find(
            c => c.id === devisEncours.categorie_id
        );
        if (categorieSelectionnee) {
            // Appliquer un coefficient selon la catégorie
            if (devisEncours.categorie === 'PCB Pélliculé') {
                prixUnitaire += 600; // +600 Ar de supplément pour pelliculé
            }
        }
    }

    // 3. Prix de la couleur
    /*const couleurSelectionnee = boite.couleurs.find(
        c => c.id === devisEncours.couleur_id
    );
    if (couleurSelectionnee) {
        prixUnitaire += couleurSelectionnee.prix;
    }*/

    // 4. Prix de la face (recto/verso)
    /*const faceSelectionnee = boite.faces.find(
        f => f.id === devisEncours.recto_verso_id
    );
    if (faceSelectionnee) {
        prixUnitaire += faceSelectionnee.prix;
    }*/

    // 5. Prix de l'imprimante/technologie
    /*const imprimanteSelectionnee = boite.imprimantes.find(
        i => i.id === devisEncours.imprimante_id
    );
    if (imprimanteSelectionnee) {
        prixUnitaire += imprimanteSelectionnee.prix;
    }*/

    // 6. Prix de la découpe (si applicable)
    if (devisEncours.decoupe && boite.decoupes!.length > 0) {
        if (devisEncours.decoupe === 'autres') {
            prixUnitaire += autreDecoupe.prix;
        } 
        /*else {
            const decoupeSelectionnee = boite.decoupes.find(
                d => d.decoupe === devisEncours.decoupe
            );
            if (decoupeSelectionnee) {
                prixUnitaire += decoupeSelectionnee.prix;
            }
        }*/
    }

    // 7. Prix de l'emplacement
    if (devisEncours.emplacement === 'autres') {
        prixUnitaire += autreEmplacement.prix;
    } 
    /*else {
        const emplacementSelectionne = boite.emplacements.find(
            e => e.emplacement === devisEncours.emplacement
        );
        if (emplacementSelectionne) {
            prixUnitaire += emplacementSelectionne.prix;
        }
    }*/

    // 8. Prix de la particularité (si sélectionnée)
    /*if (devisEncours.particularite && devisEncours.particularite !== 'invalide') {
        const particulariteSelectionnee = boite.particularites.find(
            p => p.particularite === devisEncours.particularite
        );
        if (particulariteSelectionnee) {
            prixUnitaire += particulariteSelectionnee.prix;
        }
    }*/

    // 9. Application des paliers de quantité
    const quantite = devisEncours.quantite || 1;
    let coefficientQuantite = 1;
    
    if (quantite >= 10000) {
        coefficientQuantite = 0.70; // 30% de réduction
    } else if (quantite >= 5000) {
        coefficientQuantite = 0.75; // 25% de réduction
    } else if (quantite >= 2000) {
        coefficientQuantite = 0.80; // 20% de réduction
    } else if (quantite >= 1000) {
        coefficientQuantite = 0.85; // 15% de réduction
    } else if (quantite >= 500) {
        coefficientQuantite = 0.90; // 10% de réduction
    } else if (quantite >= 200) {
        coefficientQuantite = 0.95; // 5% de réduction
    }

    const prixUnitaireFinal = prixUnitaire * coefficientQuantite;
    const prixTotalFinal = prixUnitaireFinal * quantite;

    // Mise à jour de l'état
    setPrix({
        prixUnitaire: Math.round(prixUnitaireFinal),
        prixTotal: Math.round(prixTotalFinal)
    });

}, [
    devisEncours.dimension_id,
    devisEncours.dimension,
    devisEncours.categorie_id,
    devisEncours.categorie,
    devisEncours.materiau_id,
    devisEncours.couleur_id,
    devisEncours.recto_verso_id,
    devisEncours.imprimante_id,
    devisEncours.decoupe,
    devisEncours.emplacement,
    devisEncours.particularite,
    devisEncours.quantite,
    autreMateriau.prix,
    autreDecoupe.prix,
    autreEmplacement.prix,
]);
    

    const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
        setDevisEncours(prevState => ({
            ...prevState,
            type: boite.type,
            [name]: value,
            ...(option !== undefined && { [option]: optionValue }),
        }));
    };

  return (
    <div>
    <div className="flex flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-full space-y-1">
    {/* Section Dimension */}
    <div className='flex mb-4'>
         <div ref={dimensionRef} className="w-full lg:w-1/2 scroll-mt-20">
             <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                 <Layers className="mr-2" />
                 Dimension
             </h4>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                 {boite.dimensions!.map(dimension => (
                     <button
                         key={dimension.id}
                         onClick={() => handleSelect(dimension.id, 'dimension_id', 'dimension', dimension.dimension) }
                         className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.dimension_id === dimension.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                     >
                         <div className="font-semibold">{dimension.dimension}</div>
                     </button>
                 ))}
             </div>
         </div>
         <div className="w-full lg:w-1/2 scroll-mt-20">
        {/* Input pour découpe "personnalisé" */}
        {devisEncours.dimension === 'devis manuel' && (
        <div className="mt-3 px-2">
            <div className="space-y-3">
                <h1 className='text-sm font-bold ml-2'> Dimension personnalisé</h1>
                <div className="relative">
                    <Input
                        type="text"
                        value={autreDecoupe.nom}
                        onChange={(e) => setAutreDecoupe(prev => ({ ...prev, nom: e.target.value }))}
                        placeholder="Description de la dimension personnalisé"
                    />
                </div>
                <div className="relative">
                    <Input
                        type="number"
                        value={autreDecoupe.prix || ''}
                        onChange={(e) => setAutreDecoupe(prev => ({ ...prev, prix: Number(e.target.value) }))}
                        placeholder="Prix supplémentaire"
                        min="0"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                </div>
            </div>
        </div>
        )}
        </div>
    </div>

    {/* Section Materiaux */}
    <div className='flex mb-4'>
      <div ref={materiauRef} className="w-full lg:w-1/2 scroll-mt-20">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
              <Layers className="mr-2" />
              Matériaux
          </h4>
          <div >
            <div className='flex ml-5 mb-4 text-gray-800 font-semibold'>
              <Book size={22} className='mr-2'/>
              Type de papier
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              { categories.map( categorie => (
                <Button key={categorie.id}
                  variant='ghost'
                  onClick={ () =>{ 
                    handleSelect(categorie.id, "categorie_id", 'categorie', categorie.categorie);
                    handleSelect(categorie.categorie, "materiau");

                  }}
                  className={`p-3  border rounded-lg text-center text-sm transition-all duration-200 
                    ${devisEncours.categorie_id === categorie.id ? 'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' : 
                    'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                >
                  { categorie.categorie}
                </Button>
              ) ) }
            </div>
          </div>
          { devisEncours.categorie &&
            <div className={`${devisEncours.categorie === 'autres' ? 'hidden' : '' } `}>
            <div className='flex ml-5 mb-4 text-gray-800 font-semibold'>
              <Weight size={22} className='mr-2'/>
              Grammage
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {boite.matieres!.map(materiau => (
                  <button
                      key={materiau.id}
                      onClick={() => {
                          handleSelect(materiau.id, 'materiau_id', 'materiau', `${devisEncours.categorie}-${materiau.taille}`.trim());
                          
                      }}
                      className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 
                        ${devisEncours.materiau_id === materiau.id ? 
                        'bg-red-600 text-white border-red-600 shadow-md' : 
                        'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}
                        ${devisEncours.categorie === 'PCB Pélliculé' && materiau.taille === '700G' ? "hidden" : '' }
                        `}
                  >
                      <div className="text-xs">{materiau.taille ? materiau.taille : ''}</div>
                  </button>
              ))}
          </div>
          </div>}
          </div>
          <div className="w-full lg:w-1/2 scroll-mt-20 mt-10">
          {/* Input pour volet "autres" */}
          {devisEncours.categorie === 'autres' && (
          <div className="mt-2 px-2">
              <div className="space-y-3">
                  <h1 className='text-sm font-bold ml-2'> Matériau personnalisé</h1>
                  <div className="relative">
                      <Input
                          type="text"
                          value={autreMateriau.nom}
                          onChange={(e) => setAutreMateriau(prev => ({ ...prev, nom: e.target.value }))}
                          placeholder="Description du matériau personnalisé"
                      />
                  </div>
                  <div className="relative">
                      <Input
                          type="number"
                          value={autreMateriau.prix || ''}
                          onChange={(e) => setAutreMateriau(prev => ({ ...prev, prix: Number(e.target.value) }))}
                          placeholder="Prix supplémentaire"
                          min="0"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                  </div>
              </div>
          </div>
          )}
          </div>
    </div>

    {/* Section Couleur */}
    <div className='flex  mb-4'>
    <div ref={couleurRef} className="w-full lg:w-1/2 scroll-mt-20">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
            <Layers className="mr-2" />
            Couleur
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {boite.couleurs!.map(couleur => (
                <button
                    title={couleur.couleur}
                    key={couleur.id}
                    onClick={() => handleSelect(couleur.id, 'couleur_id', 'couleur', couleur.couleur)}
                    className={`truncate p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.couleur_id === couleur.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                >
                    <span>{couleur.couleur}</span>
                </button>
            ))}
            </div>
    </div>
    </div>

    {/* Section Face */}
    <div className='flex mb-4'>
        <div ref={faceRef} className="w-full lg:w-1/2 scroll-mt-20">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                <Layers className="mr-2" />
                Face
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {boite.faces!.map(face => (
                    <button
                        key={face.id}
                        onClick={() => handleSelect(face.id, 'recto_verso_id', 'recto', face.face)}
                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.recto_verso_id === face.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                    >
                        <span>{face.face}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>

    {/* Section Imprimante */}
    <div className='flex mb-4'>
        <div ref={imprimanteRef} className="w-full lg:w-1/2 scroll-mt-20">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                <Layers className="mr-2" />
                Technologie d&apos;impression
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {boite.imprimantes!.map(imprimante => (
                    <button
                        key={imprimante.id}
                        onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                    >
                        <div className="font-semibold">{imprimante.imprimante}</div>
                    </button>
                ))}
            </div>
        </div>
    </div>

    {/* Section Decoupe */}
    <div className={`flex mb-4 ${ !boite.decoupes!.length ? 'hidden' : ''}`}>
        <div ref={decoupeRef} className="w-full lg:w-1/2 scroll-mt-20">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                <Layers className="mr-2" />
                Type de découpe
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {boite.decoupes!.map((decoupe) => (
                    <button
                        key={decoupe.id}
                        onClick={() => handleSelect(decoupe.decoupe, 'decoupe')}
                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.decoupe === decoupe.decoupe ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                    >
                        <span>{decoupe.decoupe}</span>
                    </button>
                ))}
            </div>
        </div>
        <div className="w-full lg:w-1/2 scroll-mt-20">
        {/* Input pour découpe "personnalisé" */}
        {devisEncours.decoupe === 'autres' && (
        <div className="mt-3 px-2">
            <div className="space-y-3">
                <h1 className='text-sm font-bold ml-2'> Découpe personnalisé</h1>
                <div className="relative">
                    <Input
                        type="text"
                        value={autreDecoupe.nom}
                        onChange={(e) => setAutreDecoupe(prev => ({ ...prev, nom: e.target.value }))}
                        placeholder="Description du découpe personnalisé"
                    />
                </div>
                <div className="relative">
                    <Input
                        type="number"
                        value={autreDecoupe.prix}
                        onChange={(e) => setAutreDecoupe(prev => ({ ...prev, prix: Number(e.target.value) }))}
                        placeholder="Prix supplémentaire"
                        min="0"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
                </div>
            </div>
        </div>
        )}
        </div>
    </div>


    {/* Section Emplacement */}
    <div className='flex mb-4'>
    <div ref={emplacementRef} className="w-full lg:w-1/2 scroll-mt-20">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
            <Layers className="mr-2" />
            Emplacement d&apos;impression
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {boite.emplacements!.map(emplacement => (
                <button
                    key={emplacement.id}
                    onClick={() => handleSelect(emplacement.emplacement, 'emplacement')}
                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.emplacement === emplacement.emplacement ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                >
                    <div className="font-semibold">{emplacement.emplacement}</div>
                </button>
            ))}
        </div>
    </div>
    
    {/* Input pour emplacement "autres" */}
    {devisEncours.emplacement === 'autres' ? (
    <div className="mt-3 px-2 w-full lg:w-1/2 scroll-mt-20">
        <div className="space-y-3">
            <h1 className='text-sm font-bold ml-2'> Emplacement personnalisé</h1>
            <div className="relative">
                <Input
                    type="text"
                    value={autreEmplacement.nom}
                    onChange={(e) => setAutreEmplacement(prev => ({ ...prev, nom: e.target.value }))}
                    placeholder="Description de l'emplacement personnalisé"
                />
            </div>
            <div className="relative">
                <Input
                    type="number"
                    value={autreEmplacement.prix || ''}
                    onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: Number(e.target.value) }))}
                    placeholder="Prix supplémentaire"
                    min="0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
            </div>
        </div>
    </div>
    ) : (
    <div className="mt-3 px-2 w-full lg:w-1/2 scroll-mt-20">
        <div className="space-y-3">
            <h1 className='text-sm font-bold ml-2'> Information supplémentaire</h1>
            <div className="relative">
                <Input
                    type="text"
                    value={autreEmplacement.nom}
                    onChange={(e) => setAutreEmplacement(prev => ({ ...prev, nom: e.target.value }))}
                    placeholder="Description du fichier supplémentaire"
                />
            </div>
            <div className="relative">
                <Input
                    type="number"
                    value={autreEmplacement.prix || ''}
                    onChange={(e) => setAutreEmplacement(prev => ({ ...prev, prix: Number(e.target.value) }))}
                    placeholder="Prix supplémentaire"
                    min="0"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500"> | Ar</span>
            </div>
        </div>
    </div> 
    )}
    </div>



    {/* Section Particularités */}
    <div className='flex'>
        <div ref={particulariteRef} className="w-full lg:w-1/2 scroll-mt-20">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                <Layers className="mr-2" />
                Particularités
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {boite.particularites!.map((part) => (
                    <button
                        key={part.id}
                        title={part.particularite}
                        onClick={() => handleSelect(part.particularite, 'particularite')}
                        className={`truncate p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.particularite === part.particularite ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                    >
                        <span>{part.particularite}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>

    {/* Section Quantité */}
    <div className='flex mb-4'>
        <div ref={quantiteRef} className="w-full lg:w-1/2 scroll-mt-20">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                <Layers className="mr-2" />
                Quantité
            </h4>
            <Input 
                type="number" 
                value={devisEncours.quantite?.toString()} 
                onChange={e => handleSelect(Math.max(1, Number(e.target.value)), 'quantite')} 
                placeholder="Ex: 100" 
                min="1"
            />
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}
