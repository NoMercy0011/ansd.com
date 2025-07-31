"use client"

import { EditIcon } from "../../ui/icon"
import { useState } from "react";
import { classeType } from "@/src/types/type";
import ClasseModal from "@/src/features/moderator/classe/ClasseForm";

type ClasseProps = {
    classe: classeType;
}
export default function EditClasseButton( props : ClasseProps) {
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
          { showModal && <ClasseModal classe={props.classe} isEditing={isEditing} onClose={ onClose } /> }
    </div>
  )
}