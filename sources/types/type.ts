
export type userLoginType = {
  pseudo: string;
  password : string;
  header?: string;
}

export type CommercialData = {
    id_commercial: number;
    nom: string;
    prenom: string;
    contact: string;
    adresse: string;
}

export type clientType = {
  id_client?: number;
  nom_societe?: string;
  nom_contact?: string;
  media_social?: string;
  commercial_id?: number;
  email?: string;
  telephone_1?: string;
  telephone_2?:string;
  nif?: string;
  stat?:string;
  rue?: string;
  ville?: string;
  status?:string;
}

export type LivreType = {
  livres: {
		id_livre: number;
		livre: string;
		img: string;
	}[];
  dimensions: {
    id_dimension: number;
    dimension: string;
    unitée: string;
    pose: string;
  }[];
  papiers:{
    categorie: string;
    accessoire: {
      accessoire: string;      
      id_papier: number;
      prix: string;
      categorie: string;
    }[];
  }[];
  couleurs: {
    id_couleur: number;
    couleur: string;
    code: string;
  }[];
  recto_verso: {
    id_recto: number;
    type: string;
    code: string;
  }[];
  imprimante: {
    id_imprimante: number;
    imprimante: string;
  }[];
  reliure:{
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
  }[];
  finition: {
    id_finition: number;
    finition: string;
    prix: number;
  }[];
}

export type devisLivreData = {
  livre_id: number;
  type?: string;
  dimension_id: number | null;
  dimension?: string;
  papier_id: number | null;
  papier?: string;
  couleur_id: number | string;
  couleur: string;
  recto_verso_id: number;
  recto:string;
  pages: number;
  couverture_id: number | null;
  couverture?: string;
  reliure_id: number | string;
  reliure?: string;
  reliurePrix?:string;
  finition_id: number | null;
  finition?: string;
  finitionPrix?: number;
  quantite: number;
  montant: string;
  client_id: number | null;
  user_id?: number | null;
  imprimante_id: number | null;
  imprimante?: string;
}

export type devisData = {
  livre_id?: number;
  type?: string;
  dimension_id?: number | null;
  dimension?: string;
  papier_id?: number | null;
  papier?: string;
  couleur_id?: number | string;
  couleur?: string;
  recto_verso_id?: number;
  recto?:string;
  pages?: number;
  couverture_id?: number | null;
  couverture?: string;
  reliure_id?: number | string;
  reliure?: string;
  reliurePrix?:string;
  finition_id?: number | null;
  materiau_id?: number;
  materiau?: string;
  packaging_id?: number;
  montant?: string;
  quantite?: number;
  option_id?: string;
  imprimante_id?: number;
  imprimante?: string;
  finition?: string;
  option?: string;
  optionPrix?: string;
  finitionPrix?: number;
  decoupe?: string;
  particularite?: string;
  emplacement_id?: number;
  emplacement?: string;
  client_id?: number;
  socle_id?: number;
  socle?: string;
  calendar_id?: number;
  support_id?: number;
  support?: string;
  orientation_id?: number;
  orientation?: string;
  face_id?: number;
  face?: string;
  forme_couture_id?: number;
  forme_couture?: string;
  particularite_id?: number;
  volet_id?: number;
  volet?: string;
  grammage_id?: number;
  grammage?: string;
  laize_id?: number;
  laize?: string;
  epaisseur_id?: number;
  epaisseur?: string;
  grand_format_id?: number;
  taille_id?: number;
  taille?: string;
  technologie_id?: number;
  technologie?: string;
  textile_id?: number;
  type_specifique_id?: number;
  type_specifique?: string;
  capacite_id?: number;
  capacite?: string;
  goodies_id?: number;
  forme?: string;
}

export type CartItemsType = {
    id: number;
    designation : string;
    quantite : number;
    prix_unitaire_ht : number;
    prixTotal?: string;
    remise : number;
    service: string;
    detail_description : string;
}

export type DocumentType = {
  document?: DocumentData;
  ligne_document?: CartItemsType[];
  devis_livre?: devisData[];
  client?: clientType;
}

export type DocumentData = {
  id_document?: number;
  client_id: number;
  numero_document?: string;
  type_document: string;
  date_emission?: string | Date;
  date_echeance?: string | Date;
  sous_total_ht: number;
  remise: number;
  montant_tax: number;
  total_ttc: number;
  status?: string;
  remarque?: string;
}

export type LigneDocument = {
  id_ligne_document: number;
  document_id: number;
  service: string;
  designantion: string;
  detail_description: string;
  quantite: number;
  prix_unitaire_ht: number;
}

export type devisPackagingData = {
  client_id: number;
  type: string;
  couleur_id: number;
  couleur: string;
  materiau_id: number;
  materiau: string;
  dimension_id: number;
  dimension: string;
  finition_id: number;
  packaging_id: number;
  montant: string;
  quantite: number;
  recto_verso_id: number;
  recto: string;
  option_id: string;
  imprimante_id: number;
  imprimante: string;
  finition: string;
  option: string;
  optionPrix: string;
  finitionPrix: number;
  decoupe: string;
  particularite: string;
  emplacement_id?: number;
  emplacement: string;
};

export type devisCalendarData = {
  client_id: number;
  type: string;
  materiau_id: number;
  materiau: string;
  dimension_id: number;
  dimension: string;
  socle_id: number;
  socle: string;
  calendar_id: number;
  montant: string;
  quantite: number;
  recto_verso_id: number;
  recto: string;
  imprimante_id: number;
  imprimante: string;
  particularite: string;
};

export type devisChevaletData = {
  client_id: number;
  type: string;
  dimension_id: number;
  dimension: string;
  support_id: number;
  support: string;
  papier_id?: number;
  papier?: string;
  orientation_id?: number;
  orientation?: string;
  face_id: number;
  face: string;
  forme_couture_id?: number;
  forme_couture?: string;
  particularite_id?: number;
  particularite?: string;
  chevalet_id: number;
  montant: string;
  quantite: number;
  optionPrix?: string;
};

export type devisFlyersData = {
  client_id: number;
  dimension_id: number;
  dimension: string;
  volet_id: number;
  volet: string;
  face_id: number;
  face: string;
  support_id: number;
  support: string;
  grammage_id: number;
  grammage: string;
  imprimante_id: number;
  imprimante: string;
  montant: string;
  quantite: number;
  finitionPrix?: number;
  optionPrix: string;
};

export type devisCarterieData = {
  client_id: number;
  type: string;
  dimension_id: number;
  dimension: string;
  forme_id: number;
  forme: string;
  support_id: number;
  support: string;
  face_id: number;
  face: string;
  imprimante_id: number;
  imprimante: string;
  carterie_id: number;
  montant: string;
  quantite: number;
  finitionPrix: number;
  optionPrix: string;
};

export type devisGrandFormatData = {
  client_id: number;
  type: string;
  laize_id: number;
  laize: string;
  face_id: number;
  face: string;
  finition_id: number;
  finition: string;
  particularite_id: number;
  particularite: string;
  epaisseur_id: number;
  epaisseur: string;
  couleur_id: number;
  couleur: string;
  grand_format_id: number;
  montant: string;
  quantite: number;
  finitionPrix: number;
  optionPrix: string;
};

export type devisTextileData = {
  client_id: number;
  type: string;
  taille_id: number;
  taille: string;
  grammage_id: number;
  grammage: string;
  dimension_id: number;
  dimension: string;
  emplacement_id: number;
  emplacement: string;
  technologie_id: number;
  technologie: string;
  couleur_id: number;
  couleur: string;
  textile_id: number;
  montant: string;
  quantite: number;
  finitionPrix: number;
  optionPrix: string;
};

export type devisGoodiesData = {
  client_id: number;
  type: string;
  type_specifique_id: number;
  type_specifique: string;
  capacite_id: number;
  capacite: string;
  emplacement_id: number;
  emplacement: string;
  technologie_id: number;
  technologie: string;
  goodies_id: number;
  montant: string;
  quantite: number;
  finitionPrix: number;
  optionPrix: string;
};