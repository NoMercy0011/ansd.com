"use client"

import { AlertTriangle, BarChart3, List, Medal, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import EtudiantGeneral from './EtudiantGeneral';

export default function EtudiantHeader() {
    const [activeSection, setActiveSection] = useState<"general" | "all" |"elite"| "progress" | "risk">("general");
    
  return (
    <>
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "general" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("general")}
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Général
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "all" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("all")}
        >
          <div className="flex items-center gap-2">
            <List className="h-4 w-4" /> Tous
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "elite" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("elite")}
        >
          <div className="flex items-center gap-2">
            <Medal className="h-4 w-4" /> Elites
          </div>
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "progress" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("progress")}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Progression
          </div>
        </button><button
          className={`px-4 py-2 font-medium text-sm border-b-2 ${activeSection === "risk" ? "border-orange-600 text-orange-600 shadow-inner" : "border-transparent hover:text-orange-500"}`}
          onClick={() => setActiveSection("risk")}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> À Suivre
          </div>
        </button>
      </div>
      <div className="space-y-6">
        {activeSection === "general" && (
          <div>
            <EtudiantGeneral />
          </div>
        )}

        {activeSection === "progress" && (
          <div>
            {/* <StudentTable
              data={progressingStudents}
              columns={[
                { header: "Étudiant", accessor: "name" },
                { header: "Classe", accessor: "class" },
                { 
                  header: "Progression", 
                  accessor: "progress",
                  render: (value) => (
                    <span className="text-emerald-600 font-medium">{value}</span>
                  )
                },
                { 
                  header: "Matières", 
                  accessor: "subjects",
                  render: (value) => value.join(", ")
                }
              ]}
            /> */}
          </div>
        )}

        {activeSection === "risk" && (
          <div>
            {/* <StudentTable
              data={atRiskStudents}
              columns={[
                { header: "Étudiant", accessor: "name" },
                { header: "Classe", accessor: "class" },
                { 
                  header: "Moyenne", 
                  accessor: "average",
                  render: (value) => (
                    <Badge variant="danger">{value}/20</Badge>
                  )
                },
                { header: "Alerte", accessor: "warning" }
              ]}
            /> */}
          </div>
        )}
      </div>
    </>
  )
}
