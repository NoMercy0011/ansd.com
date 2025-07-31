"use client"

import { useClasse } from '@/hooks/useModerator';
import { Award, BookOpen, ChevronLeft, Loader2, PenSquareIcon, TrendingDown, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

type ClasseCardProps = {
    param : string;
    classe?: any;
    classesLoading?: boolean;
}

export default function ClasseCardHeader( props : ClasseCardProps) {
    const { classes, classesLoading } = useClasse();

    const classe = classes.find( (classe : any) => classe.id_classe == props.param);
    
    
    const [isLoading, setiIsLoading] = useState(false);

      const classData = {
        id: props.param,
        name: "Terminale A",
        effectif: 32,
        moyenneGenerale: 14.2,
        major: { name: "Jean Dupont", moyenne: 17.8 },
        progression: "+2.4%",
        enseignant: "Prof. Martin",
        students: Array.from({ length: 32 }, (_, i) => ({
          id: `student-${i}`,
          name: `Étudiant ${i + 1}`,
          moyenne: (Math.random() * 5 + 10).toFixed(1),
          progression: (Math.random() > 0.5 ? "+" : "-") + (Math.random() * 3).toFixed(1) + "%",
          avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
          lastEvaluation: "15.5",
          presence: `${Math.floor(Math.random() * 20) + 80}%`
        }))
      };

  return (
    <>
    <div className="bg-gradient-to-r from-stone-100 to-gray-100 rounded-2xl shadow-xl text-gray-800 mb-8">
        <div className='flex justify-between bg-blue-700 rounded-t-2xl '>
            <h2 className=" bg-blue-700 text-white/90 text-xl font-bold rounded-t-2xl ml-5 mt-2 mb-1">
                { classesLoading ? (< div className ='bg-sky-100 h-7 w-40 rounded-xl animate-pulse' > &nbsp; </div> ) : 
                ( <> 
                    {classe.classe}
                </> ) 
                }
            </h2>
            <div className='flex justify-between items-center mr-4 text-white/80'>
            <Link href={'/moderator/classe'} className="text-sm flex justify-between items-center hover:underline" onClick={() => setiIsLoading(true)}>
                { isLoading ? ( <span className='flex justify-between items-center'> <Loader2 className='animate-spin w-4 h-4'/> Retour </span> ) :  
                (<span className='flex justify-between items-center'> <ChevronLeft className=" h-4 w-4" /> Retour </span>) }
            </Link>
          </div>
        </div>
        <div className='p-6'>
            <div className="flex justify-between items-start">
          <div>
            <div className='flex justify-between items-start'>
                <p className="text-gray-700"> 
                  { classe.responsable.sexe == 'M' ? "Mr" : " Mme" }  {classe.responsable.nom} {classe.responsable.prenom} - Responsable </p>
                <p> <button className=' px-2 cursor-pointer'>
                    <PenSquareIcon className='text-sm text-red-500 w-5 h-5 hover:scale-120'/>
                    </button>
                </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <StatCard 
            icon={<Users className="h-6 w-6" />} 
            title="Effectif" 
            value={classData.effectif} 
            description="Étudiants"
          />
          <StatCard 
            icon={<BookOpen className="h-6 w-6" />} 
            title="Moyenne" 
            value={classData.moyenneGenerale} 
            description="/20" 
            trend="neutral"
          />
          <StatCard 
            icon={<Award className="h-6 w-6" />} 
            title="Major" 
            value={classData.major.name} 
            description={`${classData.major.moyenne}/20`}
          />
          <StatCard 
            icon={<TrendingUp className="h-6 w-6" />} 
            title="Progression" 
            value={classData.progression} 
            description="ce mois" 
            trend="up"
          />
        </div>
        </div>
      </div>
    </>
  )
}

function StatCard({ icon, title, value, description, trend }: { 
  icon: React.ReactNode, 
  title: string, 
  value: string | number, 
  description: string, 
  trend?: 'up' | 'down' | 'neutral' 
}) {
  return (
    <div className="bg-sky-300 p-4 rounded-lg backdrop-blur-sm text-gray-600 hover:scale-105 hover:shadow-inner hover:bg-sky-100 cursor-pointer">
      <div className="flex items-center mb-2">
        <div className="p-1.5 rounded-full bg-white/50 mr-3">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold  text-gray-700">{value}</p>
          <p className="text-xs text-gray-800">{description}</p>
        </div>
        {trend === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
        {trend === 'down' && <TrendingDown className="h-5 w-5 text-red-500" />}
      </div>
    </div>
  );
}