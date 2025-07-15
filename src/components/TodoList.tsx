"use client"

import { useEffect, useState } from "react"
//import { todo } from "@/types/todo";

type Todo = {
    id_todos : string;
    title : string;
    completed : boolean;
};

export default function TodoList(){

    const [todos, setTodos] = useState<Todo[]>([]);
    //const [error, setError] = useState("")

    useEffect(() => {
        fetch('api/todos')
        .then((res) => res.json() )
        .then(setTodos)
    }, [])
    return (
        <div>
            <ul>
                { todos?.map( (todo : Todo) => 
                    (
                        <li key={todo.id_todos}> { todo.title} </li>
                    ))}
            </ul>
        </div>
    )
}