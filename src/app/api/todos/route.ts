import { NextResponse } from 'next/server';
import { prisma } from '~/prisma';
import * as yup from 'yup';
import { auth } from '~/auth';


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
    const session = await auth();
    if(!session?.user) {
        return NextResponse.json('No autorizado', {status:401})
    }
    const { user } = session;
    try {
        const { description, complete } = await postSchema.validate(await request.json())
        const newTodo = await prisma.todo.create({
            data: {
                description, 
                complete,
                userId:user.id as string
            }
        });
        
        return NextResponse.json({newTodo});
    } catch (error) {
        console.log(error);
        return NextResponse.json({errorMessage:'Algo salió mal.'}, {status:400});
    }
}

export async function DELETE(request:Request) {
     const session = await auth();
    if(!session?.user) {
        return NextResponse.json('No autorizado', {status:401})
    }
    const { user } = session;
    try {
        await prisma.todo.deleteMany({where:{complete:true, userId:user.id}});
        return NextResponse.json({message:'Se eliminaron los todos completados.'}, {status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Error al eliminar el todo.'}, {status:400})
    }

}