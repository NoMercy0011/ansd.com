// CatalogSkeleton.tsx

import React from 'react';

/**
 * Composant Squelette réutilisable pour afficher l"&apos;" état de chargement
 * des différents catalogues de produits (Hangtag, Flyers, Carterie, etc.).
 * Il imite la structure des sections de sélection d"&apos;" options.
 */
export default function CatalogSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="w-full lg:w-full space-y-4">
                    
                    {/* Squelette de Section 1 : Dimension */}
                    <div className='flex mb-4'>
                        <div className="w-full lg:w-1/2">
                            {/* Titre de section */}
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                            {/* Grille d'options */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
                            </div>
                        </div>
                    </div>

                    {/* Squelette de Section 2 : Matériaux */}
                    <div className='flex mb-4'>
                        <div className="w-full lg:w-1/2">
                            {/* Titre de section */}
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                            {/* Grille d'options (Type de papier) */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            </div>
                            {/* Grille d'options (Grammage) */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Squelette de Section 3 : Couleur */}
                    <div className='flex mb-4'>
                        <div className="w-full lg:w-1/2">
                            {/* Titre de section */}
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5 mb-4"></div>
                            {/* Grille d'options */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                            </div>
                        </div>
                    </div>

                    {/* Squelette de Section 4 : Quantité */}
                    <div className='flex mb-4'>
                        <div className="w-full lg:w-1/2">
                            {/* Titre de section */}
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6 mb-4"></div>
                            {/* Champ Input */}
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}