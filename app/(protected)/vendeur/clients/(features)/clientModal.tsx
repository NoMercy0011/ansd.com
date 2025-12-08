"use client"
import { CreateClient, DeleteClient, UpdateClient } from '@/sources/actions/admin/client.action';
import { Button, Input } from '@/sources/components/ui';
import { clientType, CommercialData } from '@/types/type';
import { AlertTriangle, Quote, X } from 'lucide-react';
import React, { useState } from 'react'

type ClientModalProps = {
    client: clientType | undefined;
    onClose: () => void;
    commerciaux: CommercialData[];
    isNew?: boolean;
    isEdit?:boolean;
    isDelete?:boolean;
    mutate: () => void;
}
export default function ClientModal({ client, onClose, mutate , commerciaux, isNew, isEdit, isDelete} : ClientModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<clientType> ({
        id_client: client?.id_client,
        commercial_id: client?.commercial_id,
        email: client?.email || '',
        media_social: client?.media_social || '',
        nif: client?.nif || '',
        nom_contact: client?.nom_contact || '',
        nom_societe: client?.nom_societe || '',
        rue: client?.rue || '',
        stat: client?.stat || '',
        status: client?.status || '',
        telephone_1: client?.telephone_1 || '',
        telephone_2: client?.telephone_2 ||'',
        ville: client?.ville || '',
    });
    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const handleSubmit = async (e : React.FormEvent) => { 
        e.preventDefault();
        setIsLoading(true);
        try{    
            if(isEdit){
                await UpdateClient(formData);
            }
            if(isNew){
                await CreateClient(formData);
            }

        }catch(err){
            console.log(err);
        }finally{
            mutate();
            setIsLoading(false);
            onClose();

        }
    };

    const handleDelete = async (id : number) => {
        setIsLoading(true);
        try{
        await DeleteClient(id);
        }finally{
            mutate();
            setIsLoading(false);
            onClose();
        }
    }

    return (
        <>
        { isDelete ?
        (<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
                <div className="bg-white text-lg text-center justify-center dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 m-4 transform animate-slide-up" onClick={e => e.stopPropagation()}>
                    <AlertTriangle className='text-red-500 animate-pulse w-15 h-15 m-auto'/> 
                    <div className=' text-xl font-bold space-x-0.5 justify-center'> 
                        Voulez-vous Supprimer 
                        <div className='flex justify-center text-red-500'>
                        <Quote className='w-5 h-5 rotate-y-180 '/> 
                            <div className='my-2 text-2xl'> { client?.nom_societe}</div> 
                        <Quote className='w-5 h-5 '/> 
                        </div>
                        de votre client ? 
                    </div>
                <div>
                    <div className="flex justify-center space-x-3 pt-4 border-slate-200 dark:border-slate-700 mt-6">
                    <Button type="button" variant="secondary" onClick={onClose} isDisabled={isLoading} >
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isLoading} onClick={() => handleDelete(Number(client?.id_client))}>
                        Supprimer
                    </Button>
                </div>
                </div>
                </div>
        </div>) : (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-3xl p-6 m-4 transform animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {client ? "Modifier la fiche client" : "Ajouter un nouveau client"}
                    </h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100 transition-colors">
                        <X size={20}/>
                        </button>
                    </div>
                <form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-600 dark:text-slate-300 border-b pb-2 border-slate-200 dark:border-slate-700">Identité & Commercial</h4>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Nom de la société
                            </label>
                            <Input name="nom_societe" value={formData?.nom_societe } onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Nom du contact
                            </label>
                            <Input name="nom_contact" value={formData?.nom_contact } onChange={handleChange} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Nom Facebook / Social
                            </label>
                            <Input name="media_social" value={formData?.media_social } onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Commercial Assigné
                            </label>
                            <select name="commercial_id" value={formData?.commercial_id} onChange={handleChange}
                            className={`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors appearance-none bg-no-repeat bg-right pr-8 `} style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}
                            >
                                <option value="">-- Aucun --</option>
                                {commerciaux.map(c => <option key={c.id_commercial} value={c.id_commercial}>{c.nom} {c.prenom}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-600 dark:text-slate-300 border-b pb-2 border-slate-200 dark:border-slate-700">Coordonnées & Fiscalité</h4>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Email
                            </label>
                            <Input type="email" name="email" value={formData?.email } onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Téléphone 1
                                </label>
                                <Input name="telephone_1" value={formData?.telephone_1 } onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    Téléphone 2
                                </label>
                                <Input name="telephone_2" value={formData?.telephone_2 } onChange={handleChange} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    NIF
                                </label>
                                <Input name="nif" value={formData?.nif} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                    STAT
                                </label>
                                <Input name="stat" value={formData?.stat } onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Adresse (Rue, Ville)
                            </label>
                            <div className="flex gap-4">
                                <Input name="rue" value={formData?.rue} onChange={handleChange} placeholder="Rue" />
                                <Input name="ville" value={formData?.ville} onChange={handleChange} placeholder="Ville" required />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
                    <Button type="button" variant="secondary" onClick={onClose} isDisabled={isLoading} >
                        Annuler
                    </Button>
                    <Button type="submit" variant="primary" isLoading={isLoading}>
                        Enregistrer
                    </Button>
                </div>
                </form>
            </div>
            
        </div>
        )}
        </>
        
        
    );
}
