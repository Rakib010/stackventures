import express, { Request, Response } from 'express'
import { User } from '../model/user.model';

export const userRoutes = express.Router()

userRoutes.post('/create-user', async (req: Request, res: Response) => {
    const body = req.body;
    const user = await User.create(body)

    res.status(201).json({
        success: true,
        message: "user created successfully",
        user
    })

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
