
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

export type EnseignantListProps = {
  success ?: boolean;
  message?: string;
  isAdd?: boolean;
  isUpdate?: boolean;
  data ?: ({
    user_enseignant_enseignantTouser: {
        id_user: number;
        email: string;
        nom: string;
        prenom: string;
        sexe: string | null;
        date_naissance: Date | null;
        lieu_naissance: string | null;
        telephone: string | null;
    };
  })[];
}

export type ClasseProps = {
  success?: boolean;
  message?: string;
  data?: ({
    id_classe: number;
    classe: string | null | undefined ;
    niveau: number | null ;
    responsable: number | null ;
    etablissement: number | null ;
    chef_etablissement: number  | null;
    date_creation: Date | null ;
    modificateur: number | null ;
    dernier_modification: Date | null ;
  })[]
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

export type MatiereProps = {
  message ?: string | null;
  classeSelected? : string | null;
  dataEnseignement: EnseignementData[]
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

export type EnseignementProps = {
  dataClasse ?: classeType[];
  dataEnseignement ?: EnseignementData[];
  dataMatiere ?: MatiereData[];
  dataEnseignant ?: EnseignantData[];
  selectedClasse ?: string | null;
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

export type CreneauData = {
  id_classe: number;
  classe: string;
	id_niveau: number;
	id_section: number;
	enseignements: number;
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

export type InscriptionData = {
    nom: string;
    prenom: string;
    date_naissance: string;
    lieu_naissance: string;
    sexe: string;
    domicile: string;
    nom_pere: string;
    nom_mere: string;
    telephone_parent: string;
    nom_tuteur: string;
    telephone_tuteur: string;
    telephone_urgence: string;
    matricule: string;
    classe_id: number;
    inscription: string;
    date_entree: string;
    annee_scolaire_id: string;
    ecole_precedente: string;
    sortie_ecole_precedente: string;
    raison_admission: string;
    statut: string;
}