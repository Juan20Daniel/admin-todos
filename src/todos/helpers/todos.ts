import { todo as Todo } from "@/generated/prisma";

export const updateTodo = async (id:string, complete:boolean):Promise<Todo> => {
    const body = {complete}
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

export const createTodo = async (description:string):Promise<Todo> => {
    const body = {description}
    const todo = await fetch(`/api/todos`, {
        method:'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json());

    return todo;
}

export const removeTodo = async (id:string):Promise<string | boolean> => {
    try {
        await fetch(`/api/todos/${id}`,{
            method:'DELETE',
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json());
        return 'Todo elimunado';
    } catch (error) {
        console.log(error);
        return false;
    }
}