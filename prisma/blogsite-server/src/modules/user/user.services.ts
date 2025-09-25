import { prisma } from "../../config/db"
import { Prisma, User } from "../../generated/prisma"

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const user = await prisma.user.create({
        data: payload
    })
    return user
}

const getAllUser = async () => {
    const user = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            Post: true, // relation
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return user
}

const getUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            phone: true,
            picture: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        }
    })
    return result
}
const updateUser = async (id: number, payload: Partial<User>) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

const deleteUser = async (id: number) => {
    const result = await prisma.user.delete({
        where: {
            id
        }
    })
    return result;
}


export const UserService = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}