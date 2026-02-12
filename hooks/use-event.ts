'use client';

import { useState, useEffect } from 'react';

// ========== TYPES ==========
export interface EventsSize {
  id: number;
  taille?: string;
  dimension?: string;
  prix?: number;
}

export interface EventsMatiere {
  id: number;
  matiere: string;
  prix?: number;
}

export interface EventsFinition {
  id: number;
  finition: string;
  prix?: number;
}

export interface EventsParticularite {
  id: number;
  particularite?: string;
  prix?: number;
}

export interface EventsFace {
  id: number;
  face: string;
  prix?: number;
}

export interface EventsEmplacement {
  id: number;
  emplacement: string;
  prix?: number;
}

export interface EventsTechnologie {
  id: number;
  technologie: string;
  prix?: number;
}

export interface EventsCouleur {
  id: number;
  couleur: string;
  prix?: number;
}

export interface EventsProduct {
  meta: {
    id: number;
    type: string;
    nom: string;
  };
  id?: number;
  type?: string;
  tailles?: EventsSize[];
  matieres?: EventsMatiere[];
  emplacements?: EventsEmplacement[];
  finitions?: EventsFinition[];
  faces?: EventsFace[];
  couleurs?: EventsCouleur[];
  particularites?: EventsParticularite[];
  technologies?: EventsTechnologie[];
}

export interface UseEventssReturn {
  enveloppe: EventsProduct;
  cordon_tour_de_cou_badge: EventsProduct;
  bracelet_evenementiel: EventsProduct;
  cheque_cadeau: EventsProduct;
  carte_de_voeux: EventsProduct;
  photocall: EventsProduct;
  photobooth: EventsProduct;
  affiche: EventsProduct;
  pochette_a_rabat: EventsProduct;
  fanion: EventsProduct;
  badge_carte_membres: EventsProduct;
  billet_evenementiel: EventsProduct;
  eventsLoading: boolean;
  eventsError: Error | null;
}

// ========== DONNÉES COMPLÈTES ==========
const EventsDataByType = {
  enveloppe: {
    meta: { id: 1, type: 'enveloppe', nom: 'Enveloppe' },
    tailles: [
      { id: 1, taille: 'C4', prix: 0 },
      { id: 2, taille: 'C5', prix: 0 },
      { id: 3, taille: 'DL', prix: 0 },
      { id: 4, taille: 'autres', prix: 0 }
    ],
    matieres: [
      { id: 1, matiere: 'Papier standard', prix: 0 },
      { id: 2, matiere: 'Invitation PCB', prix: 500 }
    ],
    faces: [
      { id: 1, face: 'Recto', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Avec fenêtre', prix: 1000 },
      { id: 2, finition: 'Sans fenêtre', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 },
      { id: 2, couleur: 'Mono', prix: -500 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 }
    ]
  },

  cordon_tour_de_cou_badge: {
    meta: { id: 2, type: 'cordon_tour_de_cou_badge', nom: 'Cordon tour de cou badge' },
    dimensions: [
      { id: 1, dimension: '10 mm', prix: 0 },
      /*{ id: 2, dimension: '15 mm', prix: 500 },
      { id: 3, dimension: '20 mm', prix: 1000 },*/
      { id: 4, dimension: '25 mm', prix: 1500 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Corps', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Personnalisé', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Avec robot (auto découpe)', prix: 2000 },
      { id: 2, finition: 'Sans robot', prix: 0 }
    ],
    technologies: [
      { id: 1, technologie: 'DTF', prix: 3000 },
      { id: 2, technologie: 'Sublimation', prix: 3500 }
    ]
  },

  bracelet_evenementiel: {
    meta: { id: 3, type: 'bracelet_evenementiel', nom: 'Bracelet événementiel' },
    tailles: [
      { id: 1, taille: '19 mm', prix: 0 },
      { id: 2, taille: '25 mm', prix: 500 }
    ],
    matieres: [
      { id: 1, matiere: 'Tissus', prix: 0 },
      { id: 2, matiere: 'Plastique', prix: 500 },
      { id: 3, matiere: 'Papier indéchirable', prix: 1000 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Surface', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Plusieurs', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Imprimés', prix: 0 },
      { id: 2, finition: 'UV DTF', prix: 2000 }
    ],
    technologies: [
      { id: 1, technologie: 'DTF', prix: 3000 },
      { id: 2, technologie: 'Ecosolvant', prix: 2500 }
    ]
  },

  cheque_cadeau: {
    meta: { id: 4, type: 'cheque_cadeau', nom: 'Chèques cadeaux' },
    matieres: [
      { id: 1, matiere: 'Papier épais', prix: 0 },
      { id: 2, matiere: 'PVC', prix: 1500 }
    ],
    dimensions: [
      { id: 1, dimension: 'Variable', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'R', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Sur mesure', prix: 2000 }
    ]
  },

  carte_de_voeux: {
    meta: { id: 5, type: 'carte_de_voeux', nom: 'Carte de vœux' },
    tailles: [
      { id: 1, taille: 'A6', prix: 0 },
      { id: 2, taille: 'A5', prix: 0 },
      { id: 3, taille: 'DL', prix: 0 },
      { id: 4, taille: 'autres', prix: 0 }
    ],
    matieres: [
      { id: 1, matiere: 'Cartonné pelliculé', prix: 0 },
      { id: 2, matiere: 'Papier luxe', prix: 500 },
      { id: 3, matiere: 'PCB', prix: 500 },
      { id: 4, matiere: 'Papier Glossy', prix: 500 },
      { id: 5, matiere: 'Papier texturé', prix: 1000 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Recto', prix: 0 },
      { id: 2, emplacement: 'Verso', prix: 1000 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Finitions spéciales', prix: 1500 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 }
    ]
  },

  photocall: {
    meta: { id: 6, type: 'photocall', nom: 'Photocall' },
    matieres: [
      { id: 1, matiere: 'Support rigide PVC', prix: 0 },
      { id: 2, matiere: 'Bâche', prix: 1000 }
    ],
    dimensions: [
      { id: 1, dimension: 'Variable', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Surface entière', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Utilisé en photocall', prix: 0 }
    ]
  },

  photobooth: {
    meta: { id: 7, type: 'photobooth', nom: 'Photobooth' },
    matieres: [
      { id: 1, matiere: 'PVC', prix: 0 },
      { id: 2, matiere: 'PLEXI', prix: 1500 }
    ],
    dimensions: [
      { id: 1, dimension: 'Variable', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Surface entière', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Découpe personnalisée', prix: 1000 }
    ]
  },

  affiche: {
    meta: { id: 8, type: 'affiche', nom: 'Affiches' },
    tailles: [
      { id: 1, taille: 'A4', prix: 0 },
      { id: 2, taille: 'A3', prix: 500 },
      { id: 3, taille: 'A2', prix: 1000 },
      { id: 4, taille: 'A1', prix: 1500 },
      { id: 5, taille: 'A0', prix: 2000 }
    ],
    matieres: [
      { id: 1, matiere: 'Papier couché', prix: 0 },
      { id: 2, matiere: 'Papier sans finition', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'R', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Usage intérieur', prix: 0 },
      { id: 2, finition: 'Usage extérieur', prix: 1500 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 }
    ]
  },

  pochette_a_rabat: {
    meta: { id: 9, type: 'pochette_a_rabat', nom: 'Pochette à rabat' },
    tailles: [
      { id: 1, taille: 'A4', prix: 0 },
      { id: 2, taille: 'A5', prix: 0 }
    ],
    matieres: [
      { id: 1, matiere: 'PCB', prix: 0 },
      { id: 2, matiere: 'PCB pelliculé', prix: 500 },
      { id: 3, matiere: 'Glossy', prix: 500 },
      { id: 4, matiere: 'Glossy pelliculé', prix: 1000 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Recto', prix: 0 },
      { id: 2, emplacement: 'Verso', prix: 1000 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 }
    ]
  },

  fanion: {
    meta: { id: 10, type: 'fanion', nom: 'Fanion' },
    matieres: [
      { id: 1, matiere: 'Textile', prix: 0 },
      { id: 2, matiere: 'Plastique', prix: 500 },
      { id: 3, matiere: 'Papier', prix: 500 }
    ],
    dimensions: [
      { id: 1, dimension: 'Variable', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Surface entière', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Forme personnalisée', prix: 1500 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 },
      { id: 3, technologie: 'Ecosolvant', prix: 2500 }
    ]
  },

  badge_carte_membres: {
    meta: { id: 11, type: 'badge_carte_membres', nom: 'Badge carte membres' },
    tailles: [
      { id: 1, taille: 'Carte de visite', prix: 0 },
      { id: 2, taille: 'A6', prix: 0 },
      { id: 3, taille: 'autres', prix: 0 }
    ],
    matieres: [
      { id: 1, matiere: 'PVC', prix: 0 },
      { id: 2, matiere: 'Papier', prix: 0 },
      { id: 3, matiere: 'Papier pelliculé', prix: 500 },
      { id: 4, matiere: 'Papier plastifié', prix: 500 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Recto', prix: 0 },
      { id: 2, emplacement: 'Verso', prix: 1000 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    accessoires: [
      { id: 1, accessoire: 'Avec cordon personnalisé', prix: 1500 },
      { id: 2, accessoire: 'Avec porte badge importé', prix: 2000 },
      { id: 3, accessoire: 'Sans accessoire', prix: 0 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 }
    ]
  },

  billet_evenementiel: {
    meta: { id: 12, type: 'billet_evenementiel', nom: 'Billet événementiel' },
    matieres: [
      { id: 1, matiere: 'PCB', prix: 0 },
      { id: 2, matiere: 'PCB pelliculé', prix: 500 },
      { id: 3, matiere: 'Glossy', prix: 500 },
      { id: 4, matiere: 'Glossy pelliculé', prix: 1000 }
    ],
    dimensions: [
      { id: 1, dimension: 'Variable', prix: 0 }
    ],
    emplacements: [
      { id: 1, emplacement: 'Recto/Verso', prix: 0 }
    ],
    couleurs: [
      { id: 1, couleur: 'Quadri', prix: 0 }
    ],
    finitions: [
      { id: 1, finition: 'Avec souches', prix: 1000 },
      { id: 2, finition: 'Sans souches', prix: 0 }
    ],
    technologies: [
      { id: 1, technologie: 'Laser', prix: 0 },
      { id: 2, technologie: 'Jet d\'encre', prix: 0 }
    ]
  }
};




// ========== HOOK PRINCIPAL ==========
export const useEvents = (): UseEventssReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Enrichir les données avec métadonnées
    //   const enrichProduct = ({...product}): EventsProduct => {
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
    enveloppe: EventsDataByType.enveloppe,
    cordon_tour_de_cou_badge: EventsDataByType.cordon_tour_de_cou_badge,
    bracelet_evenementiel: EventsDataByType.bracelet_evenementiel,
    cheque_cadeau: EventsDataByType.cheque_cadeau,
    carte_de_voeux: EventsDataByType.carte_de_voeux,
    photocall: EventsDataByType.photocall,
    photobooth: EventsDataByType.photobooth,
    affiche: EventsDataByType.affiche,
    pochette_a_rabat: EventsDataByType.pochette_a_rabat,
    fanion: EventsDataByType.fanion,
    badge_carte_membres: EventsDataByType.badge_carte_membres,
    billet_evenementiel: EventsDataByType.billet_evenementiel,
    eventsLoading: loading,
    eventsError: error
  };
};

export { EventsDataByType };