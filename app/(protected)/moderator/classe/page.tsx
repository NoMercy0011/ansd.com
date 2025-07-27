"use client"

import { Card, Button, Badge, Select } from "@/src/components/ui";
import { Plus, Users, BookOpen, BarChart2, Award, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

// Mock data réaliste

const mockClasses = [
  { id: "CLA-2023-1",niveau: "Terminale", nom: "A", effectif: 32, responsable: "Prof. Diallo", moyenne: 14.2,topStudents: 8,aboveAverage: 24,belowAverage: 4},
  { id: "CLA-2023-2", niveau: "Terminale", nom: "B", effectif: 28, responsable: "Prof. Konaté", moyenne: 13.7,topStudents: 8,aboveAverage: 10,belowAverage: 2},
  { id: "CLA-2023-3", niveau: "1ère", nom: "B", effectif: 25, responsable: "Prof. Ndiaye", moyenne: 12.9,topStudents: 8,aboveAverage: 17,belowAverage: 0},
  { id: "CLA-2023-4",niveau: "1ère", nom: "B", effectif: 30,responsable: "Prof. Traoré", moyenne: 11.8,topStudents: 5,aboveAverage: 19,belowAverage: 6},
  { id: "CLA-2023-5", niveau: "2nde", nom: "A", effectif: 29, responsable: "Prof. Rakoto", moyenne: 13.5, topStudents: 10, aboveAverage: 19, belowAverage: 0},
  { id: "CLA-2023-6", niveau: "2nde", nom: "B", effectif: 31, responsable: "Prof. Razafy", moyenne: 12.9, topStudents: 12, aboveAverage: 18, belowAverage: 1},
]

export default function ClassePage() {
  const [selectedLevel, setSelectedLevel] = useState("Terminale");
  const [selectedClass, setSelectedClass] = useState("CLA-2023-1");

  const currentClass = mockClasses.find(c => c.id === selectedClass);

  // Filtrer les classes par niveau
  const filteredClasses = selectedLevel === "Tous les niveaux" 
    ? mockClasses 
    : mockClasses.filter(c => c.niveau === selectedLevel);

  return (
  <>
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="text-orange-600" /> Gestion des Classes
        </h1>
        <Button href="/moderator/classe/gestion" icon={<Plus size={18} />}>
          Ajouter une classe
        </Button>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Classes actives</p>
              <h3 className="text-2xl font-bold mt-1">{mockClasses.length}</h3>
            </div>
            <div className="p-2 bg-sky-100 rounded-lg text-sky-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Effectif moyen</p>
              <h3 className="text-2xl font-bold mt-1">
                {Math.round(mockClasses.reduce((sum, c) => sum + c.effectif, 0) / mockClasses.length)}
              </h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Moyenne générale</p>
              <h3 className="text-2xl font-bold mt-1">
                {Math.round(mockClasses.reduce((sum, c) => sum + c.moyenne, 0) / mockClasses.length * 10) / 10}/20
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <BarChart2 className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4">
        <Select
          items={["Terminale", "1ère", "2nde"]}
          selected={selectedLevel}
          onSelect={(level) => {
            setSelectedLevel(level);
            // Reset la sélection quand on change de niveau
            const firstClass = mockClasses.find(c => c.niveau === level);
            if (firstClass) setSelectedClass(firstClass.id);
          }}
          className="w-40"
        />
        
        <Select
          items={mockClasses
            .filter(c => c.niveau === selectedLevel)
            .map(c => ({ value: c.id, label: `${c.niveau} ${c.nom}` }))
          }
          selected={currentClass ? `${currentClass.niveau} ${currentClass.nom}` : ''}
          onSelect={(id) => setSelectedClass(id)}
          className="w-56"
        />
      </div>

      {/* Liste des classes */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Classe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Effectif</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Moyenne</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.map((classe) => (
                <tr key={classe.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {classe.niveau} {classe.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {classe.effectif} élèves
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {classe.responsable}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={
                      classe.moyenne >= 14 ? "success" :
                      classe.moyenne >= 12 ? "warning" : "danger"
                    }>
                      {classe.moyenne}/20
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="sm" href={`/moderator/classe/${classe.id}`}>
                      Gérer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comparaison des performances */}
      <Card>
        <h3 className="text-lg font-semibold p-4 border-b">
          Analyse détaillée - {currentClass?.niveau} {currentClass?.nom}
        </h3>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte Statistique 1 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Élèves en 1ère place</p>
                <h3 className="text-2xl font-bold">{currentClass?.topStudents || 0}</h3>
                <p className="text-xs text-gray-400">
                  {Math.round(((currentClass?.topStudents || 0) / (currentClass?.effectif || 1)) * 100)}% de la classe
                </p>
              </div>
            </div>
          </div>

          {/* Carte Statistique 2 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Au-dessus de 10/20</p>
                <h3 className="text-2xl font-bold">{currentClass?.aboveAverage || 0}</h3>
                <p className="text-xs text-gray-400">
                  {Math.round(((currentClass?.aboveAverage || 0) / (currentClass?.effectif || 1)) * 100)}% de la classe
                </p>
              </div>
            </div>
          </div>

          {/* Carte Statistique 3 */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">En dessous de 10/20</p>
                <h3 className="text-2xl font-bold">{currentClass?.belowAverage || 0}</h3>
                <p className="text-xs text-gray-400">
                  {Math.round(((currentClass?.belowAverage || 0) / (currentClass?.effectif || 1)) * 100)}% de la classe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparaison avec les autres classes du même niveau */}
        <div className="p-6 border-t">
          <h4 className="font-medium mb-4">Comparaison avec les autres {selectedLevel}</h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3">Classe</th>
                  <th className="text-right pb-3">Moyenne</th>
                  <th className="text-right pb-3">Top élèves</th>
                  <th className="text-right pb-3">{'>'}10/20</th>
                  <th className="text-right pb-3">{'<'}10/20</th>
                </tr>
              </thead>
              <tbody>
                {mockClasses
                  .filter(c => c.niveau === selectedLevel)
                  .map(classe => (
                    <tr 
                      key={classe.id} 
                      className={`border-b ${classe.id === selectedClass ? 'bg-orange-50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="py-3">
                        {classe.nom}
                        {classe.id === selectedClass && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            Actuelle
                          </span>
                        )}
                      </td>
                      <td className="text-right py-3 font-medium">
                        {classe.moyenne}/20
                      </td>
                      <td className="text-right py-3">
                        {classe.topStudents} ({Math.round((classe.topStudents / classe.effectif) * 100)}%)
                      </td>
                      <td className="text-right py-3">
                        {classe.aboveAverage} ({Math.round((classe.aboveAverage / classe.effectif) * 100)}%)
                      </td>
                      <td className="text-right py-3">
                        {classe.belowAverage} ({Math.round((classe.belowAverage / classe.effectif) * 100)}%)
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
      {/* <Card>
        <h3 className="text-lg font-semibold p-4 border-b">
          Comparaison des performances par niveau
        </h3>
        <div className="p-6">
          {["Terminale", "1ère", "2nde"].map((niveau) => (
            <div key={niveau} className="mb-6">
              <h4 className="font-medium mb-3">{niveau}</h4>
              <div className="flex items-center gap-4">
                {mockClasses
                  .filter(c => c.niveau === niveau)
                  .map(classe => (
                    <div key={classe.id} className="flex-1">
                      <p className="text-sm font-medium">{classe.nom} - {classe.moyenne}/20</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{
                            width: `${(classe.moyenne / 20) * 100}%`,
                            backgroundColor: classe.moyenne >= 14 ? "#10B981" :
                                            classe.moyenne >= 12 ? "#F59E0B" : "#EF4444"
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </Card> */}
    {/* </div> */}
  </>
  );
}