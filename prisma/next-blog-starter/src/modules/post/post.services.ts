import { prisma } from "../../config/db";
import { Post, Prisma } from "../../generated/prisma";

const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return result;
}

const getAllPosts = async ({ page, limit, search, isFeatured, tags }: { page: number, limit: number, search: string, isFeatured?: boolean, tags?: string[] }) => {
    const skip = (page - 1) * limit

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]
            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags?.length > 0) && {
                tags: { hasEvery: tags }
            }

        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.post.count({ where })

    return {
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
        data: result,
    };
};

const getPostById = async (id: number) => {

    const result = await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: { id },
            data: { views: { increment: 1 } }
        })

        return await tx.post.findUnique({
            where: { id },
            include: { author: true },
        });

    })

    return result;
};

const updatePost = async (id: number, data: Partial<any>) => {
    return prisma.post.update({ where: { id }, data });
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

export const PostService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}