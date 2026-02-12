'use client';

import { useState, useEffect } from 'react';

// ========== TYPES ==========
export interface TextileSize {
  id: number;
  taille?: string;
  dimension?: string;
  prix?: number;
}

export interface TextileGrammage {
  id: number;
  grammage: string;
  prix?: number;
}

export interface TextileDimension {
  id: number;
  dimension: string;
  unitee: string;
  prix?: number;
}

export interface TextileEmplacement {
  id: number;
  emplacement: string;
  prix?: number;
}

export interface TextileTechnologie {
  id: number;
  technologie: string;
  prix?: number;
}

export interface TextileCouleur {
  id: number;
  couleur: string;
  prix?: number;
}

export interface TextileProduct {
  meta: {
    id: number;
    type: string;
    nom: string;
  };
  id?: number;
  type?: string;
  nom?: string;
  tailles?: TextileSize[];
  grammages?: TextileGrammage[];
  dimensions_impression?: TextileDimension[];
  emplacements?: TextileEmplacement[];
  technologies?: TextileTechnologie[];
  couleurs_tissus?: TextileCouleur[];
}

export interface UseTextilesReturn {
  tshirt: TextileProduct;
  polo: TextileProduct;
  sweat: TextileProduct;
  gilet: TextileProduct;
  casquette: TextileProduct;
  nappe: TextileProduct;
  bob: TextileProduct;
  maillot: TextileProduct;
  combinaison: TextileProduct;
  totebag: TextileProduct;
  trousse: TextileProduct;
  textilesLoading: boolean;
  textilesError: Error | null;
}

// ========== DONNÉES COMPLÈTES ==========
const TextilesDataByType = {
  tshirt: {
    meta: { id: 1, type: 'tshirt', nom: 'T-shirt' },
    tailles: [
      { id: 1, taille: '2XS', prix: 0 },
      { id: 2, taille: 'XS', prix: 0 },
      { id: 3, taille: 'S', prix: 0 },
      { id: 4, taille: 'M', prix: 0 },
      { id: 5, taille: 'L', prix: 0 },
      { id: 6, taille: 'XL', prix: 500 },
      { id: 7, taille: 'XXL', prix: 1000 },
      { id: 8, taille: 'autres', prix: 0 }
    ],
    grammages: [
      { id: 1, grammage: '120 g/m²', prix: 3000 },
      { id: 2, grammage: '170 g/m²', prix: 4000 },
      { id: 3, grammage: '180 g/m²', prix: 4500 },
      { id: 4, grammage: '200 g/m²', prix: 5000 }
    ],
    dimensions_impression: [
      { id: 1, dimension: 'A6', unitee: '105x148mm', prix: 1000 },
      { id: 2, dimension: 'A5', unitee: '148x210mm', prix: 2000 },
      { id: 3, dimension: 'A4', unitee: '210x297mm', prix: 3000 },
      { id: 4, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
      { id: 5, dimension: 'autres', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Face', prix: 0 },
      { id: 2, emplacement: 'Dos', prix: 1000 },
      { id: 3, emplacement: 'Manches', prix: 1500 }
    ]
  },

  polo: {
    meta: { id: 2, type: 'polo', nom: 'Polo' },
    tailles: [
      { id: 9, taille: '2XS', prix: 0 },
      { id: 10, taille: 'XS', prix: 0 },
      { id: 11, taille: 'S', prix: 0 },
      { id: 12, taille: 'M', prix: 0 },
      { id: 13, taille: 'L', prix: 0 },
      { id: 14, taille: 'XL', prix: 500 },
      { id: 15, taille: 'XXL', prix: 1000 },
      { id: 16, taille: 'autres', prix: 0 }
    ],
    grammages: [
      { id: 5, grammage: '120 g/m²', prix: 3500 },
      { id: 6, grammage: '170 g/m²', prix: 4500 },
      { id: 7, grammage: '180 g/m²', prix: 5000 },
      { id: 8, grammage: '201 g/m²', prix: 5500 }
    ],
    dimensions_impression: [
      { id: 6, dimension: 'A6', unitee: '105x148mm', prix: 1000 },
      { id: 7, dimension: 'A5', unitee: '148x210mm', prix: 2000 },
      { id: 8, dimension: 'A4', unitee: '210x297mm', prix: 3000 },
      { id: 9, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
      { id: 10, dimension: 'autres', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 4, emplacement: 'Face', prix: 0 },
      { id: 5, emplacement: 'Dos', prix: 1000 },
      { id: 6, emplacement: 'Manches', prix: 1500 }
    ]
  },

  sweat: {
    meta: { id: 3, type: 'sweat', nom: 'Sweat' },
    tailles: [
      { id: 17, taille: '2XS', prix: 0 },
      { id: 18, taille: 'XS', prix: 0 },
      { id: 19, taille: 'S', prix: 0 },
      { id: 20, taille: 'M', prix: 0 },
      { id: 21, taille: 'L', prix: 0 },
      { id: 22, taille: 'XL', prix: 1000 },
      { id: 23, taille: 'XXL', prix: 2000 },
      { id: 24, taille: 'autres', prix: 0 }
    ],
    grammages: [
      { id: 9, grammage: '250-350 g/m²', prix: 8000 }
    ],
    dimensions_impression: [
      { id: 11, dimension: 'A6', unitee: '105x148mm', prix: 1500 },
      { id: 12, dimension: 'A5', unitee: '148x210mm', prix: 2500 },
      { id: 13, dimension: 'A4', unitee: '210x297mm', prix: 3500 },
      { id: 14, dimension: 'A3', unitee: '297x420mm', prix: 4500 },
      { id: 15, dimension: 'autres', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 7, emplacement: 'Face', prix: 0 },
      { id: 8, emplacement: 'Dos', prix: 1500 },
      { id: 9, emplacement: 'Manches', prix: 2000 }
    ]
  },

  gilet: {
    meta: { id: 4, type: 'gilet', nom: 'Gilet' },
    tailles: [
      { id: 25, taille: 'XS', prix: 0 },
      { id: 26, taille: 'S', prix: 0 },
      { id: 27, taille: 'M', prix: 0 },
      { id: 28, taille: 'L', prix: 0 },
      { id: 29, taille: 'XL', prix: 1000 },
      { id: 30, taille: 'XXL', prix: 2000 },
      { id: 31, taille: 'autres', prix: 0 }
    ],
    grammages: [
      { id: 10, grammage: '200-300 g/m²', prix: 7000 }
    ],
    dimensions_impression: [
      { id: 16, dimension: 'A6', unitee: '105x148mm', prix: 1000 },
      { id: 17, dimension: 'A5', unitee: '148x210mm', prix: 2000 },
      { id: 18, dimension: 'A4', unitee: '210x297mm', prix: 3000 },
      { id: 19, dimension: 'A3', unitee: '297x420mm', prix: 4000 },
      { id: 20, dimension: 'autres', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 10, emplacement: 'Face', prix: 0 },
      { id: 11, emplacement: 'Dos', prix: 1000 },
      { id: 12, emplacement: 'Manches', prix: 1500 }
    ]
  },

  casquette: {
    meta: { id: 5, type: 'casquette', nom: 'Casquette' },
    tailles: [
      { id: 32, taille: 'Taille unique', prix: 0 }
    ],
    dimensions_impression: [
      { id: 21, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 22, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 13, emplacement: 'Front', prix: 2000 },
      { id: 14, emplacement: 'Côté', prix: 1500 },
      { id: 15, emplacement: 'autres', prix: 0 }
    ]
  },

  nappe: {
    meta: { id: 6, type: 'nappe', nom: 'Nappe' },
    tailles: [
      { id: 33, taille: 'Dimensions personnalisées', prix: 0 }
    ],
    dimensions_impression: [
      { id: 23, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 24, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 16, emplacement: 'Front', prix: 3000 },
      { id: 17, emplacement: 'Côté', prix: 2000 },
      { id: 18, emplacement: 'autres', prix: 0 }
    ]
  },

  bob: {
    meta: { id: 7, type: 'bob', nom: 'Bob' },
    tailles: [
      { id: 34, taille: 'Taille unique', prix: 0 }
    ],
    dimensions_impression: [
      { id: 25, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 26, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 19, emplacement: 'Front', prix: 1500 },
      { id: 20, emplacement: 'Côté', prix: 1000 },
      { id: 21, emplacement: 'autres', prix: 0 }
    ]
  },

  maillot: {
    meta: { id: 8, type: 'maillot', nom: 'Maillot' },
    tailles: [
      { id: 35, taille: 'XS', prix: 0 },
      { id: 36, taille: 'S', prix: 0 },
      { id: 37, taille: 'M', prix: 0 },
      { id: 38, taille: 'L', prix: 0 },
      { id: 39, taille: 'XL', prix: 500 },
      { id: 40, taille: 'XXL', prix: 1500 },
      { id: 41, taille: 'autres', prix: 0 }
    ],
    grammages: [
      { id: 11, grammage: '150-250 g/m²', prix: 6000 }
    ],
    dimensions_impression: [
      { id: 27, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 28, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 22, emplacement: 'Face', prix: 0 },
      { id: 23, emplacement: 'Dos', prix: 1000 },
      { id: 24, emplacement: 'Manches', prix: 1500 }
    ]
  },

  combinaison: {
    meta: { id: 9, type: 'combinaison', nom: 'Combinaison' },
    tailles: [
      { id: 42, taille: 'Sur mesure', prix: 0 }
    ],
    dimensions_impression: [
      { id: 29, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 30, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 25, emplacement: 'Face', prix: 0 },
      { id: 26, emplacement: 'Dos', prix: 2000 },
      { id: 27, emplacement: 'Manches', prix: 3000 }
    ]
  },

  totebag: {
    meta: { id: 10, type: 'totebag', nom: 'Totebag' },
    tailles: [
      { id: 43, taille: 'A4', prix: 2000 },
      { id: 44, taille: 'A3', prix: 3000 },
      { id: 45, taille: 'autres', prix: 0 }
    ],
    dimensions_impression: [
      { id: 31, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 32, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 28, emplacement: 'Face', prix: 0 },
      { id: 29, emplacement: 'Dos', prix: 1000 }
    ]
  },

  trousse: {
    meta: { id: 11, type: 'trousse', nom: 'Trousse' },
    tailles: [
      { id: 46, taille: 'Dimensions variées', prix: 0 }
    ],
    dimensions_impression: [
      { id: 33, dimension: 'longueur', unitee: 'personnalisée', prix: 0 },
      { id: 34, dimension: 'largeur', unitee: 'personnalisée', prix: 0 }
    ],
    emplacements: [
      { id: 30, emplacement: 'Face', prix: 0 },
      { id: 31, emplacement: 'Dos', prix: 1500 }
    ]
  },

  global: {
    technologies: [
      { id: 1, technologie: 'broderie', prix: 5000 },
      { id: 2, technologie: 'DTF', prix: 3000 },
      { id: 3, technologie: 'flex', prix: 2000 }
    ],
    couleurs_tissus: [
      { id: 1, couleur: 'Blanc', prix: 0 },
      { id: 2, couleur: 'Noir', prix: 0 },
      { id: 3, couleur: 'Bleu', prix: 500 },
      { id: 4, couleur: 'Rouge', prix: 500 },
      { id: 5, couleur: 'Vert', prix: 500 },
      { id: 6, couleur: 'Jaune', prix: 500 },
      { id: 7, couleur: 'Gris', prix: 0 },
      { id: 8, couleur: 'autres', prix: 0 }
    ]
  }
};



// ========== HOOK PRINCIPAL ==========
export const useTextiles = (): UseTextilesReturn => {
  const [textilesLoading, setTextilesLoading] = useState(false);
  const [textilesError, setTextilesError] = useState<Error | null>(null);

  // Enrichir les données avec métadonnées
  const enrichProduct = ({...product}): TextileProduct => {
    const { meta, ...rest } = product;
    return {
      id: meta.id,
      type: meta.type,
      nom: meta.nom,
      meta,
      ...rest
    };
  };

  // Ajouter les technologies et couleurs globales à tous les produits
  const addGlobalOptions = (product: TextileProduct): TextileProduct => {
    return {
      ...product,
      technologies: TextilesDataByType.global.technologies,
      couleurs_tissus: TextilesDataByType.global.couleurs_tissus
    };
  };

  // Simuler le chargement des données (optionnel, remplacer par un appel API)
  useEffect(() => {
    setTextilesLoading(true);
    try {
      // Simuler un délai réseau
      const timer = setTimeout(() => {
        setTextilesLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } catch (error) {
      setTextilesError(error instanceof Error ? error : new Error('Erreur inconnue'));
      setTextilesLoading(false);
    }
  }, []);

  // Retourner les produits enrichis
  return {
    tshirt: addGlobalOptions(enrichProduct(TextilesDataByType.tshirt)),
    polo: addGlobalOptions(enrichProduct(TextilesDataByType.polo)),
    sweat: addGlobalOptions(enrichProduct(TextilesDataByType.sweat)),
    gilet: addGlobalOptions(enrichProduct(TextilesDataByType.gilet)),
    casquette: addGlobalOptions(enrichProduct(TextilesDataByType.casquette)),
    nappe: addGlobalOptions(enrichProduct(TextilesDataByType.nappe)),
    bob: addGlobalOptions(enrichProduct(TextilesDataByType.bob)),
    maillot: addGlobalOptions(enrichProduct(TextilesDataByType.maillot)),
    combinaison: addGlobalOptions(enrichProduct(TextilesDataByType.combinaison)),
    totebag: addGlobalOptions(enrichProduct(TextilesDataByType.totebag)),
    trousse: addGlobalOptions(enrichProduct(TextilesDataByType.trousse)),
    textilesLoading,
    textilesError
  };
};

// ========== HOOK ALTERNATIF: FETCH DEPUIS UNE API ==========
/**
 * Si vous voulez récupérer les données depuis une API,
 * décommentez et adaptez cette version
 */
/*
export const useTextiles = (): UseTextilesReturn => {
  const [textilesLoading, setTextilesLoading] = useState(true);
  const [textilesError, setTextilesError] = useState<Error | null>(null);
  const [products, setProducts] = useState<Record<string, TextileProduct>>({});

  useEffect(() => {
    const fetchTextiles = async () => {
      try {
        setTextilesLoading(true);
        // Remplacer par votre endpoint API
        const response = await fetch('/api/textiles');
        if (!response.ok) throw new Error('Erreur lors du chargement');
        
        const data = await response.json();
        setProducts(data);
        setTextilesError(null);
      } catch (error) {
        setTextilesError(error instanceof Error ? error : new Error('Erreur inconnue'));
        // En cas d'erreur, utiliser les données mock
        setProducts({
          tshirt: enrichProduct(TextilesDataByType.tshirt),
          polo: enrichProduct(TextilesDataByType.polo),
          // ... etc
        });
      } finally {
        setTextilesLoading(false);
      }
    };

    fetchTextiles();
  }, []);

  return {
    tshirt: products.tshirt || enrichProduct(TextilesDataByType.tshirt),
    polo: products.polo || enrichProduct(TextilesDataByType.polo),
    // ... etc
    textilesLoading,
    textilesError
  };
};
*/

// ========== EXPORTS UTILES ==========
export { TextilesDataByType };