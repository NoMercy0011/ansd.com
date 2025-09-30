
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
  devis_livre?: devisLivreData[];
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