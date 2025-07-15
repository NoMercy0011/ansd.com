"use client"

import EnseignantModal from "@/src/features/moderator/enseignant/EnseignantModal";
import { EditIcon } from "../../ui/icon"
import { useState } from "react";
import { EnseignantType } from "@/src/types/type";
type EnseignantProps = {
    enseignant: EnseignantType;
}
export default function EditEnseignantButton( props : EnseignantProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const onClose = () => {
        setShowModal(false);
        setIsEditing(false);
    }
    const handleClick = () =>{
        setShowModal(true);
        setIsEditing(true);
    }
  return (
    <div>
        <button onClick={handleClick} >
            <div className="text-blue-600 hover:text-blue-900 mr-3 flex items-center">
            <EditIcon />
            </div>
        </button>
          { showModal && <EnseignantModal enseignant ={props.enseignant} isEditing={isEditing} onClose={ onClose } /> }
    </div>
  )
}