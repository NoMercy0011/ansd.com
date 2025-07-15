"use server";

import { NextResponse } from "next/server";
import pool from "../lib/db";

type TodoType = {
    id?: number, 
    title: string, 
    author: string, 
    completed?: boolean
}
export async function deleteTodoAction(id: number) {
  try {
    await pool.query('DELETE FROM todos WHERE id_todos = ?', [id]);
    console.log('Tâche supprimée avec succès ');
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche :', error);
    throw new Error('Erreur lors de la suppression de la tâche');
  }
}

export async function updateTodoAction(
  todo : TodoType) {
  try {
    await pool.query('UPDATE todos SET title = ?, author= ?, completed = ? WHERE id_todos = ?', [
      todo.title,
      todo.author,
      todo.completed,
      todo.id,
    ]);
    console.log('Tâche mise à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche :', error);
    throw new Error('Erreur lors de la mise à jour de la tâche');
  }
}

export async function createTodoAction(todo : TodoType){
  if (!todo.title || !todo.author) {
    return NextResponse.json({ error: 'Title and Author are required' }, { status: 400 });
}

try {
    await pool.query('INSERT INTO todos (title, author, completed) VALUES (?,?,?)', [todo.title, todo.author, false]);
    return NextResponse.json({ message: 'Todo created successfully' }, { status: 201 });
} catch {
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
}
}
