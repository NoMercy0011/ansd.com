
import { GetCalendar, GetCarterie, GetChevalet, GetPackaging } from "@/sources/actions/admin/get-item.action";
import { itemType } from "@/types/itemType";
import useSWR from "swr";

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


export function useChevalet() {
    const { data , isLoading, error, mutate} = useSWR( 'get-chevalet', GetChevalet);
    return {
        chevalet_de_table: data?.data[0] as itemType,
        roll_up_standard: data?.data[1] as itemType,
        roll_up_deluxe: data?.data[2] as itemType,
        x_banner: data?.data[3] as itemType,
        stop_trottoir: data?.data[4] as itemType,
        porte_flyers: data?.data[5] as itemType,
        porte_affiche: data?.data[6] as itemType,
        oriflamme: data?.data[7] as itemType,
        chevaletLoading: isLoading,
        chevaletError: error,
        mutate,
    }
}

export function useCalendar() {
    const { data , isLoading, error, mutate} = useSWR( 'get-calendar', GetCalendar);
    return {
        calendrier: data?.data[0] as itemType,
        marque_page: data?.data[1] as itemType,
        chevalet: data?.data[2] as itemType,
        calendarLoading: isLoading,
        calendarError: error,
        mutate,
    }
}

export function useCarterie() {
    const { data , isLoading, error, mutate} = useSWR( 'get-carterie', GetCarterie);
    return {
        visite: data?.data[0] as itemType,
        fidelite: data?.data[1] as itemType,
        jeux: data?.data[2] as itemType,
        carterieLoading: isLoading,
        carterieError: error,
        mutate,
    }
}