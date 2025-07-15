"use client"

import { deleteTodoAction } from "@/src/actions/todo.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteTodo( props : { id: number }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            console.log('deleted');
            await deleteTodoAction(props.id);
            router.refresh();
        } catch (error) {
            console.error('Failed to delete todo:', error);
        } finally {
            setIsLoading(false);
        }
        
    } 
    return(
        <button
            onClick={handleDelete}
            className={`px-2 py-1 rounded ${isLoading ? 'bg-red-500 text-white' : 'bg-red-500 text-white hover:bg-white hover:text-red-500'}`}
            disabled={isLoading}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            )}
        </button>
    )
}