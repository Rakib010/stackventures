import { Router } from "express";
import { createUser, deleteUser, getUser, updatedUser } from "./user.controller";

const userRoute = Router()

userRoute.post('/newUser', createUser)
userRoute.get('/user', getUser)
userRoute.patch('/user', updatedUser)
userRoute.delete('/user', deleteUser)


export default userRoute;