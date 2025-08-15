"use client"
import { useClient, useCommercial } from '@/hooks/useModerator';
import { Button, Input } from '@/sources/components/ui';
import { clientType } from '@/sources/types/type';
import { Clock, Edit, Eye, PlusCircle, RectangleHorizontalIcon, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import ClientModal from './clientModal';

const initClient: clientType = {
    id_client: 0,
    commercial_id: 0,
    email:'',
    media_social:'',
    nif:'',
    nom_contact:'',
    nom_societe:'',
    rue:'',
    stat:'',
    status:'',
    telephone_1:'',
    telephone_2:'',
    ville:'',
}

export default function ClientsPage({userRole} : {userRole : string | undefined}) {

      const { Commerciaux, CommerciauxLoading } = useCommercial();
      const { Clients, ClientsLoading, mutate } = useClient();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [editingClient, setEditingClient] = useState<clientType> ();
      const [searchTerm, setSearchTerm] = useState('');
      const[isNew, setIsNew] = useState(false);
      const[isEdit, setIsEdit] = useState(false);
      const[isDelete, setIsDelete] = useState(false);

      const closeModal = () => { 
        setEditingClient({
            ...editingClient, ...initClient
        }); setIsModalOpen(false); 
      };
      const handleNew = () => {
        setIsEdit(false);
        setIsDelete(false);
        setIsNew(true);
        setIsModalOpen(true); 
      }
      
      const handleEdit = (client : clientType) => {
        setIsEdit(true);
        setIsDelete(false);
        setIsNew(false);
        setEditingClient({...client}); 
        setIsModalOpen(true); 
      }

      const handleOpenDetail = () => {

      }

      const handleDelete = (client : clientType) => {
        setIsDelete(true);
        setIsEdit(false);
        setIsNew(false);
        setEditingClient({...client}); 
        setIsModalOpen(true); 
    };

const SectionTitle = ({ title, subtitle }: { title: string, subtitle:string }) => 
    ( <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
        </h1>
            {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">{subtitle}</p>}
       </div> 
    );
  

  
      return (
          <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <SectionTitle title="Clients" subtitle="Gérez votre base de données clients." />
                <Button variant="primary" icon={<PlusCircle />} onClick={handleNew}>
                    Ajouter un client
                </Button>
              </div>

              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border dark:border-slate-700 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="relative">
                      <Input type="text" placeholder="Rechercher un client par nom ou contact..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10"/>
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                  </div>
                  <div>
                    <select className={`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors appearance-none bg-no-repeat bg-right pr-8 ${''}`} style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, 
                            backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em'}}>
                        <option value="all">Tous les commerciaux</option>
                        { CommerciauxLoading ? <option value=""> chargement...</option> :
                            (Commerciaux.map(c => 
                                (<option key={c.id_commercial} value={c.id_commercial}>
                                    {c.nom}{c.prenom}
                                </option>)))
                        }
                    </select>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full min-w-max">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Société</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Contact</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">NIF / STAT</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Commandes</th>
                            {userRole === 'admin' && <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Total Achats (Ar)</th>}
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Statut</th>
                            <th className="p-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {ClientsLoading ? 
                        ( <> 
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-2'> &nbsp; </span>                        
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>
                                
                            </td>
                            <td className="p-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-mono">
                                <div> <div className='w-full bg-slate-400 rounded-2xl h-2 mb-1 animate-pulse'> &nbsp;</div> <div className='w-full bg-slate-400 rounded-2xl h-2 mt-1 animate-pulse'> &nbsp; </div> </div>
                                
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 text-center">
                                <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>
                            </td>
                                {userRole === 'admin' && <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>
                            </td>}
                            <td className="p-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300` /*${statusInfo.style}*/} >
                                    &nbsp;</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-1">
                                    <div className='w-full bg-slate-400 animate-pulse'>  &nbsp; </div>
                                    <div className='w-full bg-slate-400 animate-pulse'>  &nbsp; </div>
                                    <div className='w-full bg-slate-400 animate-pulse'>  &nbsp; </div>
                                </div>
                            </td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-2'> &nbsp; </span>                        
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>
                                
                            </td>
                            <td className="p-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-mono">
                                <div> <div className='w-full bg-slate-400 rounded-2xl h-2 mb-1 animate-pulse'> &nbsp;</div> <div className='w-full bg-slate-400 rounded-2xl h-2 mt-1 animate-pulse'> &nbsp; </div> </div>
                                
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 text-center">
                                <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>
                            </td>
                                {userRole === 'admin' && <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    <span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>
                            </td>}
                            <td className="p-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300` /*${statusInfo.style}*/} >
                                    &nbsp;</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-1">
                                    <div className='w-full bg-slate-400 animate-pulse'>  &nbsp; </div>
                                    <div className='w-full bg-slate-400 animate-pulse'>  &nbsp; </div>
                                    <div className='w-full bg-slate-400 animate-pulse'>  &nbsp; </div>
                                </div>
                            </td>
                        </tr>
                        </> ) : 
                        (<> 
                        {
                            Clients.map((client) => (
                        <tr key={client.id_client} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="p-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-200 flex items-center gap-2">
                                {ClientsLoading ? (<span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-2'> &nbsp; </span>) : 
                                (<div className=''> 
                                    {client.nom_societe} {client.status  === 'Inactif' && <Clock size={14} className="text-orange-500"/>}
                                </div>) }
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                {ClientsLoading ? (<span className='w-full bg-slate-400 animate-pulse rounded-2xl mt-1'> <RectangleHorizontalIcon className=' rounded-xl bg-slate-400'/> </span>) : 
                                (<div className=''> 
                                    {client.nom_contact}
                                </div>) }
                            </td>
                            <td className="p-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-mono">
                                {ClientsLoading ? (<div> <div className='w-full bg-slate-400 rounded-2xl h-2 mb-1 animate-pulse'> &nbsp;</div> <div className='w-full bg-slate-400 rounded-2xl h-2 mt-1 animate-pulse'> &nbsp; </div> </div> ) : 
                                (<div> 
                                    <div>{client.nif}</div><div>{client.stat}</div>
                                </div>) }
                                
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 text-center">
                                {/* {client.nombreCommandes} */} 0
                            </td>
                                {userRole === 'admin' && <td className="p-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                    {/* {client.montantTotalAchats.toLocaleString('fr-FR')} */} 0.00
                            </td>}
                            <td className="p-4 whitespace-nowrap text-sm">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300` /*${statusInfo.style}*/} >
                                    {client.status}</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-1"><Button variant="ghost" icon={<Eye/>} onClick={handleOpenDetail} className="p-2 h-auto" />
                                    <Button variant="ghost" icon={<Edit/>} onClick={() => handleEdit(client)} className="p-2 h-auto text-green-500 hover:text-green-500">
                                        <span className="sr-only">Modifier</span>
                                    </Button>
                                    <Button variant="ghost" icon={<Trash2/>} onClick={() => handleDelete(client)} className="p-2 h-auto text-red-500 hover:text-red-500">
                                        <span className="sr-only">Supprimer</span>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                        ))}
                        </> )
                    }
                    </tbody>
                </table>
                {!ClientsLoading && !Clients.length && <div className='p-4 whitespace-nowrap text-lg font-medium text-center' > Ajouter des clients </div> }
            </div>
              {isModalOpen && <ClientModal client={editingClient} onClose={closeModal} commerciaux={Commerciaux} isNew={isNew} isEdit={isEdit} isDelete={isDelete} mutate={mutate} />}
          </div>
      );
}
