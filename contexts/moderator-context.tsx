// 'use client';

// import { EnseignantType } from '@/src/types/type';
// import { createContext, useContext, useEffect, useMemo } from 'react';

// type ModeratorContextType = {
//   enseignants: {
//     actifs: EnseignantType;
//     quittes: EnseignantType;
//     enLigne: EnseignantType;  // any[];
//   };
//   classes: any[];
//   sections: any[];
//   niveaux: any[];
//   isLoading: boolean;
//   error: any;
//   refreshData: () => Promise<void>;
// };

// const ModeratorContext = createContext<ModeratorContextType | undefined>(undefined);

// // preload('moderator-enseignants', ReadEnseignant);
// // preload('moderator-niveaux', GetNiveau);

// export function ModeratorProvider({ children }: { children: React.ReactNode }) {
//   // SWR pour les enseignants
//   // const { 
//   //   data: enseignantsData, 
//   //   error: enseignantsError, 
//   //   isLoading: enseignantsLoading 
//   // } = useSWR('moderator-enseignants', ReadEnseignant);

//   // // SWR pour les classes
//   // const { 
//   //   data: classesData, 
//   //   error: classesError, 
//   //   isLoading: classesLoading 
//   // } = useSWR('moderator-classes', ReadClasse);

//   //   const { 
//   //   data: sectionsData, 
//   //   error: sectionsError, 
//   //   isLoading: sectionsLoading,
//   // } = useSWR('moderator-sections', ReadSection);

//   // const { 
//   //   data: niveauxData, 
//   //   error: niveauxError, 
//   //   isLoading: niveauxLoading,
//   // } = useSWR('moderator-niveaux', GetNiveau);

  
  
//   // // Fonction de rafraîchissement
//   // const refreshData = async () => {
//   //   await Promise.all([
//   //     mutate('moderator-enseignants'),
//   //     mutate('moderator-classes'),
//   //     mutate('moderator-sections'),
//   //     mutate('moderator-niveaux')
//   //   ]);
//   // };

//   const values = useMemo(() => {
//     return {
//         // enseignants: {
//         //   actifs: enseignantsData?.enseignantsActive || [],
//         //   quittes: enseignantsData?.enseignantsQuitte || [],
//         //   enLigne: enseignantsData?.enseignantsOnLine || []
//         // },
//         // classes: classesData?.data || [],
//         // sections: sectionsData?.sections || [],
//         // niveaux: niveauxData?.niveaux || [],
//         // enseignantsLoading : enseignantsLoading,
//         // niveauxLoading : niveauxLoading,
//         // isLoading: enseignantsLoading || classesLoading || sectionsLoading,
//         // error: enseignantsError || classesError || sectionsError || niveauxError,
//         // refreshData
//     }
//   }, [/* enseignantsData, classesData, sectionsData, niveauxData */]);

//   //   useEffect(() => {
//   //   if (typeof window !== 'undefined') {
//   //     const prefetchData = async () => {
//   //       await Promise.allSettled([
//   //         preload('moderator-niveaux', GetNiveau),
//   //         preload('moderator-enseignants', ReadEnseignant),
//   //         preload('moderator-classes', ReadClasse),
//   //         preload('moderator-sections', ReadSection),
//   //       ]);
//   //     };
//   //     prefetchData();
//   //   }
//   // }, []);

//   return (
//     <ModeratorContext.Provider value={values}>
//       {children}
//     </ModeratorContext.Provider>
//   );
// }

// export const useModerator = () => {
//   const context = useContext(ModeratorContext);
//   if (!context) throw new Error('useModerator must be used within ModeratorProvider');
//   return context;
// };