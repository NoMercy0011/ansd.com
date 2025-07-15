"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import { useFormStatus } from "react-dom";

type todoType = {
    title: string;
    author: string;
    completed?: boolean;
}

export default function CreateTodo(){
    const [isClicked, setIsClicked] = useState<boolean> (false);

    const handleClick = () => {
        setIsClicked(true);
    }
    const onCancel = () => {
        setIsClicked(false);
    }
    return(
        <>
        <button
        disabled = {isClicked} 
        onClick={handleClick}
        type="button" className="m-auto my-5 p-2 rounded text-center text-cyan-50 w-full cursor-pointer bg-cyan-800 hover:bg-cyan-950 disabled:bg-cyan-200">
            Create new todo
        </button>
        {
            isClicked && 
            (<div className="p-1 py-2 border border-gray-200 shadow text-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="m-2 px-4 py-2 border text-gray-700 text-sm rounded text-center cursor-pointer hover:bg-red-600 hover:text-white"
                > X </button>
            <CreateTodoForm />
            </div >
            )
        }
        </>
    )
}

const CreateTodoForm = () => {
    const router = useRouter();
    const [todo, setTodo] = useState<todoType> ({
        title:'',
        author : '',
        completed: false
    })
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo, 
            [e.target.name] : [e.target.value]
        })
    }
    const handleSubmit  =  async (formData : FormData) => {
        await fetch('/api/todos' , 
            {
                body : JSON.stringify({
                    title: formData.get('title'),
                    author: formData.get('author')
                }),
                method : 'POST'
            }
        )
        router.refresh();
    }
    return(
        <form action={async (formData) => await handleSubmit(formData)} className="text-start mx-2">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name='title'
              onChange={handleChange}
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              name='author'
              onChange={handleChange}
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>
          <SubmitButton />
        </form>
    )
}

const SubmitButton = () => {
    
    const {pending} = useFormStatus();

    return(
        <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 h-10 w-28 rounded text-center items-center ${pending ?  'bg-blue-500 text-white' :  'bg-blue-500 text-white  hover:bg-blue-700' }`}
            >
              {pending ? (
                <svg className="animate-spin h-5 w-5 m-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : ('Enregistrer')
              }

            </button>
          </div>
    )

} 