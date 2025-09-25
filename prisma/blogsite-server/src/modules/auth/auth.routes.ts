
import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();


router.post("/login", AuthController.login)
router.post("/google-login", AuthController.loginWithGoogle)


export const authRouter = router;