import { Request, Response } from "express";
import User from "./user.model";


// post method 
const createUser = async (req: Request, res: Response) => {
    const body = req.body
    const user = new User(body)
    const data = await user.save()
    res.send({
        success: true,
        message: "User Create Successfully",
        data
    })
}
// get method
const getUser = async (req: Request, res: Response) => {
    const data = await User.find()
    res.send({
        success: true,
        message: "User Get",
        data
    })
}
// updated method 
const updatedUser = async (req: Request, res: Response) => {
    const body = req.body
    const id = req.params.id
    const data = await User.findByIdAndUpdate({})
    res.send({
        success: true,
        message: "User updated",
        data
    })
}
// delete method 
const deleteUser = async (req: Request, res: Response) => {
    const data = await User.find()
    res.send({
        success: true,
        message: "User Get",
        data
    })
}


export { createUser, getUser, updatedUser, deleteUser }