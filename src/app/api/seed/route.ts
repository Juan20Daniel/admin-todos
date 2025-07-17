import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'
import { prisma } from '~/prisma';

export async function GET(request: Request) { 
    
    await prisma.todo.deleteMany(); 
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            email:'jsmith.o@gmail.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin','client','super-user'],
            todos: {
                create: [
                    {description:'Boglio lanchare la piedra', complete: true},
                    {description:'Hacer un mega reventon a todo mecate'},
                    {description:'Terminar los cursos'},
                    {description:'Conseguir una jodida chamba'}
                ]
            }
        }
    })

    return NextResponse.json({ message: 'Seed executed'})
}