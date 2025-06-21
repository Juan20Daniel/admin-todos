import { PrismaClient } from "@/generated/prisma";
import { TodosGrid } from "@/todos/components";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
 title: 'Server Todos',
 description: 'Server Todos',
};

export default async function ServerTodos() {
    const prisma = new PrismaClient();
    const todos = await prisma.todo.findMany();
    
    return (
        <>
            <p className="text-3xl pb-5">Server actions</p>
            <div className="w-full mb-5">
                <NewTodo />
            </div>
            <TodosGrid todos={todos} />
        </>
    );
}