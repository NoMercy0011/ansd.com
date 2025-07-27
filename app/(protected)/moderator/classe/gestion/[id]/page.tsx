"use client"
import { useRouter } from "next/navigation";
import { Card, Button, Input, Select, Badge } from "@/src/components/ui";
import { Save, Trash2, Users, BookOpen } from "lucide-react";
import { useState } from "react";

// Mock data - À remplacer par appel API
const mockClass = {
  id: "CLA-2023-1",
  niveau: "Terminale",
  nom: "A",
  effectif: 32,
  responsable: { id: "ENS-001", nom: "Prof. Diallo" },
  matieres: ["Maths", "Physique"],
  salle: "B12",
  eleves: [
    { id: "ET-001", nom: "Bamba", prenom: "Aïcha", moyenne: 16.5 },
    // ... autres élèves
  ]
};

const mockTeachers = [
  { id: "ENS-001", nom: "Prof. Diallo" },
  { id: "ENS-002", nom: "Prof. Konaté" },
  // ... autres enseignants
];

export default function ClassCRUDPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState(mockClass);
  const [isEditing, setIsEditing] = useState(params.id === "ajouter");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, logique pour sauvegarder
    router.push("/moderator/classe/gestion");
  };

  const handleDelete = () => {
    // Logique de suppression
    router.push("/moderator/classe/gestion");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {isEditing ? (params.id === "ajouter" ? "Créer" : "Modifier") : "Détails"} une Classe
        </h1>
        {!isEditing && (
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Modifier
            </Button>
            <Button variant="danger" icon={<Trash2 size={16} />} onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <Input
              label="Niveau"
              value={formData.niveau}
              onChange={(e) => setFormData({...formData, niveau: e.target.value})}
              disabled={!isEditing}
              required
            />

            <Input
              label="Nom de la classe"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              disabled={!isEditing}
              required
            />

            <Input
              label="Salle attribuée"
              value={formData.salle}
              onChange={(e) => setFormData({...formData, salle: e.target.value})}
              disabled={!isEditing}
            />

            <Select
              label="Responsable"
              items={mockTeachers.map(t => ({ value: t.id, label: t.nom }))}
              selected={formData.responsable.id}
              onSelect={(id) => setFormData({
                ...formData, 
                responsable: mockTeachers.find(t => t.id === id) || formData.responsable
              })}
              disabled={!isEditing}
            />
          </div>

          {/* Liste des élèves (lecture seule) */}
          {!isEditing && (
            <div className="border-t p-6">
              <h3 className="font-medium flex items-center gap-2 mb-4">
                <Users className="h-5 w-5" /> Élèves ({formData.eleves.length})
              </h3>
              <div className="space-y-2">
                {formData.eleves.map((eleve) => (
                  <div key={eleve.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <span>{eleve.prenom} {eleve.nom}</span>
                    <Badge variant={eleve.moyenne >= 10 ? "success" : "danger"}>
                      {eleve.moyenne}/20
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="border-t p-4 bg-gray-50 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button type="submit" variant="primary" icon={<Save size={16} />}>
                Enregistrer
              </Button>
            </div>
          )}
        </Card>
      </form>
    </div>
  );
}