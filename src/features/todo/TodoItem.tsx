"use client";

import { useState } from 'react';
import {EditTodoModal} from './EditTodoModal';
import { deleteTodoAction } from '@/src/actions/todo.action';

interface TodoItemProps {
  todo: {
    id_todos: number;
    title: string;
    author: string;
    completed: boolean;
  };
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTodoAction(todo.id_todos); // Appel de la Server Action
      alert('Tâche supprimée avec succès !');
    } catch  {
      alert('Une erreur est survenue lors de la mise à jour');
    }
  };

  return (
    <li className="flex items-center justify-between border border-gray-300 rounded p-2 shadow hover:shadow-md hover:bg-gray-200">
      <div className="w-[60%] px-2 italic text-left font-light inline-grid grid-cols-1 gap-2">
        <span>{todo.title}</span>
        <span className="text-end">{todo.author}</span>
      </div>

      <div className="flex items-center m-2 space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 bg-teal-800 text-white rounded hover:bg-teal-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="px-2 py-1 bg-red-800 text-white rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>

      {isEditing && (
        <EditTodoModal
          todo={todo}
          onClose={() => setIsEditing(false)}
        />
      )}
    </li>
  );
}