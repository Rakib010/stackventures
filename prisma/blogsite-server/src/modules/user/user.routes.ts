import express from 'express';
import { UserController } from './user.controller';

const router = express.Router()

router.post("/create", UserController.createUser)
router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getUserById)
router.patch("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)


export const userRouter = router