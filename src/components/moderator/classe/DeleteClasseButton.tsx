"use client"

import { useState } from "react";
import { TrashIcon } from "../../ui/icon";
import { classeType } from "@/src/types/type";
import ClasseModal from "@/src/features/moderator/classe/ClasseModal";

type Id_ClasseProps = {
    id_classe: number;
    classe: classeType;
}
export default function DeleteClasseButton( props : Id_ClasseProps) {
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
          { showModal && <ClasseModal  id_classe={props.id_classe} classe={props.classe} isDelete={isDelete} onClose={ onClose } /> }
    </div>
  )
}