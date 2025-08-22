import { GetCommerciaux } from '@/sources/actions/admin/commercial.action';

export type userLoginType = {
  pseudo: string;
  password : string;
  header?: string;
}

export type responseType = {
  success : boolean;
  error?: string;
  message?: string;
  redirectTo?: string;
}

export type userRegisterType = {
  etablissement : string;
  contact: string;
  schoolEmail: string;
  nom : string;
  prenom : string; 
  email : string;
  sexe : string;
  password : string;
  passwordConfirm : string;
  photo? : string;
  cisco?: string;
  dren?: string;
}

export type tokenType = {
  id: string;
  email: string;
  nom: string;
  prenom : string;
  role : string;
}

export type userSchema = {
  id_user : number;
  email : string;
  password : string;
  nom: string;
  prenom : string;
  sexe : string;
  photo : string;
  role : string;
}

export type EnseignantData = {
    total : number;
    enseignants : EnseignantIdType[];
}

export type EnseignantIdType = {
  id_enseignant: number;
	pseudo: string;
	nom: string;
	prenom: string;
	email: string;
	sexe: string;
	section: string;
	role: string;
	date_naissance: Date;
	lieu_naissance: string;
	telephone: string;
	photo: string;
	salaire: string;
	status: string;
	date_entree: string;
}

export type CreateEnseignantType = {
    id_user: number;
    nom: string;
    prenom: string;
    pseudo: string;
    sexe: string;
    section: string;
    date_naissance: Date;
    lieu_naissance: string;
    telephone: string;
    password: string;
    role: string;
};

export type EnseignantModalProps = {
  isEditing?: boolean;
  isNew? : boolean;
  isDelete?: boolean;
  id_enseignant? : number;
  enseignant ?: {
      id_user: number;
      nom: string;
      prenom: string;
      email: string;
      sexe: string | null;
      date_naissance: string | null | Date;
      lieu_naissance: string | null;
      telephone: string | null ;
      password?: string;

  };
  onClose ?: () => void;
}




export type classeType = {
    id_classe?: number;
    classe?: string | null;
    niveau?: number | null;
    section?: number | null;
    responsable?: number | null;
    annee_scolaire?: number | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type classesData = {
    id_classe?: number;
    classe?: string | null;
    niveau?: {
      id_niveau: number | null;
      niveau: string | null;
    };
    section?: {
      id_section:number | null;
      section:string | null;
    };
    responsable?: {
      id_user: number | null;
      nom: string | null;
      prenom: string | null;
      sexe: string | null;
    };
    annee_scolaire?: {
      id_annee_scolaire: number | null;
      annee_scolaire: string | null;
    };
}



export type EnseignementData = {
  id_enseignement ?: number;
  classe_id?: number;
  matiere_id?: number;
  enseignant_id?: number;
  coefficient?: number;
  horaire?: string;
  cellule?: number;
  startTime?: string;
  endTime?: string;
}



export type EmploiDuTempsData = {
  id_enseignement: number;
	classe: {
		id_classe: number;
		classe: string;
	};
	matiere: {
		id_matiere: number;
		matiere: string;
		code: string;
	};
	enseignant: {
		id_user: number;
		nom: string;
		prenom: string;
		pseudo: string;
	};
	cellule: {
		creneau: number;
		jour: number;
	};
  coordonnee?: number;
  coefficient: number;
	horaire: string;
	startTime: string;
	endTime: string;
}


export type MatiereData = {
  id_matiere : number;
  matiere ?: string;
  code?: string;
  section?: string;
  section_id?: number;
}

export type NiveauType = {
  id_niveau : number;
  niveau: string;
  created_at: string;
  updated_at: string;
}[]

export type SectionData ={
  id_section: number;
  section: string;
  departement: string;
  cycle:string;
  description: string;
}

export type EtudiantData = {
  id_inscription: number;
  matricule: string;
  inscription: string;
  nom: string;
  prenom: string;
  sexe: string;
  date_naissance: string;
  lieu_naissance: string;
  domicile: string;
  nom_pere: string;
  nom_mere: string;
  telephone_parent: string;
  nom_tuteur: string;
  telephone_tuteur: string;
  status: string;
}

export type EtudiantClasseData= {
    id_classe: number;
		classe: string;
		section: {
			id_section: number;
			section: string;
		},
		niveau: {
			id_niveau: number;
			niveau: string;
		};
		etudiants: {
			total: number;
			etudiants: EtudiantData[];
		};
			responsable: {
			id_enseignant_active: number;
			nom: string;
			prenom: string;
			sexe: string;
		} 
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
  dimension_id: number;
  dimension?: string;
  papier_id: number;
  papier?: string;
  couleur_id: number;
  couleur: string;
  recto_verso_id: number;
  recto:string;
  pages: number;
  couverture_id: number;
  couverture?: string;
  reliure_id: number;
  finition_id: number;
  quantite: number;
  montant: string;
  client_id: number;
  user_id: number;
  imprimante_id: number;
  imprimante?: string;
}