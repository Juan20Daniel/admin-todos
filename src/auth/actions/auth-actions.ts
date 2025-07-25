import { prisma } from "~/prisma";
import bcrypt from 'bcryptjs';

export const signInEmailPassword = async (email:string, password:string) => {
    
    if(!email || !password) return null;

    const user = await prisma.user.findUnique({where:{email:email}});

    if(!user) {
        const dbUser = await createUser(email, password)
        return dbUser
    }
    if(!bcrypt.compareSync(password, user.password??'')) {
        return null;
    }

    return user;
}

const createUser = async (email:string, password:string) => {
    const user = await prisma.user.create({
        data:{
            email, 
            password: bcrypt.hashSync(password),
            name: email.split('@').shift()
        }
    });
    return user;
}