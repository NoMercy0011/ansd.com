
export type userLoginType = {
  pseudo : string;
  password : string;
  header: string;
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

export type EnseignantType = {
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

export type MatiereProps = {
  message ?: string | null;
  classeSelected? : string | null;
  dataEnseignement: EnseignementType[]
}

export type EnseignementType = {
  id_enseignement ?: number | null;
  classe?: number | null;
  matiere?: number | null;
  enseignant?: number | null;
  coefficient?: number | null;
  chef_etablissement?: number | null;
  date_creation?: Date | null;
  modificateur?: number | null;
  dernier_modification?: Date | null;
  annee_scolaire?: number | null;
  date_suppresseur?: Date | null;
  suppresseur ?: number | null;
  status ?: string | null;
  horaire?: string | null;
}

export type EnseignementProps = {
  dataClasse ?: classeType[];
  dataEnseignement ?: EnseignementType[];
  dataMatiere ?: MatiereType[];
  dataEnseignant ?: EnseignantType[];
  selectedClasse ?: string | null;
}

export type MatiereType = {
  id_matiere : number | null;
  matiere ?: string | null;
}

export type NiveauType = {
  id_niveau : number;
  niveau: string;
  created_at: string;
  updated_at: string;
}[]