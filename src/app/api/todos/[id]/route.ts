import { todo as Todo } from '@/generated/prisma';
import { prisma } from '~/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';
import { auth } from '~/auth';
interface Segments {
    params: Promise<{id:string}>
}

const getTodo = async (segments:Segments): Promise<Todo|null> => {
    const session = await auth();
    if(!session?.user) {
       return null;
    }
    const user = session.user;
    const {id} = await segments.params;
    const todo = await prisma.todo.findFirst({
        where: { id }
    });
    if(!todo) throw new Error(`El todo con el id: ${id} no fue encontrado`);

    if(todo.userId !== user.id) {
        return null;
    }

    return todo;
}

export async function GET(request: Request, segments:Segments) {
    try {
        const todo = await getTodo(segments);

        return NextResponse.json({todo});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Error al optener el todo.'}, {status:400})
    }
}

const putSchema = yup.object({
    description: yup.string().optional(), 
    complete: yup.boolean().optional()
})

export async function PUT(request: Request, segments:Segments) { 
    try {
        const todo = await getTodo(segments);

        if(!todo) return NextResponse.json('No fue posible actualizar el todo.', {status:404});

        //...rest por si nos interesa lo demas.
        const {description, complete } = await putSchema.validate(await request.json());
        const todoUpdated = await prisma.todo.update({
            where: {id:todo.id},
            data: {description, complete} 
        });

        return NextResponse.json({todoUpdated});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Error al actualizar el todo.'}, {status:400})
    }
}