'use server';
import { PrismaClient, todo } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const toggleTodo = async (id:string, complete:boolean): Promise<todo> => {
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

export const addTodo = async (description:string, userId:string): Promise<todo> => {
     try {
        const newTodo = await prisma.todo.create({
            data: {
                description,
                userId
            }
        });
        revalidatePath('/dashboard/server-todos');
        return newTodo;
    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al crear el todo.');
    }
}

export const deleteCompleted = async ():Promise<boolean> => {
    try {
        await prisma.todo.deleteMany({where:{complete:true}});
        revalidatePath('/dashboard/server-todos')
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al eliminar los todos completados.');
    }
}