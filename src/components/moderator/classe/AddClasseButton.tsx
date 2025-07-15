"use client"

import React, { useState } from 'react'
import { PlusIcon } from '../../ui/icon'
import ClasseModal from '@/src/features/moderator/classe/ClasseModal';

export default function AddClasseButton() {
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
          onClick={handleClick}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Ajouter une classe"
        >
          <PlusIcon />
          <span className="ml-2">Ajouter une classe</span>
        </button>
        { showModal && <ClasseModal isNew = {isNew} onClose ={ onClose } /> }
    </div>
  )
}
