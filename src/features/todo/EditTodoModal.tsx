
"use client"; 

import { useState } from 'react';
import { updateTodoAction } from '../../actions/todo.action';

interface EditTodoModalProps {
  todo: {
    id_todos: number;
    title: string;
    author: string;
    completed: boolean;
  };
  onClose: () => void; 
}

 export function EditTodoModal({ todo, onClose }: EditTodoModalProps) {
  const [data, setData] = useState({
    title: todo.title,
    author: todo.author,
    completed: todo.completed,
  })
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    }
  const handleSubmit = async (/*e: React.FormEvent*/) => {
    //e.preventDefault();
    setIsLoading(true);
    try {
      const arg = {
        id: todo.id_todos, 
        title: data.title, 
        author: data.author, 
        completed: data.completed
      }
      await updateTodoAction(arg);
      onClose(); 

    } catch  {
      console.log('Erreur X');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-cover bg-blend-d bg-cyan-800 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={data.title}
              name='title'
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              value={data.author}
              name='author'
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name='completed'
                checked={data.completed}
                onChange={handleChange}
                className="mr-2"
              />
              Complétée
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-4 py-2 h-10 w-28 rounded text-center items-center ${isLoading ?  'bg-blue-500 text-white' :  'bg-blue-500 text-white  hover:bg-blue-700' }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 m-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : ('Enregistrer')
              }

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EditButton() {
  const handleEdit = () => {
    console.log("editing...")
  }
  return(
    <button
          onClick={handleEdit}
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
  )
}