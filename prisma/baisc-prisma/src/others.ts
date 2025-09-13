import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function others() {
    // create some user data

    /*  const data = await prisma.user.createMany({
         data: [
             {
                 name: 'Mir',
                 email: "ph@h.com"
             },
             {
                 name: 'juna',
                 email: "ph1@h.com"
             },
             {
                 name: 'sagor',
                 email: "ph2@h.com"
             },
             {
                 name: 'siam',
                 email: "ph3@h.com"
             }
         ]
     }) */

    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: "mi", // case sensitive
                mode: "insensitive"
            }
        },
        orderBy: {
            id: 'asc'
        }
    })
    console.log(users)
}
others()