"use client"

import { CartItemsType, clientType, devisData } from '@/types/type';
import React, { useEffect, useState } from 'react'
import { GetClientID } from '@/sources/actions/admin/client.action';
import PrintArticle from './PrintArticle';
import Packaging from './Packaging/Packaging';
import Chevalet from './Chevalet/Chevalet';
import Calendar from './Calendar/Calendar';
import Cartetie from './Carterie/Cartetie';
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
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CalendarCheck, CalendarDays, Camera, FileText, FileTextIcon, Gift, LucideBlocks, Map, Maximize2, Monitor, PackageOpenIcon, Printer, Shirt, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

type PointDeVenteProps = {
    userRole?: string;
    param ?: string;
}

export default function PointDeVentePage( { param, userRole } : PointDeVenteProps) {
    
    const [client, setClient] = useState<clientType>();
    const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
    const [devisLivre, setDevisLivre] = useState<devisData[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

    const itemsList = [
        { id: 1, icon: PackageOpenIcon, name: 'Packaging & Boites', component: Packaging },
        { id: 2, icon: CalendarDays, name: 'Calendriers', component: Calendar },
        { id: 3, icon: Monitor, name: 'Chevalets', component: Chevalet },
        { id: 4, icon: BookOpen, name: 'Livres, Booklets, Mémoires', component: PrintArticle },
        { id: 5, icon: FileText, name: 'Flyers', component: Flyers },
        { id: 6, icon: Map, name: 'Cartetie', component: Cartetie },
        { id: 7, icon: LucideBlocks, name: 'Finitions', component: Finition },
        { id: 8, icon: Maximize2, name: 'Grand Format', component: GrandFormat },
        { id: 9, icon: Shirt, name: 'Textile', component: Textile },
        { id: 10, icon: Gift, name: 'Goodies', component: Goodies },
        { id: 11, icon: CalendarCheck, name: 'Événementiel', component: Evenement },
        { id: 12, icon: Camera, name: 'Photo', component: Photo },
        { id: 13, icon: FileTextIcon, name: 'Documents Administratifs', component: Administratif },
        { id: 14, icon: Printer, name: 'Impression sans finition', component: Impression },
    ]
    // const handleGetDevisLivre = (devisLivre : devisLivreData[]) => {
    //     setDevisLivre(devisLivre);
    // }

    const handleAddCart =  (cartItem : CartItemsType, devis ?: devisData) => {
        const itemsCopy = [...cartItems];
        itemsCopy.push(cartItem);
        setCartItems(itemsCopy);
        const devisCopy = [...devisLivre];
        devisCopy.push(devis!);
        setDevisLivre(devisCopy);
        toast.success('Commande ajouter au panier');
    }

    const RemoveFromCart = (id : number) => {
        const filterCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(filterCartItems);
    }

    const cartItemsInit = () => {
        setCartItems([]);
    }

    const handleArticleSelect = (articleId: number) => {
        setSelectedArticle(articleId === selectedArticle ? null : articleId);
    }

    const renderSelectedComponent = () => {
        if (!selectedArticle) return null;
        
        const selectedItem = itemsList.find(item => item.id === selectedArticle);
        if (!selectedItem || !selectedItem.component) return null;

        const Component = selectedItem.component;
        const props = {
            param,
            userRole,
            handleAddCart,
        };

        return <Component {...props} />;
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



      return (
          <div className="animate-fade-in space-y-4">
            <Sheet >
			    <SheetTrigger asChild>
				<div className="absolute top-3 right-40 p-2 hover:bg-gray-100 hover:rounded-lg cursor-pointer z-50">
                   <ShoppingCart className="h-5 w-5 text-gray-400" />
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
                      {cartItems.length}
                  </span>
                 </div>
			    </SheetTrigger>
			    <SheetContent side="right" className="w-full max-w-sm px-4">
				    <SheetHeader className="pb-2">
				    	<SheetTitle className="flex items-start">
				    		<ShoppingCart className="w-6 h-6 text-gray-500" />
				    		<span className="ml-2 text-lg font-medium">{cartItems.length} commandes</span>
				    	</SheetTitle>
				    	<SheetDescription></SheetDescription>
				    </SheetHeader>
				    {/* list cart stores */}
				    <div className="h-full overflow-y-auto ">
				    	<CartSection 
                            cartItems={cartItems} 
                            client={client} 
                            RemoveFromCart={RemoveFromCart} 
                            devisLivre={devisLivre} 
                            cartItemsInit={cartItemsInit} 
                        />
				    </div>
				    <SheetFooter>
					    <div className="flex justify-between space-x-4 mb-12 mt-5 ">
					    	<SheetClose asChild>
					    		<Button variant="outline" className="btn-outline">
					    			Explorer encore
					    		</Button>
					    	</SheetClose>
					    	{/* {cartItems.length > 0 && (
					    		<Button
					    			variant="secondary"
					    			className="btn-primary"
					    			onClick={handleConfirmReservation}
					    			disabled={isSubmitting}>
					    			{isSubmitting ? 'Preparation...' : 'Confirmer'}
					    		</Button>
					    	)} */}
					    </div>
				        </SheetFooter>
			        </SheetContent>
		    </Sheet>
            <Card>
                <CardContent className="grid grid-cols-7 items-center gap-3 mt-3 p-5">
                    {itemsList.map((item) => (
                        <Button 
                            key={item.id} 
                            title={item.name} 
                            variant={selectedArticle === item.id ? "default" : "ghost"}
                            onClick={() => handleArticleSelect(item.id)}
                            className={`flex cursor-pointer justify-start items-center gap-2 mx-0.5 p-2 border-1 rounded-lg transition-colors duration-200 w-full ${
                                selectedArticle === item.id 
                                    ? 'bg-red-600 text-white hover:bg-red-700 border-red-500' 
                                    : 'bg-gray-100 dark:bg-gray-800 hover:border-red-500 dark:hover:bg-gray-700'
                            }`}
                        >                    
                            <item.icon size={24} className={selectedArticle === item.id ? "text-white" : "text-gray-600 dark:text-gray-300"} />
                            <span className={`text-sm font-medium truncate ${
                                selectedArticle === item.id ? "text-white" : "text-gray-800 dark:text-gray-200"
                            }`}>
                                {item.name}
                            </span>
                        </Button>
                    ))}
                </CardContent>
            </Card>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full space-y-6">
                    <div className='max-h-[60vh] overflow-y-auto pr-4 space-y-4'>
                        {selectedArticle ? (
                            renderSelectedComponent()
                        ) : (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <div className="text-gray-500 dark:text-gray-400">
                                        <PackageOpenIcon size={48} className="mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-semibold mb-2">Sélectionnez un article</h3>
                                        <p>Cliquez sur l&apos;un des articles ci-dessus pour commencer votre devis</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
}