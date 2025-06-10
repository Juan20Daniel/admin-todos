import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup';
const prisma = new PrismaClient();

export async function GET(request: Request) { 
    const { searchParams } = new URL(request.url);
    const take = Number(searchParams.get('take')??'10');
    const skip = Number(searchParams.get('skip')??'0');

    if(isNaN(take) || isNaN(skip)) return NextResponse.json(
        {message:'Los parametros tiene que ser numeros'}, 
        {status:400}
    )
    
    const todos = await prisma.todo.findMany({
        take,
        skip
    })
    
    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete:yup.boolean().optional().default(false)
})

export async function POST(request: Request) { 
    try {
        const { description, complete } = await postSchema.validate(await request.json())
        const newTodo = await prisma.todo.create({
            data: {
                description, 
                complete
            }
        });

        return NextResponse.json({newTodo});
    } catch (error) {
        console.log(error);
        return NextResponse.json({errorMessage:'Algo salió mal.'}, {status:400});
    }
}