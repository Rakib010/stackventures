import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {

   /*  const result = await prisma.user.create({
        data: {
            name: "sakib",
            email: "sakib@gmail.com",
            profilePhoto: "photo"
        }
    })

    const getUserAllData = await prisma.user.findMany(
    )
    console.log(getUserAllData);

    const userData = await prisma.user.findMany({
        where: {
            id: 3
        }
    })

    const findUserById = await prisma.user.findUnique({
        where: {
            id: 4
        }
    })

    const updateUser = await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            name: "sakib bro"
        }
    })
    console.log(updateUser);

    const updateProfilePhoto = await prisma.user.updateManyAndReturn({
        where: {
            profilePhoto: null
        },
        data: {
            profilePhoto: "default image"
        }
    })
    console.log(updateProfilePhoto);

    const deleteUser = await prisma.user.delete({
        where: {
            id: 1
        }
    }) */
    //console.log(deleteUser)

}

main()