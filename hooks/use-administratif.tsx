'use client';

import { useState, useEffect } from 'react';

// ========== TYPES ==========

export interface AdminsTaille {
  id: number;
  taille?: string;
  prix?: number;
}

export interface AdminsSouches {
  id: number;
  souches: string;
  prix?: number;
}

export interface AdminsFinition {
  id: number;
  finition: string;
  prix?: number;
}

export interface AdminsCouleursPapier {
  id: number;
  couleur?: string;
  prix?: number;
}

export interface AdminsFace {
  id: number;
  face: string;
  prix?: number;
}

export interface AdminsTechnologie {
  id: number;
  technologie?: string;
  prix?: number;
}

export interface AdminsCouverture {
  id: number;
  couverture?: string;
  prix?: number;
}


export interface AdminsProduct {
  meta: {
    id: number;
    type: string;
    nom: string;
  };
  id?: number;
  type?: string;
  tailles?: AdminsTaille[];
  souches?: AdminsSouches[];
  couleurs?: AdminsCouleursPapier[];
  couvertures?: AdminsCouverture[];
  finitions?: AdminsFinition[];
  technologies?: AdminsTechnologie[];
}

export interface UseAdminsReturn {
  carnet_facture_autocopiant: AdminsProduct;
  en_tete: AdminsProduct;
  recu: AdminsProduct;
  adminsLoading: boolean;
  adminsError: Error | null;
}

// ========== DONNÉES COMPLÈTES ==========
const AdminsDataByType = {
  carnet_facture_autocopiant: {
    meta: { id: 1, type: 'carnet_facture_autocopiant', nom: 'Carnet / facture autocopiant' },
    tailles: [
      { id: 1, taille: 'A6', prix: 0 },
      { id: 2, taille: 'A5', prix: 500 },
      { id: 3, taille: 'A4', prix: 1000 }
    ],
    souches: [
      { id: 1, souches: '2', prix: 0 },
      { id: 2, souches: '3', prix: 1000 },
      { id: 3, souches: '4', prix: 2000 }
    ],
    couleurs: [
      { id: 1, couleur: 'Blanc', prix: 0 },
      { id: 2, couleur: 'Jaune', prix: 500 },
      { id: 3, couleur: 'Rose', prix: 500 },
      { id: 4, couleur: 'Vert', prix: 500 },
      { id: 5, couleur: 'Bleu', prix: 500 }
    ],
    pages: [
      { id: 1, pages: '20 pages', prix: 0 },
      { id: 2, pages: '30 pages', prix: 500 },
      { id: 3, pages: '40 pages', prix: 1000 },
      { id: 4, pages: '50 pages', prix: 1500 },
      { id: 5, pages: '60 pages', prix: 2000 },
      { id: 6, pages: 'Variable', prix: 0 }
    ],
    couvertures: [
      { id: 1, couverture: 'Cartonnée', prix: 0 },
      { id: 2, couverture: 'Imprimé PCB', prix: 1500 },
      { id: 3, couverture: 'autres', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Collée', prix: 0 },
      { id: 2, finition: 'Perforée', prix: 1000 }
    ],
    technologies: [
      { id: 1, technologie: 'Niveaux de gris', prix: 0 },
      { id: 2, technologie: 'CMJN quadri', prix: 1500 }
    ]
  },

  en_tete: {
    meta: { id: 2, type: 'en_tete', nom: 'En-tête' },
    tailles: [
      { id: 1, taille: 'A5', prix: 0 },
      { id: 2, taille: 'A4', prix: 500 }
    ],
    souches: [
      { id: 1, souches: 'N/A', prix: 0 }
    ],
    couleurs_papiers: [
      { id: 1, couleur: 'Blanc', prix: 0 },
      { id: 2, couleur: 'Jaune', prix: 500 },
      { id: 3, couleur: 'Rose', prix: 500 },
      { id: 4, couleur: 'Vert', prix: 500 },
      { id: 5, couleur: 'Bleu', prix: 500 }
    ],
    pages: [
      { id: 1, pages: '1', prix: 0 }
    ],
    type_couverture: [
      { id: 1, type_couverture: 'Papier standard', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Standard', prix: 0 }
    ],
    technologies: [
      { id: 1, technologie: 'Niveaux de gris', prix: 0 },
      { id: 2, technologie: 'CMJN quadri', prix: 1000 }
    ]
  },

  recu: {
    meta: { id: 3, type: 'recu', nom: 'Reçu' },
    tailles: [
      { id: 1, taille: '1/6 A4', prix: 0 },
      { id: 2, taille: '1/4 A4', prix: 500 },
      { id: 3, taille: '1/3 A4', prix: 1000 }
    ],
    souches: [
      { id: 1, souches: '2', prix: 0 },
      { id: 2, souches: '3', prix: 1000 },
      { id: 3, souches: '4', prix: 2000 }
    ],
    couleurs: [
      { id: 1, couleur: 'Blanc', prix: 0 },
      { id: 2, couleur: 'Jaune', prix: 500 },
      { id: 3, couleur: 'Rose', prix: 500 },
      { id: 4, couleur: 'Vert', prix: 500 },
      { id: 5, couleur: 'Bleu', prix: 500 }
    ],
    pages: [
      { id: 1, pages: '20 pages', prix: 0 },
      { id: 2, pages: '30 pages', prix: 500 },
      { id: 3, pages: '40 pages', prix: 1000 },
      { id: 4, pages: '50 pages', prix: 1500 },
      { id: 5, pages: '60 pages', prix: 2000 },
      { id: 6, pages: 'Variable', prix: 0 }
    ],
    couvertures: [
      { id: 1, couverture: 'Cartonnée', prix: 0 },
      { id: 2, couverture: 'Imprimé PCB', prix: 1500 },
      { id: 3, couverture: 'autres', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Collée', prix: 0 },
      { id: 2, finition: 'Perforée', prix: 1000 }
    ],
    technologies: [
      { id: 1, technologie: 'Niveaux de gris', prix: 0 },
      { id: 2, technologie: 'CMJN quadri', prix: 1500 }
    ]
  }
};




// ========== HOOK PRINCIPAL ==========
export const useAdmins = (): UseAdminsReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Enrichir les données avec métadonnées
    //   const enrichProduct = ({...product}): AdminsProduct => {
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
    carnet_facture_autocopiant: AdminsDataByType.carnet_facture_autocopiant,
    en_tete: AdminsDataByType.en_tete,
    recu: AdminsDataByType.recu,
    adminsLoading: loading,
    adminsError: error
  };
};

export { AdminsDataByType };