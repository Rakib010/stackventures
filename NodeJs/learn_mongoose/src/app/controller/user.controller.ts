import express, { Request, Response } from 'express'
import { User } from '../model/user.model';
import { z } from "zod"
import bcrypt from "bcryptjs";

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
        const body = req.body
        // const user = await User.create(body)

        // zod validation korle ey vabe req.body hobe
        //const body = await createUserZodSchema.parseAsync(req.body);

        // direct password hash without using method 
        /* const password = await bcrypt.hash(body.password, 10)
        body.password = password */

        // Built it and custom instance methods(password hashing function)
        /* const user = new User(body)
        const password = await user.hashPassword(body.password)
        user.password = password
        await user.save() */

        // built in and custom static method(password hashing function)
        /* const password = await User.hashPassword(body.password)
        body.password = password; */

        const user = await User.create(body)

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error
        })
    }
})

userRoutes.get('/', async (req: Request, res: Response) => {

    //  const userEmail = req.query.email

    const user = await User.find()

    // not efficient way filtering 
    /*  let user = []
     if (userEmail) {
         user = await User.find({ email: userEmail })
     } else {
         user = await User.find()
     } */

    // sort,skip,limit 
    // const user = await User.find().sort({ "email": "descending" })
    // const user = await User.find().skip(4)
    //const user = await User.find().limit(2)


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
    //const user = await User.findByIdAndDelete(userId)

    const user = await User.findOneAndDelete({ _id: userId })

    res.status(201).json({
        success: true,
        message: "User Deleted successfully",
        user
    })

})
