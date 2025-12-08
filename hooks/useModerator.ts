"use client"

import { GetClientID, GetClients } from '@/sources/actions/admin/client.action';
import { GetCommerciaux } from '@/sources/actions/admin/commercial.action';
import { GetDocument } from '@/sources/actions/admin/document.action';
import { GetLivre } from '@/sources/actions/admin/livre.action';
import { GetPackaging } from '@/sources/actions/admin/packaging.action';
import { itemType } from '@/types/packaging/packagingType';
import { clientType, CommercialData, DocumentType, LivreType } from '@/types/type';
import useSWR from 'swr';


export function useCommercial() {
    const { data, isLoading, error, mutate} = useSWR('get-commerciaux', GetCommerciaux);

    return {
        Commerciaux : data?.data as CommercialData[],
        CommerciauxLoading: isLoading,
        CommerciauxError: error,
        mutate
    }
} 


export function useClient() {
    const { data, isLoading, error, mutate} = useSWR('get-clients', GetClients);

    return {
        Clients : data?.data as clientType[],
        ClientsLoading: isLoading,
        ClientsError: error,
        mutate
    }
} 

export function useClientID() {
    const { data, isLoading, error, mutate} = useSWR('get-client-id', GetClientID);

    return {
        client: data?.data as clientType,
        clientLoading: isLoading,
        clientError: error,
        mutate
    }
} 

export function useLivre() {
    const { data, isLoading, error, mutate} = useSWR('get-livre', GetLivre);

    return {
        livre: data?.data as LivreType,
        livreLoading: isLoading,
        livreError: error,
        mutate
    }
} 

export function useDocument() {
    const { data, isLoading, error, mutate} = useSWR('get-document', GetDocument);

    return {
        proformas: data?.proformas as DocumentType[],
        factures: data?.factures as DocumentType[],
        documentLoading: isLoading,
        documentError: error,
        mutate
    }
}

export function usePackaging() {
    const { data , isLoading, error, mutate} = useSWR( 'get-packaging', GetPackaging);
    return {
        hangtag : data?.data[0] as itemType,
        etiquette: data?.data[1] as itemType,
        boite: data?.data[2] as itemType,
        doypack: data?.data[3] as itemType,
        sac_papier: data?.data[4] as itemType,
        packagingLoading: isLoading,
        packagingError: error,
        mutate,
    }
}