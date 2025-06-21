'use server';
import { PrismaClient, todo as Todo } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const toggleTodo = async (id:string, complete:boolean): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: {id} });

    if(!todo) {
        throw new Error('El todo no existe.');
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data:{complete}
    });

    revalidatePath('/dashboard/server-todos');
    return updatedTodo;
}