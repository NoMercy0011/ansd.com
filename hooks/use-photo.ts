'use client';

import { useState, useEffect } from 'react';

// ========== TYPES ==========
export interface PhotosSize {
  id: number;
  taille?: string;
  dimension?: string;
  prix?: number;
}

export interface PhotosMatiere {
  id: number;
  matiere: string;
  grammage?: string[];
  prix?: number;
}

export interface PhotosFinition {
  id: number;
  finition: string;
  prix?: number;
}

export interface PhotosParticularite {
  id: number;
  particularite?: string;
  prix?: number;
}

export interface PhotosFace {
  id: number;
  face: string;
  prix?: number;
}

export interface PhotosReliure {
  id: number;
  reliure?: string;
  prix?: number;
}

export interface PhotosCouverture {
  id: number;
  couverture?: string;
  prix?: number;
}

export interface PhotosDimension {
  id: number;
  dimension?: string;
  prix?: number;
}

export interface PhotosProduct {
  meta: {
    id: number;
    type: string;
    nom: string;
  };
  id?: number;
  type?: string;
  dimension?: PhotosDimension[];
  matieres?: PhotosMatiere[];
  couvertures?: PhotosCouverture[];
  reliures?: PhotosReliure[];
  particularites?: PhotosParticularite[];
}

export interface UsePhotosReturn {
  tirage_photo: PhotosProduct;
  cadre_photo: PhotosProduct;
  photobook: PhotosProduct;
  photosLoading: boolean;
  photosError: Error | null;
}

// ========== DONNÉES COMPLÈTES ==========
const PhotosDataByType = {
  tirage_photo: {
    meta: { id: 1, type: 'tirage_photo', nom: 'Tirage photo' },
    tailles: [
      { id: 1, taille: 'A6', prix: 0 },
      { id: 2, taille: 'A5', prix: 500 },
      { id: 3, taille: 'A4', prix: 1000 },
      { id: 4, taille: 'A3', prix: 1500 },
      { id: 5, taille: 'A2', prix: 2000 },
      { id: 6, taille: 'A1', prix: 2500 },
      { id: 7, taille: 'A0', prix: 3000 }
    ],
    matieres: [
      { id: 1, matiere: 'Photo brillant', prix: 0 },
      { id: 2, matiere: 'Photo mat', prix: 500 }
    ],
    particularites: [
      { id: 1, particularite: 'Standard', prix: 0 },
      { id: 2, particularite: 'autres', prix: 0 }
    ]
  },

  cadre_photo: {
    meta: { id: 2, type: 'cadre_photo', nom: 'Cadre photo' },
    tailles: [
      { id: 1, taille: 'A6', prix: 0 },
      { id: 2, taille: 'A5', prix: 500 },
      { id: 3, taille: 'A4', prix: 1000 },
      { id: 4, taille: 'A3', prix: 1500 },
      { id: 5, taille: 'A2', prix: 2000 },
      { id: 6, taille: 'A1', prix: 2500 },
      { id: 7, taille: 'A0', prix: 3000 }
    ],
    matieres: [
      { id: 1, matiere: 'Plastique', prix: 0 },
      { id: 2, matiere: 'Bois', prix: 1500 }
    ],
    particularites: [
      { id: 1, particularite: 'Standard', prix: 0 },
      { id: 2, particularite: 'autres', prix: 0 }
    ]
  },

  photobook: {
    meta: { id: 3, type: 'photobook', nom: 'Photobook' },
    tailles: [
      { id: 1, taille: 'A6', prix: 0 },
      { id: 2, taille: '9x9cm', prix: 500 },
      { id: 3, taille: 'A5', prix: 1000 },
      { id: 4, taille: '14x14cm', prix: 1500 },
      { id: 5, taille: 'A4', prix: 2000 },
      { id: 6, taille: 'A3', prix: 3000 },
      { id: 7, taille: 'autres', prix: 0 }
    ],
    matieres: [
      { id: 1, matiere: 'PCB', grammage: ['170G', '250G', '300G', '350G', '600G', '700G'] },
      { id: 7, matiere: 'PCB pelliculé', grammage: ['170G', '250G', '300G', '350G', '600G', '700G']  },
      { id: 13, matiere: 'Glossy', grammage: ['250G', '300G']  },
      { id: 15, matiere: 'autres', prix: 0 }
    ],
    type_couvertures: [
      { id: 1, type_couverture: 'Couverture rigide simple', prix: 0 }
    ],
    type_reliure: [
      { id: 1, type_reliure: 'Reliure spirale', prix: 2000 },
      { id: 2, type_reliure: 'Reliure collée', prix: 1500 },
      { id: 3, type_reliure: 'Reliure agrafée', prix: 1000 }
    ],
    nb_pages: [
      { id: 1, nb_pages: '20 pages', prix: 0 },
      { id: 2, nb_pages: '30 pages', prix: 500 },
      { id: 3, nb_pages: '40 pages', prix: 1000 },
      { id: 4, nb_pages: '50 pages', prix: 1500 },
      { id: 5, nb_pages: '60 pages', prix: 2000 },
      { id: 6, nb_pages: '80 pages', prix: 2500 },
      { id: 7, nb_pages: '100 pages', prix: 3000 }
    ]
  }
};




// ========== HOOK PRINCIPAL ==========
export const usePhotos = (): UsePhotosReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Enrichir les données avec métadonnées
    //   const enrichProduct = ({...product}): PhotosProduct => {
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
    tirage_photo: PhotosDataByType.tirage_photo,
    cadre_photo: PhotosDataByType.cadre_photo,
    photobook: PhotosDataByType.photobook,
    photosLoading: loading,
    photosError: error
  };
};

export { PhotosDataByType };