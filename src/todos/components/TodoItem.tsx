'use client';
import { todo as Todo } from "@/generated/prisma";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import styles from './TodoItem.module.css';
import {startTransition, useOptimistic} from 'react';

interface Props {
  todo:Todo;
  toggleTodo: (id:string, completed:boolean) => Promise<Todo|void>;
}

export const TodoItem = ({todo, toggleTodo}:Props) => {
  const [ todoOp, toggleTodoOp ] = useOptimistic(
    todo, 
    (state, newCompletedValue:boolean) => ({...state, complete:newCompletedValue})
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOp(!todoOp.complete))
      
      await toggleTodo(todoOp.id, !todoOp.complete);
    } catch (error) {
      startTransition(() => toggleTodoOp(!todoOp.complete))
    }  
  }
  return (
    <div className={todoOp.complete ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div 
          onClick={onToggleTodo}
          className={`
            flex p-2 rounded-md cursor-pointer
            hover: bg-opacity-60
            bg-blue-100
            ${todoOp.complete ? 'bg-blue-100' : 'bg-red-100'}
          `}>
            {todoOp.complete
              ? <IoCheckboxOutline size={30} />
              : <IoSquareOutline size={30} />
            }
        </div>
        <div className="text-center sm:test-left">
          {todoOp.description}
        </div>
      </div>
    </div>
  )
}