"use client"

import { StatCard } from '@/sources/components/ui';
import { CartItemsType, clientType } from '@/sources/types/type';
import { AlertTriangle, FileClock, Wallet} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import CatdSection from './CartSection';
import { GetClientID } from '@/sources/actions/admin/client.action';
import PrintArticle from './PrintArticle';
import CustomArticle from './CustomArticle';
import LivraisonService from './LivraisonService';
import OtherService from './OtherService';
import PurchaseArticle from './PurchaseArticle';

type PointDeVenteProps = {
    userRole?: string;
    param ?: string;
}

export default function PointDeVentePage( { param, userRole } : PointDeVenteProps) {
    
    const [client, setClient] = useState<clientType>();
    const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
    //const [notifications, setNotifications] = useState([]);

    // const addNotification = (message, type = 'success') => { 
    //     setNotifications(prev => [...prev, { id: Date.now(), message, type }]); 
    // };

    const handleAddCart = (cartItem : CartItemsType) => {
        setCartItems([cartItem]);
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

                <PurchaseArticle />

                <OtherService />

                <LivraisonService />

                <CustomArticle />

                <PrintArticle param={param} userRole={userRole} handleAddCart={(cartItem) => handleAddCart(cartItem)} />

            </div>
                <CatdSection cartItems={cartItems} client={client}/>
        </div>
    </div>
    );
}