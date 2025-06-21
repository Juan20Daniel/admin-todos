'use client';
import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import * as todosApi from '@/todos/helpers/todos';
import { useRouter } from "next/navigation";

export const NewTodo = () => {
  const [ description, setDescription ] = useState('');
  const router = useRouter();
  const onSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if(description.trim().length === 0) return;

    await todosApi.createTodo(description);
    router.refresh();
    setDescription('');
  }
  const deleteCompleted = async () => {
    await todosApi.removeTodosCompleted();
    router.refresh();
  }
  return (
    <form  className='flex w-full' onSubmit={onSubmit}>
      <input type="text"
        className="w-6/12 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type='submit' className="flex items-center justify-center rounded ml-2 cursor-pointer bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      <span className='flex flex-1'></span>
      <button 
        onClick={ () => deleteCompleted() }
        type='button' className="flex items-center justify-center rounded ml-2 gap-2 px-4 bg-red-400 py-2 text-white hover:bg-red-700 transition-all cursor-pointer">
        <IoTrashOutline />
        Eliminar todos completos
      </button>
    </form>
  )
}