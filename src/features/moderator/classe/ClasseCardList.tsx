"use client"

import { Button } from '@/src/components/ui/button';
import { AlertCircle, Award, BarChart2, BookOpen, ChevronDown, ChevronUp, Eye, TrendingDown, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react'

type ClasseCardProps = {
    param : string;
} 

export default function ClasseCardList(props : ClasseCardProps) {
      const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  // Mock data - À remplacer par vos données réelles
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
       <div className="flex border-b border-gray-200 mb-6">
        <TabButton 
          active={activeTab === 'general'} 
          onClick={() => setActiveTab('general')}
          icon={<Users className="h-4 w-4 mr-2" />}
        >
          Vue d&apos; ensemble
        </TabButton>
        <TabButton 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')}
          icon={<BarChart2 className="h-4 w-4 mr-2" />}
        >
          Analytics
        </TabButton>
        <TabButton 
          active={activeTab === 'evaluations'} 
          onClick={() => setActiveTab('evaluations')}
          icon={<BookOpen className="h-4 w-4 mr-2" />}
        >
          Évaluations
        </TabButton>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-100 font-medium text-gray-500">
          <div className="col-span-4">Étudiant</div>
          <div className="col-span-2 text-center">Moyenne</div>
          <div className="col-span-2 text-center">Progression</div>
          <div className="col-span-2 text-center">Présence</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {classData.students.map((student) => (
          <div key={student.id} className="grid grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors">
            <div className="col-span-4 flex items-center">
              {/* <Avatar className="h-10 w-10 mr-3">
              <div>
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-500">Dern. éval: {student.lastEvaluation}/20</p>
              </div>
            </div>
            <div className="col-span-2 text-center">
              <div className="font-medium">{student.moyenne}</div>
              {/* <Progress value={(parseFloat(student.moyenne) / 20) * 100} className="h-2 mt-1" /> */}
            </div>
            <div className="col-span-2 text-center">
              <div className={`inline-flex items-center ${student.progression.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {student.progression.startsWith('+') ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {student.progression}
              </div>
            </div>
            <div className="col-span-2 text-center">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-[120px]">
                  {/* <Progress value={parseInt(student.presence)} className="h-2" /> */}
                  <span className="text-xs mt-1 block">{student.presence}</span>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setExpandedStudent(expandedStudent === student.id ? null : student.id)}
                className="mr-2"
              >
                {expandedStudent === student.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Détails expansibles */}
            {expandedStudent === student.id && (
              <div className="col-span-12 mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Performances</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mathématiques</span>
                        <span>15.2/20</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Commentaires</h4>
                    <p className="text-sm text-gray-600">Excellent travail ce mois-ci &lsquo; continuez ainsi!</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Actions rapides</h4>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Envoyer message</Button>
                      <Button variant="outline" size="sm">Planifier RDV</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Widgets supplémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-medium mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Évolution de la classe
          </h3>
          <div className="h-40 bg-gray-100 rounded flex items-center justify-center text-gray-400">
            Graphique d &apos; évolution
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-medium mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-600" />
            Top compétences
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Analyse critique</span>
                <span>82%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-medium mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
            Alertes récentes
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-red-500 mt-0.5">
                <AlertCircle className="h-full w-full" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Retard dans le projet final</p>
                <p className="text-sm text-gray-500">3 étudiants concernés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TabButton({ active, onClick, icon, children }: { 
  active: boolean, 
  onClick: () => void, 
  icon: React.ReactNode, 
  children: React.ReactNode 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 text-sm font-medium ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
    >
      {icon}
      {children}
    </button>
  );
}