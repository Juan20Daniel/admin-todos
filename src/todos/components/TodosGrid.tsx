'use client';
import { todo as Todo } from "@/generated/prisma";
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "../actions/todo-actions";
import { useRouter } from "next/navigation";
import { NotData } from "@/components";


interface Props {
    todos?:Todo[];
}
export const TodosGrid = ({todos = []}:Props) => {
    const router = useRouter();
    // const onToggleTodo = async (id: string, complete: boolean) => {
    //     await todosApi.updateTodo(id, complete);
    //     router.refresh();
    // }

    return (
        <>
            {!todos.length 
                ? <NotData message="No hay todos" />
                : <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {todos.map(todo => (
                        <TodoItem 
                            key={todo.id}
                            todo={todo}
                            toggleTodo={toggleTodo}
                        />
                    ))}
                </div>
            }
        </>
    );
}