"use client"
import { ReadClasse } from '@/src/actions/moderator/crud.classe.action';
import { ReadEnseignant } from '@/src/actions/moderator/crud.enseignant.action';
import { ReadCreneau, ReadEnseignement } from '@/src/actions/moderator/crud.enseignement.action';
import { ReadClasseId, ReadEtudiant, ReadEtudiantsParClasse } from '@/src/actions/moderator/crud.etudiant.action';
import { ReadMatiere } from '@/src/actions/moderator/crud.matiere.action';
import { ReadSection } from '@/src/actions/moderator/crud.section.action';
import { ReadNiveau } from '@/src/actions/moderator/niveau.action';
import { classesData, CreneauData, EmploiDuTempsData, EnseignantData, MatiereData, SectionData } from '@/src/types/type';
import useSWR, { mutate } from 'swr';


export function useClasse() {
    const { data, isLoading, error, mutate} = useSWR('get-classes', ReadClasse);

    return {
        classes : data?.data as classesData[],
        classesLoading: isLoading,
        classesError: error,
        mutate
    }
} 

export function useNiveau() {
    const { data, isLoading, error, mutate} = useSWR('get-niveaux', ReadNiveau);

    return {
        niveaux : data?.niveaux,
        niveauxLoading: isLoading,
        niveauxError: error,
        mutate
    }
} 

export function useSection() {
    const { data, isLoading, error, mutate} = useSWR('get-sections', ReadSection);

    return {
        sections : data?.sections as SectionData[],
        sectionsLoading: isLoading,
        sectionsError: error,
        mutate
    }
} 

export function useEnseignant() {
    const { data, isLoading, error, mutate} = useSWR('get-enseignants', ReadEnseignant);

    return {
        actifs : data?.enseignantsActive as EnseignantData,
        onLine : data?.enseignantsOnLine as EnseignantData,
        quittes : data?.enseignantsQuitte as EnseignantData,
        enseignantsLoading: isLoading,
        enseignantsError: error,
        mutate
    }
}

export function useMatiere() {
    const { data, isLoading, error, mutate} = useSWR('get-matieres', ReadMatiere);

    return {
        matieres : data?.data as MatiereData[],
        matieresLoading: isLoading,
        matieresError: error,
        mutate
    }
}

export function useEmploiDuTemps(){
    const { data, isLoading, error, mutate} = useSWR('get-emploi-du-temps', ReadEnseignement);

    return {
        emploiDuTemps : data?.data as EmploiDuTempsData[],
        emploiDuTempsLoading: isLoading,
        emploiDuTempsError: error,
        mutate
    }
}

export function useCreneau(){
    const { data, isLoading, error, mutate} = useSWR('get-classe-enseignement', ReadCreneau);

    return {
        creneaux : data?.data as CreneauData[],
        creneauxLoading: isLoading,
        creneauxError: error,
        mutate
    }
}

export function useEtudiant() {
    const { data, isLoading, error, mutate} = useSWR('get-etudiants', ReadEtudiant);

    return {
        etudiants : data?.data,
        etudiantsLoading: isLoading,
        etudiantsError: error,
        mutate
    }
}

export function useEtudiantsParClasse() {
    const { data, isLoading, error, mutate} = useSWR('get-etudiants-par-classe', ReadEtudiantsParClasse);

    return {
        etudiantsClasse : data?.data,
        etudiantsClasseLoading: isLoading,
        etudiantsClasseError: error,
        mutate
    }
}

export function useClasseId() {
    const { data, isLoading, error, mutate} = useSWR('get-etudiants-classe-id', ReadClasseId);

    return {
        etudiantsClasseId : data?.data,
        etudiantsClasseIdLoading: isLoading,
        etudiantsClasseIdError: error,
        mutate
    }
}