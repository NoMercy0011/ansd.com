"use client"
import { GetClientID, GetClients } from '@/sources/actions/admin/client.action';
import { GetCommerciaux } from '@/sources/actions/admin/commercial.action';
import { clientType, CommercialData } from '@/sources/types/type';
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
