import { PrismaClient } from '@/generated/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) { 
    const prisma = new PrismaClient();
    
    const todos = await prisma.todo.findMany()
    
    return NextResponse.json(todos)
}