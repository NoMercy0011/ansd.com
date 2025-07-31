"use client"
import { ReadClasse } from '@/src/actions/moderator/crud.classe.action';
import { ReadEnseignant } from '@/src/actions/moderator/crud.enseignant.action';
import { ReadEtudiant } from '@/src/actions/moderator/crud.etudiant.action';
import { ReadMatiere } from '@/src/actions/moderator/crud.matiere.action';
import { ReadSection } from '@/src/actions/moderator/crud.section.action';
import { ReadNiveau } from '@/src/actions/moderator/niveau.action';
import useSWR, { mutate } from 'swr';


export function useClasse() {
    const { data, isLoading, error, mutate} = useSWR('get-classes', ReadClasse);

    return {
        classes : data?.data,
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
        sections : data?.sections,
        sectionsLoading: isLoading,
        sectionsError: error,
        mutate
    }
} 

export function useEnseignant() {
    const { data, isLoading, error, mutate} = useSWR('get-enseignants', ReadEnseignant);

    return {
        actifs : data?.enseignantsActive,
        onLine : data?.enseignantsOnLine,
        quittes : data?.enseignantsQuitte,
        enseignantsLoading: isLoading,
        enseignantsError: error,
        mutate
    }
}

export function useMatiere() {
    const { data, isLoading, error, mutate} = useSWR('get-matieres', ReadMatiere);

    return {
        matieres : data?.data,
        sectionsLoading: isLoading,
        sectionsError: error,
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