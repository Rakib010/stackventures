import { prisma } from "../../config/db"
import { Prisma } from "../../generated/prisma"

const login = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        throw new Error("user not found")
    }
    if (password === user.password) {
        return user
    } else {
        throw new Error("password is incorrect")
    }
}

const loginWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (!user) {
        user = await prisma.user.create({ data })
    }
}

export const AuthServices = {
    login,
    loginWithGoogle
}