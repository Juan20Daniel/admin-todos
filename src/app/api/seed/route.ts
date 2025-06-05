import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) { 
    const prisma = new PrismaClient();
    
    await prisma.todo.deleteMany();

    const newTodo = await prisma.todo.createMany({
        data: [
            {description:'Boglio lanchare la piedra', complete: true},
            {description:'Hacer un mega reventon a todo mecate'},
            {description:'Terminar los cursos'},
            {description:'Conseguir una jodida chamba'}
        ]
    })

    console.log(newTodo)
    return NextResponse.json({ message: 'Seed executed'})
}