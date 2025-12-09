import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { itemType } from '@/types/itemType';
import { devisData } from '@/types/type';
import { Layers } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

type DoypackProps = {
    doypack: itemType,
    userRole: string;
    getDevis: (devis : devisData) => void;
    getPrix: (prixTotalReel : number, prixUnitaireReel: number) => void; 
    activeSection: string;
}

export default function Doypack( { doypack, activeSection, getDevis, getPrix }: DoypackProps) {

  const [prix, setPrix] = useState({
              prixTotal: 0,
              prixUnitaire: 0 ,
          })
      //const [activeTab, setActiveTab] = useState('type');
      //const [ratioState, setRatioState] = useState(1);
  
      const [autreDimension, setAutreDimension] = useState({
        nom: "",
        prix: 0,
      })
      /*const [autreDecoupe, setAutreDecoupe] = useState({
        nom: "",
        prix: 0,
      })*/
      const [autreEmplacement, setAutreEmplacement] = useState({
        nom: "",
        prix: 0,
      })
      /*const [autreFinition, setAutreFinition] = useState({
        nom: "",
        prix: 0,
      })*/

  
      const [devisEncours, setDevisEncours] = useState<devisData>({
              client_id: 0,
              type: doypack.type,
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
    // --- Logique de Calcul du Prix pour Doypack ---
    
    // Vérification des sélections obligatoires
    /*if (!devisEncours.dimension_id || 
        !devisEncours.materiau_id || 
        !devisEncours.imprimante_id ||
        !devisEncours.recto_verso_id ||
        !devisEncours.emplacement) {
        setPrix({ prixTotal: 0, prixUnitaire: 0 });
        return;
    }*/

    let prixUnitaire = 0;
    
    // 1. Prix de base selon la dimension
    if (devisEncours.dimension === 'sur devis') {
        // Dimension personnalisée
        prixUnitaire += autreDimension.prix;
    } 
    /*else {
        const dimensionSelectionnee = doypack.dimensions.find(
            d => d.id === devisEncours.dimension_id
        );
        if (dimensionSelectionnee) {
            prixUnitaire += dimensionSelectionnee.prix;
        }
    }*/

    // 2. Prix du matériau
    const materiauSelectionne = doypack.matieres!.find(
        m => m.id === devisEncours.materiau_id
    );
    if (materiauSelectionne) {
        prixUnitaire += Number(materiauSelectionne.prix_unitaire);
    }

    // 3. Prix de l'imprimante/technologie
    /*const imprimanteSelectionnee = doypack.imprimantes.find(
        i => i.id === devisEncours.imprimante_id
    );
    if (imprimanteSelectionnee) {
        prixUnitaire += imprimanteSelectionnee.prix;
    }*/

    // 4. Prix de la face (recto/verso)
    const faceSelectionnee = doypack.faces!.find(
        f => f.id === devisEncours.recto_verso_id
    );
    if (faceSelectionnee) {
        prixUnitaire = prixUnitaire * Number(faceSelectionnee.code);
    }

    // 5. Prix de l'emplacement
    if (devisEncours.emplacement === 'autres') {
        prixUnitaire += autreEmplacement.prix;
    } 
    /*else {
        const emplacementSelectionne = doypack.emplacements.find(
            e => e.emplacement === devisEncours.emplacement
        );
        if (emplacementSelectionne) {
            prixUnitaire += emplacementSelectionne.prix;
        }
    }*/

    // 6. Application des paliers de quantité
    const quantite = devisEncours.quantite || 1;
    let coefficientQuantite = 1;
    
    // Paliers plus agressifs pour les doypacks (volumes souvent importants)
    if (quantite >= 20000) {
        coefficientQuantite = 0.65; // 35% de réduction
    } else if (quantite >= 10000) {
        coefficientQuantite = 0.70; // 30% de réduction
    } else if (quantite >= 5000) {
        coefficientQuantite = 0.75; // 25% de réduction
    } else if (quantite >= 2000) {
        coefficientQuantite = 0.80; // 20% de réduction
    } else if (quantite >= 1000) {
        coefficientQuantite = 0.85; // 15% de réduction
    } else if (quantite >= 500) {
        coefficientQuantite = 0.90; // 10% de réduction
    } else if (quantite >= 250) {
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
    devisEncours.materiau_id,
    devisEncours.imprimante_id,
    devisEncours.recto_verso_id,
    devisEncours.emplacement,
    devisEncours.quantite,
    autreDimension.prix,
    autreEmplacement.prix,
]);
      
  
      const handleSelect = (value: number | string | null, name: string, option?: string, optionValue?: string) => {
          setDevisEncours(prevState => ({
              ...prevState,
              type: doypack.type,
              [name]: value,
              ...(option !== undefined && { [option]: optionValue }),
          }));
      };
  return (
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
                 {doypack.dimensions!.map(dimension => (
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
        {devisEncours.dimension === 'sur devis' && (
        <div className="mt-3 px-2">
            <div className="space-y-3">
                <h1 className='text-sm font-bold ml-2'> Dimension personnalisé</h1>
                <div className="relative">
                    <Input
                        type="text"
                        value={autreDimension.nom}
                        onChange={(e) => setAutreDimension(prev => ({ ...prev, nom: e.target.value }))}
                        placeholder="Description de la dimension personnalisé"
                    />
                </div>
                <div className="relative">
                    <Input
                        type="number"
                        value={autreDimension.prix || ''}
                        onChange={(e) => setAutreDimension(prev => ({ ...prev, prix: Number(e.target.value) }))}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {doypack.matieres!.map(matiere => (
                <Button
                    key={matiere.id}
                    variant='ghost'
                    onClick={() => {
                       handleSelect(matiere.id, 'materiau_id', 'materiau', matiere.type );
                   }}
                    className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.materiau_id === matiere.id ? 'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                >
                    <div className="font-semibold truncate">{matiere.type}</div>
                </Button>
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
                {doypack.imprimantes!.map(imprimante => (
                    <Button
                        key={imprimante.id}
                        variant='ghost'
                        onClick={() => handleSelect(imprimante.id, 'imprimante_id', 'imprimante', imprimante.imprimante)}
                        className={`p-3 border rounded-lg text-center text-sm transition-all duration-200 ${devisEncours.imprimante_id === imprimante.id ? 'bg-red-600 text-white border-red-600 shadow-md hover:bg-red-600 hover:text-white' : 'bg-white dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500'}`}
                    >
                        <div className="font-semibold">{imprimante.imprimante}</div>
                    </Button>
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
                {doypack.faces!.map(face => (
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

    {/* Section Emplacement */}
    <div className='flex mb-4'>
        <div ref={emplacementRef} className="w-full lg:w-1/2 scroll-mt-20">
            <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
                <Layers className="mr-2" />
                Emplacement d&apos;impression
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {doypack.emplacements!.map(emplacement => (
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
  )
}
