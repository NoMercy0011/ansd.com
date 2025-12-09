
export type catalogueType = {
    id: number;
    catalogue: string;
    code: string;
}

export type dimensionType = {
    id:number;
    dimension: string;
    ratio: number;
}

export type couleurType = {
    id:number;
    couleur: string;
} 

export type emplacementType = {
    id:number;
    emplacement: string;
} 

export type finitionType = {
    id:number;
    finition: string;
} 

export type imprimanteType = {
    id: number;
    imprimante: string;

}

export type particulariteType = {
    id: number;
    particularite: string;
}

export type faceType = {
    id: number;
    face: string;
    code: string;
}

export type decoupeType = {
    id: number;
    decoupe: string;
    prix:string;
}

export type socleType = {
    id: number;
    socle: string;
}

export type orientationType = {
    id: number;
    orientation: string;
}

export type matiereType = {
    id: number;
    type: string;
    details: string;
    longueur: string;
    largeur: string;
    caracteristiques: string;
    taille: string;
    rendement: string;
    par: string;
    prix_unitaire: string;
    unitee: string;
}

export type itemType = {
  id: number;
  type: string;
  code: string;
  catalogue?: catalogueType;
  dimensions?: dimensionType[];
  decoupes?: decoupeType[];
  matieres?: matiereType[];
  couleurs?: couleurType [];
  emplacements?: emplacementType[];
  finitions?: finitionType[];
  imprimantes?: imprimanteType[];
  particularites?: particulariteType[];
  faces?: faceType[];
  socles?: socleType[];
  orientations?: orientationType[];
}
