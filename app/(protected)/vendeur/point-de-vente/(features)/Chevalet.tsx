import { Button, Input, Textarea } from '@/sources/components/ui'
import Accordion from '@/sources/components/ui/accordion'
import { Home, ShoppingBasket } from 'lucide-react'
import React from 'react'

export default function Chevalet() {
    const handleAddToCart = () => {

    };
  return (
    <Accordion title="Chevalets & Stand (PLV)" icon={<Home />} defaultOpen={false}>
        <div className="space-y-3">
            <Input placeholder={`Nom du service (Livraison)`} /*onChange={e => handleChange('designation', e.target.value)}*/ />
            <Textarea placeholder="Description détaillée..." /*onChange={e => handleChange('detailedDescription', e.target.value)}*/ />
            <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Quantité" /*onChange={e => handleChange('quantite', e.target.value)} />
                <Input type="number" placeholder="Prix Unitaire HT (Ar)" value={"item.prixUnitaire"} /*onChange={e => handleChange('prixUnitaire', e.target.value)}*/ />
            </div>
            <Button variant="success" icon={<ShoppingBasket />} onClick={handleAddToCart} className="w-full">
                Ajouter au Panier
            </Button>
        </div>
    </Accordion>
  )
}
