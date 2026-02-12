'use client';

import { useState, useEffect } from 'react';

// ========== TYPES ==========
export interface GoodiesSize {
  id: number;
  taille?: string;
  dimension?: string;
  prix?: number;
}

export interface GoodiesGrammage {
  id: number;
  grammage: string;
  prix?: number;
}

export interface GoodiesDimension {
  id: number;
  dimension: string;
  unitee: string;
  prix?: number;
}

export interface GoodiesEmplacement {
  id: number;
  emplacement: string;
  prix?: number;
}

export interface GoodiesTechnologie {
  id: number;
  technologie: string;
  prix?: number;
}

export interface GoodiesCouleur {
  id: number;
  couleur: string;
  prix?: number;
}

export interface GoodiesProduct {
  meta: {
    id: number;
    type: string;
    nom: string;
  };
  id?: number;
  type?: string;
  nom?: string;
  tailles?: GoodiesSize[];
  grammages?: GoodiesGrammage[];
  dimensions_impression?: GoodiesDimension[];
  emplacements?: GoodiesEmplacement[];
  technologies?: GoodiesTechnologie[];
  couleurs_tissus?: GoodiesCouleur[];
}

export interface UseGoodiessReturn {
  mug: GoodiesProduct;
  gourde: GoodiesProduct;
  tasse: GoodiesProduct;
  tapis_souris: GoodiesProduct;
  briquet: GoodiesProduct;
  usb: GoodiesProduct;
  parapluie: GoodiesProduct;
  stylo: GoodiesProduct;
  porte_cles: GoodiesProduct;
  pins_badge: GoodiesProduct;
  goodiesLoading: boolean;
  goodiesError: Error | null;
}

// ========== DONNÉES COMPLÈTES ==========
const GoodiesDataByType = {
  mug: {
    meta: { id: 1, type: 'mug', nom: 'Mug' },

    types_specifiques: [
      { id: 1, type: 'Classique' },
      { id: 2, type: 'Magique' }
    ],

    capacites: [
      { id: 1, capacite: '300 ml' },
      { id: 2, capacite: '400 ml' },
      { id: 3, capacite: '500 ml' }
    ],

    emplacements: [
      { id: 1, emplacement: 'Face' },
      { id: 2, emplacement: 'Gauche' },
      { id: 3, emplacement: 'Droite' }
    ],

    technologies: [
      { id: 1, technologie: 'Sublimation' },
      { id: 2, technologie: 'UV DTF' }
    ]
  },

  gourde: {
    meta: { id: 2, type: 'gourde', nom: 'Gourde' },

    types_specifiques: [
      { id: 3, type: 'Plastique' },
      { id: 4, type: 'Métal' },
      { id: 5, type: 'Thermos' }
    ],

    capacites: [
      { id: 4, capacite: '500 ml' },
      { id: 5, capacite: '750 ml' },
      { id: 6, capacite: '1 L' }
    ],

    emplacements: [
      { id: 4, emplacement: 'Face' },
      { id: 5, emplacement: 'Gauche' },
      { id: 6, emplacement: 'Droite' }
    ],

    technologies: [
      { id: 3, technologie: 'Sublimation' },
      { id: 4, technologie: 'UV DTF' }
    ]
  },

  tasse: {
    meta: { id: 3, type: 'tasse', nom: 'Tasse' },

    types_specifiques: [
      { id: 6, type: 'Standard' }
    ],

    capacites: [
      { id: 7, capacite: '250 ml' },
      { id: 8, capacite: '300 ml' },
      { id: 9, capacite: '350 ml' }
    ],

    emplacements: [
      { id: 7, emplacement: 'Face' }
    ],

    technologies: [
      { id: 5, technologie: 'Sublimation' },
      { id: 6, technologie: 'UV DTF' }
    ]
  },

  tapis_souris: {
    meta: { id: 4, type: 'tapis_souris', nom: 'Tapis souris' },

    types_specifiques: [
      { id: 7, type: 'Type 1' },
      { id: 8, type: 'Type 2' },
      { id: 9, type: 'Type 3' }
    ],

    capacites: [
      { id: 10, capacite: 'Type 1' },
      { id: 11, capacite: 'Type 2' },
      { id: 12, capacite: 'Type 3' }
    ],

    emplacements: [
      { id: 8, emplacement: 'Standard' }
    ],

    technologies: [
      { id: 7, technologie: 'Sublimation' },
      { id: 8, technologie: 'DTF' }
    ]
  },

  briquet: {
    meta: { id: 5, type: 'briquet', nom: 'Briquet' },

    types_specifiques: [
      { id: 10, type: 'Classique' },
      { id: 11, type: 'Tempête' }
    ],

    capacites: [
      { id: 13, capacite: 'Standard' }
    ],

    emplacements: [
      { id: 9, emplacement: 'Face/Dos' }
    ],

    technologies: [
      { id: 9, technologie: 'Vynil' },
      { id: 10, technologie: 'UV DTF' }
    ]
  },

  usb: {
    meta: { id: 6, type: 'usb', nom: 'USB' },

    types_specifiques: [
      { id: 12, type: 'Forme USB' }
    ],

    capacites: [
      { id: 14, capacite: '4GB' },
      { id: 15, capacite: '8GB' },
      { id: 16, capacite: '16GB' },
      { id: 17, capacite: '32GB' },
      { id: 18, capacite: '64GB+' }
    ],

    emplacements: [
      { id: 10, emplacement: 'Recto' },
      { id: 11, emplacement: 'Recto/Verso' }
    ],

    technologies: [
      { id: 11, technologie: 'Sublimation' },
      { id: 12, technologie: 'UV DTF' },
      { id: 13, technologie: 'Vynil' }
    ]
  },

  parapluie: {
    meta: { id: 7, type: 'parapluie', nom: 'Parapluie' },

    types_specifiques: [
      { id: 13, type: 'Standard' }
    ],

    capacites: [
      { id: 19, capacite: '80 cm diamètre' },
      { id: 20, capacite: '100 cm diamètre' },
      { id: 21, capacite: '120 cm diamètre' }
    ],

    emplacements: [
      { id: 12, emplacement: 'Standard' }
    ],

    technologies: [
      { id: 14, technologie: 'Sublimation' },
      { id: 15, technologie: 'UV DTF' },
      { id: 16, technologie: 'DTF' }
    ]
  },

  stylo: {
    meta: { id: 8, type: 'stylo', nom: 'Stylo' },

    types_specifiques: [
      { id: 14, type: 'Plastique' },
      { id: 15, type: 'Métal' },
      { id: 16, type: 'autres' }
    ],

    capacites: [
      { id: 22, capacite: 'Standard' }
    ],

    emplacements: [
      { id: 13, emplacement: 'Face' },
      { id: 14, emplacement: '2 faces' }
    ],

    technologies: [
      { id: 17, technologie: 'Sublimation' },
      { id: 18, technologie: 'UV DTF' },
      { id: 19, technologie: 'Vynil' }
    ]
  },

  porte_cles: {
    meta: { id: 9, type: 'porte_cles', nom: 'Porte-clés' },

    types_specifiques: [
      { id: 17, type: 'Métal' },
      { id: 18, type: 'Plastique' },
      { id: 19, type: 'Acrylic' },
      { id: 20, type: 'PVC' }
    ],

    capacites: [
      { id: 23, capacite: 'Sur mesure' }
    ],

    emplacements: [
      { id: 15, emplacement: 'Recto' },
      { id: 16, emplacement: 'Recto/Verso' }
    ],

    technologies: [
      { id: 20, technologie: 'Sublimation' },
      { id: 21, technologie: 'UV DTF' },
      { id: 22, technologie: 'Direct' }
    ]
  },

  pins_badge: {
    meta: { id: 10, type: 'pins_badge', nom: "Pin's / Badge" },

    types_specifiques: [
      { id: 21, type: 'Standard' }
    ],

    capacites: [
      { id: 24, capacite: '25 mm' },
      { id: 25, capacite: '35 mm' },
      { id: 26, capacite: '45 mm' }
    ],

    emplacements: [
      { id: 17, emplacement: 'Standard' }
    ],

    technologies: [
      { id: 23, technologie: 'Sublimation' },
      { id: 24, technologie: 'UV DTF' },
      { id: 25, technologie: 'Direct' }
    ]
  }
};




// ========== HOOK PRINCIPAL ==========
export const useGoodiess = (): UseGoodiessReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Enrichir les données avec métadonnées
    //   const enrichProduct = ({...product}): GoodiesProduct => {
    //     const { meta, ...rest } = product;
    //     return {
    //       id: meta.id,
    //       type: meta.type,
    //       nom: meta.nom,
    //       meta,
    //       ...rest
    //     };
    //   };

  // Simuler le chargement des données (optionnel, remplacer par un appel API)
  useEffect(() => {
    setLoading(true);
    try {
      // Simuler un délai réseau
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Erreur inconnue'));
      setLoading(false);
    }
  }, []);

  // Retourner les produits enrichis
  return {
    mug: GoodiesDataByType.mug,
    gourde: GoodiesDataByType.gourde,
    tasse: GoodiesDataByType.tasse,
    tapis_souris: GoodiesDataByType.tapis_souris,
    briquet: GoodiesDataByType.briquet,
    usb: GoodiesDataByType.usb,
    parapluie: GoodiesDataByType.parapluie,
    stylo: GoodiesDataByType.stylo,
    porte_cles: GoodiesDataByType.porte_cles,
    pins_badge: GoodiesDataByType.pins_badge,
    goodiesLoading: loading,
    goodiesError: error
  };
};

// ========== HOOK ALTERNATIF: FETCH DEPUIS UNE API ==========
/**
 * Si vous voulez récupérer les données depuis une API,
 * décommentez et adaptez cette version
 */
/*
export const useGoodiess = (): UseGoodiessReturn => {
  const [textilesLoading, setLoading] = useState(true);
  const [textilesError, setGoodiesError] = useState<Error | null>(null);
  const [products, setProducts] = useState<Record<string, GoodiesProduct>>({});

  useEffect(() => {
    const fetchGoodiess = async () => {
      try {
        setLoading(true);
        // Remplacer par votre endpoint API
        const response = await fetch('/api/textiles');
        if (!response.ok) throw new Error('Erreur lors du chargement');
        
        const data = await response.json();
        setProducts(data);
        setGoodiesError(null);
      } catch (error) {
        setGoodiesError(error instanceof Error ? error : new Error('Erreur inconnue'));
        // En cas d'erreur, utiliser les données mock
        setProducts({
          tshirt: enrichProduct(GoodiessDataByType.tshirt),
          polo: enrichProduct(GoodiessDataByType.polo),
          // ... etc
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGoodiess();
  }, []);

  return {
    tshirt: products.tshirt || enrichProduct(GoodiessDataByType.tshirt),
    polo: products.polo || enrichProduct(GoodiessDataByType.polo),
    // ... etc
    textilesLoading,
    textilesError
  };
};
*/

// ========== EXPORTS UTILES ==========
export { GoodiesDataByType };