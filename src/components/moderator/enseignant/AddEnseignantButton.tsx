"use client"

import EnseignantModal from "@/src/features/moderator/enseignant/EnseignantModal";
import { PlusIcon } from "../../ui/icon"
import { useState } from "react";

export default function AddEnseignantButton() {
    const [showModal, setShowModal] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const onClose = () => {
        setShowModal(false);
        setIsNew(false);
    }
    const handleClick = () => {
      setShowModal(true);
      setIsNew(true);
    }
  return (
    <div>
        <button
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                onClick={handleClick}
              >
                <PlusIcon />
                <span className="ml-2">Ajouter un enseignant</span>
          </button>
          { showModal && <EnseignantModal isNew = {isNew} onClose ={ onClose } /> }
    </div>
  )
}
