"use client";
import { useState } from "react";
import DeleteTodo from "./DeleteTodo";
import {EditTodoModal} from "./EditTodoModal";
import CreateTodo from "./CreateTodo";

 

interface Todo {
  id_todos: number;
  title: string;
  author: string;
  completed: boolean;
}

type TodoListProps = {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const handleEdit = (todo : Todo) => {
        setSelectedTodo(todo);
    }
    const handleCloseModal = () => {
        setSelectedTodo(null);
      };

    return (
    <div>
    <CreateTodo />
    <ul className="mt-4 space-y-2">
        {todos.map((todo) => (
            <li key={todo.id_todos} className="flex items-center justify-between border border-gray-300 rounded p-2 shadow hover:shadow-md hover:bg-gray-200">
                <div className='w-[60%] px-2 italic text-left font-light inline-grid grid-cols-1 gap-2'>
                <span>{todo.title}</span>
                <span className='text-end'>{todo.author}</span>
                </div>
                
                <div className="flex items-center m-2 space-x-2"> 
                <button
                      onClick={()=>handleEdit(todo)}
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
                <DeleteTodo id={todo.id_todos} />
                </div>
            </li>
        ))}
    </ul>
    
    {
      selectedTodo && <EditTodoModal todo ={selectedTodo} onClose={handleCloseModal} />
    }
    </div>
  );
}