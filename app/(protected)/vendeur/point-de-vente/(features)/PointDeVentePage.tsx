"use client"

import { StatCard } from '@/sources/components/ui';
import { CartItemsType, clientType, devisLivreData } from '@/sources/types/type';
import { AlertTriangle, FileClock, Wallet} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { GetClientID } from '@/sources/actions/admin/client.action';
import PrintArticle from './PrintArticle';
import Packaging from './Packaging/Packaging';
import Chevalet from './Chevalet/Chevalet';
import Calendar from './Calendar/Calendar';
import Cartetie from './Cartetie';
import CartSection from './CartSection';
import Flyers from './Flyers';
import Finition from './Finition';
import GrandFormat from './GrandFormat';
import Textile from './Textile';
import Goodies from './Goodies';
import Evenement from './Evenement';
import Photo from './Photo';
import Administratif from './Administratif';
import Impression from './Impression';

type PointDeVenteProps = {
    userRole?: string;
    param ?: string;
}

export default function PointDeVentePage( { param, userRole } : PointDeVenteProps) {
    
    const [client, setClient] = useState<clientType>();
    const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
    const [devisLivre, setDevisLivre] = useState<devisLivreData[]>([])
    //const [notifications, setNotifications] = useState([]);

    // const addNotification = (message, type = 'success') => { 
    //     setNotifications(prev => [...prev, { id: Date.now(), message, type }]); 
    // };
    const handleGetDevisLivre = (devisLivre : devisLivreData[]) => {
        setDevisLivre(devisLivre);
    }

    const handleAddCart = (cartItem : CartItemsType, devis ?: devisLivreData) => {
        const itemsCopy = [...cartItems];
        itemsCopy.push(cartItem);
        setCartItems(itemsCopy);
        const devisCopy = [...devisLivre];
        devisCopy.push(devis!);
        setDevisLivre(devisCopy);
    }

    const RemoveFromCart = (id : number) => {
        const filterCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(filterCartItems);
    }

    const cartItemsInit = () => {
        setCartItems([]);
    }

    useEffect(() => {
        if (param) {
            GetClientID(Number(param))
                .then(res => {
                    const clientData = res.data;
                    setClient(clientData);
                });
        }
    }, [param]);

    const commercialKpis = {
        proformasEnAttente: 0,
        facturesARecouvrer: 0,
        totalResteAPayer: 0.00,
    }


      return (
          <div className="animate-fade-in space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard title="Proformas en attente" value={commercialKpis.proformasEnAttente} icon={<FileClock size={24} className="text-white"/>} color={{bg: "bg-yellow-500"}} trend={{direction: 'up', value: '+2'}}/>
                  <StatCard title="Factures à recouvrer" value={commercialKpis.facturesARecouvrer} icon={<AlertTriangle size={24} className="text-white"/>} color={{bg:"bg-orange-500"}} />
                  <StatCard title="Total Reste à Payer" value={`${commercialKpis.totalResteAPayer.toLocaleString('fr-FR')} Ar`} icon={<Wallet size={24} className="text-white"/>} color={{bg: "bg-red-500"}} />
              </div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-6"> 
                <div className='max-h-[60vh] overflow-y-auto pr-4 space-y-4'>
                <Packaging param={param} handleAddCart={(cartItem) => handleAddCart(cartItem)}/>
                
                <Calendar param={param} handleAddCart={(cartItem) => handleAddCart(cartItem)}/>
                
                <Chevalet param={param} handleAddCart={(cartItem) => handleAddCart(cartItem)} />
                
                <PrintArticle param={param} userRole={userRole} handleAddCart={(cartItem, devisLivre) => handleAddCart(cartItem, devisLivre)} handleGetDevisLivre={ (devisLivre) => handleGetDevisLivre(devisLivre)} />
                
                <Cartetie />

                <Flyers param={param} userRole={userRole} handleAddCart={(cartItem) => handleAddCart(cartItem) } />

                <Finition />

                <GrandFormat />

                <Textile />

                <Goodies />

                <Evenement />

                <Photo />

                <Administratif />

                <Impression />
                </div>
                </div>
                <CartSection cartItems={cartItems} client={client} RemoveFromCart={(id) =>  RemoveFromCart(id) } devisLivre={devisLivre!} cartItemsInit={ () => cartItemsInit()} />
        </div>
    </div>
    );
}