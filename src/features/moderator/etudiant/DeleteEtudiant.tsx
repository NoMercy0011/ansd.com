"use client"

import EnseignantModal from "@/src/features/moderator/enseignant/EnseignantModal";
import { useState } from "react";
import { EnseignantType } from "@/src/types/type";
import { TrashIcon } from "@/src/components/ui/icon";
type Id_EnseignantProps = {
    id_enseignant: number;
    enseignant: EnseignantType;
}
export default function DeleteEtudiantButton( props : Id_EnseignantProps) {
    const [isDelete, setIsDelete] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const onClose = () => {
        setShowModal(false);
        setIsDelete(false);
    }
    const handleClick = () =>{
        setShowModal(true);
        setIsDelete(true);
    }
  return (
    <div>
        <button onClick={handleClick} className="text-red-600 hover:text-red-900 flex items-center" aria-label="Supprimer">
            <TrashIcon />
        </button>
          { showModal && <EnseignantModal id_enseignant={props.id_enseignant} enseignant={props.enseignant} isDelete={isDelete} onClose={ onClose } /> }
    </div>
  )
}