import express, { Request, Response } from 'express'
import { User } from '../model/user.model';
import { z } from "zod"

export const userRoutes = express.Router()

// Validate using Zod
const createUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
})


userRoutes.post('/create-user', async (req: Request, res: Response) => {
    try {
        const body = await createUserZodSchema.parseAsync(req.body);
        // console.log("zod body", body)
        const user = await User.create(body)

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user: {}
        })

    } catch (error) {
        //console.log(error)
        res.status(400).json({
            success: false,
            error
        })
    }
})

userRoutes.get('/', async (req: Request, res: Response) => {
    const user = await User.find()
    res.status(201).json({
        success: true,
        message: "All user retrieve successfully",
        user
    })

})
userRoutes.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId
    const user = await User.findById(userId)
    res.status(201).json({
        success: true,
        message: "A user retrieve data",
        user
    })

})
userRoutes.patch('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId
    const updatedBody = req.body
    const user = await User.findByIdAndUpdate(userId, updatedBody, { new: true })
    res.status(201).json({
        success: true,
        message: "Updated successfully",
        user
    })

})
userRoutes.delete('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId
    const user = await User.findByIdAndDelete(userId)
    res.status(201).json({
        success: true,
        message: "User Deleted successfully",
        user
    })

})
