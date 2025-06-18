import { PrismaClient } from "@/generated/prisma";
import { TodosGrid } from "@/todos/components";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata = {
 title: 'Rest Todos',
 description: 'Rest Todos',
};

export default async function RestTodosPage() {
  const prisma = new PrismaClient();
  const todos = await prisma.todo.findMany();
  
  return (
    <>
      <div className="w-full mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}