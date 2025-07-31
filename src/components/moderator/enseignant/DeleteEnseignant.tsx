"use client"

import EnseignantModal from "@/src/features/moderator/enseignant/EnseignantForm";
import { useState } from "react";
import { TrashIcon } from "../../ui/icon";
import { EnseignantType } from "@/src/types/type";
type Id_EnseignantProps = {
    id_enseignant: number;
    enseignant: EnseignantType;
}
export default function DeleteEnseignantButton( props : Id_EnseignantProps) {
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