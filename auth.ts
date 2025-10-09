import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma/client"
import { createUser, findUserByEmail } from "./lib/login"

// Extend the User type to include 'role'
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  pages: {signIn: "/sign-in"},
  callbacks: {
    async jwt({token, user}){
      if (user && user.email && user.name) {
				const dbUser = await findUserByEmail(user.email);

				if (!dbUser) {
					const res = await createUser(user.email, user.name); 
					token.id = res.id;
          token.role = res.role;
					return token;
				}

				token.id = dbUser.id;
				token.name = dbUser.name;
				token.email = dbUser.email;
        token.role = dbUser.role;
			}

      return token;
    },

    async session({session, token}){
      if (token) {
        session.user.id = String(token.id);
        session.user.name = token.name;
        session.user.email = token.email!;
        //session.user.image = token.picture;
        session.user.role = typeof token.role === "string" ? token.role : "USER";
			}
      return session;
    },
    
    redirect(){
      return "/dashboard"
    }
  }
})