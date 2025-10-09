'use server';
import { prisma } from "@/prisma/client"
import { Role } from "@prisma/client";

export const createUser = async (email:string, name:string) => {
    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            role: Role.USER
        }
    });
    return newUser;
}

export const findUserByEmail = async (email:string) => {
    const user = await prisma.user.findFirst({where: {email}});
    return user;
}