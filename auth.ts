import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from '~/prisma';
import Credentials from "next-auth/providers/credentials";
import { redirect } from 'next/navigation';
import { signInEmailPassword } from "@/auth/actions/auth-actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        let user = await signInEmailPassword(credentials!.email as string, credentials.password as string)
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          return null
        }
 
        // return user object with their profile data
        return user
      },
    })
  ],

  session: {
    strategy:'jwt'
  },
  callbacks: {
    async signIn({user}) {
      return true;
    },
    async jwt({token, user, account, profile}) {
      const dbUser = await prisma.user.findUnique({where:{email:token.email ?? 'no-email'}});

      if(dbUser?.isActive === false) {
        throw new Error("Usuario no esta activo");
      }
      token.roles = dbUser?.roles??['no-roles'];
      token.id = dbUser?.id??'no-uuid';
      return token;
    },
    async session({session, token, user}) {
      if(session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      console.log({token})
      return session
    }
  }
})