import { GetChevalet, GetPackaging } from "@/sources/actions/admin/get-item.action";
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
        chevalet_de_table : data?.data[0] as itemType,
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