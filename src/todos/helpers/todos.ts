import { PrismaClient, todo as Todo } from "@/generated/prisma";

export const updateTodo = async (id:string, complete:boolean):Promise<Todo> => {
    const body = {complete}
    console.log(id);
    const todo = await fetch(`/api/todos/${id}`, {
        method:'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json());

    return todo;
}